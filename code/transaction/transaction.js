/**
 * MVCC & transaction
 */

class LockManager {
  constructor() {
    this.locks = [];
  }

  add(transaction, rid) {
    if (!this.exists(transaction, rid)) {
      this.locks.push({ transaction, rid });
    }
  }

  exists(transaction, rid) {
    return (
      this.locks.find(
        (lock) => lock.transaction === transaction && lock.rid === rid
      ) !== undefined
    );
  }
}

class Table {
  constructor() {
    this.nextXid = 0; // next transaction id
    this.activeXids = []; // active transaction ids
    this.records = []; // data records
    this.locks = new LockManager();
  }

  newTransaction(transactionClass) {
    this.nextXid += 1;
    this.activeXids.push(this.nextXid);
    return new transactionClass(this.nextXid, this);
  }

  removeTransaction(xid) {
    // delete from active xids
    const idx = this.activeXids.indexOf(xid);
    this.activeXids.splice(idx, 1);
  }
}

class RollbackException extends Error {}

/**
 * Transaction
 */
class Transaction {
  /**
   * @param {Number} xid
   * @param {Table} table
   */
  constructor(xid, table) {
    this.xid = xid;
    this.rollbackActions = [];
    this.table = table;
  }

  addRecord(id, cols) {
    const record = { id, ...cols, createdXid: this.xid, expiredXid: 0 };
    this.rollbackActions.push({
      action: "delete",
      index: this.table.records.length,
    });
    this.table.records.push(record);
  }

  deleteRecord(id) {
    this.table.records.forEach((record, i) => {
      if (record.id === id && this.rowIsVisible(record)) {
        if (this.rowIsLocked(record)) {
          throw new RollbackException(
            "row locked by another transaction, can't delete."
          );
        } else {
          // 删除
          record.expiredXid = this.xid;
          // 该事务可能回滚
          this.rollbackActions.push({
            action: "add",
            index: i,
          });
        }
      }
    });
  }

  updateRecord(id, cols) {
    this.deleteRecord(id);
    this.addRecord({
      id,
      ...cols,
    });
  }

  fetchRecord(rid) {
    return this.table.records.find(
      (record) => this.rowIsVisible(record) && record.id === rid
    );
  }

  countRecords(minId, maxId) {
    return this.table.records.filter(
      (record) =>
        this.rowIsVisible(record) && record.id >= minId && record.id <= maxId
    ).length;
  }

  fetchAll() {
    return this.table.records.filter((record) => this.rowIsVisible(record));
  }

  fetchRecords(expr) {
    return this.table.records.filter(
      (record) => this.rowIsVisible(record) && expr(record)
    );
  }

  commit() {
    // delete from active xids
    this.table.removeTransaction(this.xid);
  }

  rollback() {
    // 事务回滚
    this.rollbackActions.reverse().forEach((item) => {
      if (item.action === "add") {
        this.table.records[item.index].expiredXid = 0; // 删除
      } else if (item.action === "delete") {
        this.table.records[item.index].expiredXid = this.xid; // 添加
      }
    });
    this.table.removeTransaction(this.xid);
  }

  rowIsLocked(record) {
    throw new Error("not implement!");
  }

  rowIsVisible(record) {
    throw new Error("not implement!");
  }
}

/**
 * ReadUncommittedTransaction 读未提交，最低隔离级别
 */
class ReadUncommittedTransaction extends Transaction {
  rowIsLocked(record) {
    // 在读未提交的级别下，如果记录已删除，则被锁住了(已经删除了还看个啥)
    return record.expiredXid !== 0;
  }

  rowIsVisible(record) {
    // 未删除
    return record.expiredXid === 0;
  }
}

/**
 * ReadCommittedTransaction 读已提交
 */
class ReadCommittedTransaction extends Transaction {
  rowIsLocked(record) {
    return (
      record.expiredXid !== 0 &&
      this.table.activeXids.includes(record.expiredXid)
    );
  }

  rowIsVisible(record) {
    // 如果记录不是自己创建的，且在活跃劣列表中，那么不可见
    if (
      record.createdXid !== this.xid &&
      this.table.activeXids.includes(record.createdXid)
    ) {
      return false;
    }
    // 如果记录被删除了
    // - 如果是自己删除的，那么不可见
    // - 如果不在活跃列表中，证明已经提交了，那么不可见
    if (
      record.expiredXid !== 0 &&
      (record.expiredXid === this.xid ||
        !this.table.activeXids.includes(record.expiredXid))
    ) {
      return false;
    }

    return true;
  }
}

/**
 * RepeatableReadTransaction 可重复读
 */
class RepeatableReadTransaction extends ReadCommittedTransaction {
  rowIsLocked(record) {
    // 在可重复读的基础上，如果存在锁
    return (
      super.rowIsLocked(record) || this.table.locks.exists(this, record.id)
    );
  }

  rowIsVisible(record) {
    const visible = super.rowIsVisible(record);
    if (visible) {
      this.table.locks.add(this, record.id);
    }
  }
}

class SerializableTransaction extends RepeatableReadTransaction {
  constructor(xid, table) {
    super(xid, table);
    this.existingXids = this.table.activeXids.map((item) => item);
  }

  rowIsVisible(record) {
    const visible =
      super.rowIsVisible(record) &&
      record.createdXid <= this.xid &&
      this.existingXids.includes(record.createdXid);

    if (visible) {
      this.table.locks.add(this, record.id);
    }
    return visible;
  }
}

class TransactionTest {
  constructor(transactionClass) {
    this.table = new Table();

    const client = this.table.newTransaction(ReadCommittedTransaction);
    client.addRecord(1, { name: "pedro" });
    client.addRecord(3, { name: "mike" });
    client.commit();

    this.client1 = this.table.newTransaction(transactionClass);
    this.client2 = this.table.newTransaction(transactionClass);
  }

  runTest() {
    try {
      return this.run();
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  result() {
    if (this.runTest()) {
      return "✔";
    }
    return "✘";
  }

  run() {
    throw new Error("not implement!");
  }
}

class DirtyRead extends TransactionTest {
  run() {
    const result1 = this.client1.fetchRecord(1);
    this.client2.updateRecord(1, { name: "pedro2" });
    const result2 = this.client1.fetchRecord(1);
    return result1 !== result2;
  }
}

class NonRepeatableRead extends TransactionTest {
  run() {
    const result1 = this.client1.fetchRecord(1);
    this.client2.updateRecord(1, { name: "pedro2" });
    this.client2.commit();
    const result2 = this.client1.fetchRecord(1);
    return result1 !== result2;
  }
}

class PhantomRead extends TransactionTest {
  run() {
    const result1 = this.client1.fetchRecords(
      (record) => record.id >= 1 && record.id <= 3
    );
    this.client2.addRecord(2, { name: "peter" });
    this.client2.commit();

    const result2 = this.client1.countRecords(1, 3);
    return result1.length !== result2;
  }
}

const main = () => {
  const transactions = [
    {
      name: "read uncommitted",
      typ: ReadUncommittedTransaction,
    },
    {
      name: "read committed  ",
      typ: ReadCommittedTransaction,
    },

    {
      name: "repeatable read ",
      typ: RepeatableReadTransaction,
    },
    {
      name: "serializable    ",
      typ: SerializableTransaction,
    },
  ];
  const tests = [DirtyRead, NonRepeatableRead, PhantomRead];

  console.log("                  Dirty Repeat Phantom");
  for (const transaction of transactions) {
    const results = tests.map((item) => {
      const instance = new item(transaction.typ);
      return instance.result();
    });
    console.log(
      transaction.name,
      "    ",
      results[0],
      "    ",
      results[1],
      "    ",
      results[2]
    );
  }
};

main();
