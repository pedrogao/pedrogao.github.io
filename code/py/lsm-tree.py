import uuid
import bisect

# Static variables

THRESHOLD = 10  # 内存表的阈值
SSTABLE_SIZE = 10  # SSTable的大小
LEVEL_THRESHOLD = 2  # 磁盘表的阈值

# LSMTree implementation


class LSMTree:
    def __init__(self):
        # @type: dict[str, any]
        self.memtable = {}  # 内存表（字典），用于暂时存储插入或更新的键值对
        # @type: list[SSTable]
        self.sstable = []  # 磁盘表（列表），用于存储已经稳定的键值对
        # @type: dict[str, Transaction]
        self.transactions = {}  # 进行中的事务字典，用于存储所有进行中的事务

    def begin_transaction(self):
        transaction_id = str(uuid.uuid4())
        transaction = Transaction(transaction_id)
        self.transactions[transaction_id] = transaction
        return transaction_id

    def commit_transaction(self, transaction_id):
        transaction = self.transactions.get(transaction_id)
        if transaction:
            # 将事务中插入或更新的键值对写入LSM树
            for key, value in transaction.data.items():
                self.memtable[key] = value

            # 从LSM树中删除事务中删除的键
            for key in transaction.deleted_keys:
                self.memtable.pop(key, None)

            # 从进行中的事务字典中移除该事务
            del self.transactions[transaction_id]
        self.flush_or_merge()

    def abort_transaction(self, transaction_id):
        transaction = self.transactions.get(transaction_id)
        if transaction:
            # 清空事务中插入或更新的键值对
            transaction.data.clear()

            # 从进行中的事务字典中移除该事务
            del self.transactions[transaction_id]

    def put(self, key, value, transaction_id=None):
        current_transaction = self.transactions.get(transaction_id)
        if current_transaction:
            # 如果当前存在事务，则将键值对插入到事务的数据字典中
            current_transaction.data[key] = value
        else:
            # 如果没有事务，则直接插入到LSM树中
            self.memtable[key] = value
            self.flush_or_merge()

    def flush_or_merge(self):
        if len(self.memtable) >= THRESHOLD:
            self.flush()
        if len(self.sstable) > LEVEL_THRESHOLD:
            self.merge()

    def delete(self, key, transaction_id=None):
        current_transaction = self.transactions.get(transaction_id)
        if current_transaction:
            # 如果当前存在事务，则将键添加到事务的删除列表中
            current_transaction.deleted_keys.append(key)
        else:
            # 如果没有事务，则直接从LSM树中删除键
            self.memtable.pop(key, None)

    def get(self, key, transaction_id=None):
        current_transaction = self.transactions.get(transaction_id)
        if current_transaction:
            # 如果当前存在事务，则首先在事务中检索键值对
            value = current_transaction.data.get(key)
            if value is not None:
                return value

        # 从SSTable中查询（从后往前遍历，直到找到为止）
        for sstable in reversed(self.sstable):
            result = sstable.get(key)
            if result is not None:
                return result

        return None

     # 将内存表中的数据写入磁盘，形成新的SSTable文件
    def flush(self):
        keys = sorted(self.memtable.keys())
        values = [self.memtable[key] for key in keys]
        sstable = SSTable(keys, values)

        self.sstable.append(sstable)
        self.memtable.clear()

    # 合并操作：将多个SSTable合并成一个更大的SSTable，并按照键的顺序排序
    def merge(self):
        new_sstable = []

        # 将所有SSTable的键值对合并成一个列表
        entries = []
        for sstable in self.sstable:
            entries.extend(zip(sstable.keys, sstable.values))

        # 对键值对列表按照键排序
        entries.sort(key=lambda x: x[0])

        # 按照指定大小拆分键值对列表，并生成新的SSTable对象
        i = 0
        while i < len(entries):
            keys, values = zip(*entries[i:i+SSTABLE_SIZE])
            new_sstable.append(SSTable(list(keys), list(values)))
            i += SSTABLE_SIZE

        # 更新SSTable列表
        self.sstable = new_sstable


class SSTable:

    def __init__(self, keys, values):
        self.keys = keys
        self.values = values

    # 使用二分查找从SSTable中查询指定键的值
    def get(self, key):
        index = bisect.bisect_left(self.keys, key)

        if index < len(self.keys) and self.keys[index] == key:
            return self.values[index]

        return None


class Transaction:
    def __init__(self, transaction_id):
        self.transaction_id = transaction_id
        self.data = {}  # 用于存储插入或更新的键值对
        self.deleted_keys = []  # 用于存储删除的键


# Test code

if __name__ == "__main__":
    lsm_tree = LSMTree()
    transaction_id = lsm_tree.begin_transaction()
    lsm_tree.put("a", "1", transaction_id)
    lsm_tree.put("b", "2", transaction_id)
    lsm_tree.put("c", "3", transaction_id)

    assert lsm_tree.get("a") == None
    assert lsm_tree.get("b") == None
    assert lsm_tree.get("c") == None

    print(lsm_tree.get("a", transaction_id))
    print(lsm_tree.get("b", transaction_id))
    print(lsm_tree.get("c", transaction_id))

    lsm_tree.commit_transaction(transaction_id)

    lsm_tree.put("d", "4")
    lsm_tree.put("e", "5")
    lsm_tree.put("f", "6")
    lsm_tree.put("g", "7")
    lsm_tree.put("h", "8")
    lsm_tree.put("i", "9")
    assert len(lsm_tree.memtable) == 9
    lsm_tree.put("j", "10")
    lsm_tree.put("k", "11")
    assert len(lsm_tree.memtable) == 1
    assert len(lsm_tree.sstable) == 1
    assert lsm_tree.get("a") == "1"

    lsm_tree.put("l", "12")
    lsm_tree.put("m", "13")
    lsm_tree.put("n", "14")
    lsm_tree.put("o", "15")
    lsm_tree.put("p", "16")
    lsm_tree.put("q", "17")
    lsm_tree.put("r", "18")
    lsm_tree.put("s", "19")
    lsm_tree.put("t", "20")
    lsm_tree.put("u", "21")

    assert len(lsm_tree.memtable) == 1

    lsm_tree.put("v", "22")
    lsm_tree.put("w", "23")
    lsm_tree.put("x", "24")
    lsm_tree.put("y", "25")
    lsm_tree.put("z", "26")
    lsm_tree.put("aa", "27")
    lsm_tree.put("bb", "28")
    lsm_tree.put("cc", "29")
    lsm_tree.put("dd", "30")
    lsm_tree.put("ee", "31")
    assert len(lsm_tree.memtable) == 1
    assert lsm_tree.get("a") == "1"
    assert lsm_tree.get("aa") == "27"
