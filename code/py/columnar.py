import os
import struct
import lz4.frame as lz4
import pickle
import shutil


"""
列式存储引擎原型：
@link: https://risinglightdb.github.io/risinglight-tutorial/03-storage.html
@link: https://github.com/kelindar/column
方案核心思路：

1. 将数据按列存储，每列数据单独存储在一个文件中，col列文件；
2. 每列数据分块读、写，比如1M；
3. 每个col列文件对应一个idx索引文件，索引文件存储每个block的`start_key`、`end_key`和`length`；
4. 查询时，先读取idx文件，然后筛选出符合条件的block，再读取block数据，最后筛选出符合条件的数据；
"""


class Compression:
    def __init__(self, compression_type):
        self.compression_type = compression_type
        self.compressioner = lz4

    def compress(self, data):
        # return self.compressioner.compress(data)
        return pickle.dumps(data)

    def decompress(self, data):
        # return self.compressioner.decompress(data)
        return pickle.loads(data)


class Block:
    def __init__(self, data):
        self.data = data

    def __len__(self):
        return len(self.data)


class ColumnarStorageEngine:
    def __init__(self, db_path, block_size=4096):
        self.db_path = db_path
        self.block_size = block_size
        self.columns = {}
        self.indexes = {}
        self.initialize_db()
        self.compression = Compression('lz4')

    def initialize_db(self):
        if not os.path.exists(self.db_path):
            os.makedirs(self.db_path)

    def write_block(self, file_path, data):
        with open(file_path, 'ab') as f:
            compressed_data = self.compression.compress(data)
            f.write(struct.pack('Q', len(compressed_data)))
            f.write(compressed_data)

    def read_block(self, file_path, offset):
        with open(file_path, 'rb') as f:
            f.seek(offset)
            compressed_size = struct.unpack('Q', f.read(8))[0]
            compressed_data = f.read(compressed_size)
            return self.compression.decompress(compressed_data)

    def write_column(self, column_name, data):
        column_path = os.path.join(self.db_path, column_name)
        offset = 0
        for i in range(0, len(data), self.block_size):
            block_data = data[i:i + self.block_size]
            self.write_block(column_path, block_data)
            offset += len(block_data)
        self.columns[column_name] = offset

    def read_column(self, column_name):
        column_path = os.path.join(self.db_path, column_name)
        if column_name not in self.columns:
            return None
        data = []
        offset = 0
        while offset < self.columns[column_name]:
            block_data = self.read_block(column_path, offset)
            data.extend(block_data)
            offset += len(block_data)
        return data

    def add_column(self, column_name, data):
        # 添加新列
        self.columns[column_name] = data
        self.write_column(column_name, data)

    def delete_column(self, column_name):
        # 删除列
        if column_name in self.columns:
            del self.columns[column_name]
            column_path = os.path.join(self.db_path, column_name)
            if os.path.exists(column_path):
                os.remove(column_path)

    def update_column(self, column_name, data):
        # 更新列数据
        if column_name in self.columns:
            self.columns[column_name] = data
            self.write_column(column_name, data)

    def create_index(self, column_name):
        if column_name in self.columns:
            column_data = self.read_column(column_name)
            self.indexes[column_name] = {}
            for i, value in enumerate(column_data):
                if value not in self.indexes[column_name]:
                    self.indexes[column_name][value] = []
                self.indexes[column_name][value].append(i)

    def write_index(self, column_name):
        index_path = os.path.join(self.db_path, column_name + "_index")
        with open(index_path, 'w') as f:
            for value, positions in self.indexes[column_name].items():
                f.write(f"{value}:{','.join(map(str, positions))}\n")

    def read_index(self, column_name):
        index_path = os.path.join(self.db_path, column_name + "_index")
        if os.path.exists(index_path):
            with open(index_path, 'r') as f:
                index_data = f.read()
            index_lines = index_data.split('\n')
            self.indexes[column_name] = {}
            for line in index_lines:
                if line:
                    parts = line.split(':')
                    value = parts[0]
                    positions = list(map(int, parts[1].split(',')))
                    self.indexes[column_name][value] = positions

    def query(self, column_name, value):
        if column_name in self.indexes and value in self.indexes[column_name]:
            row_indices = self.indexes[column_name][value]
            column_data = self.read_column(column_name)
            return [(column_name, column_data[i]) for i in row_indices]
        else:
            return None


if __name__ == '__main__':
    # 使用示例
    shutil.rmtree('data_store')

    engine = ColumnarStorageEngine('data_store')
    data1 = [1, 2, 3, 4, 5]
    data2 = ['Alice', 'Bob', 'Charlie', 'David', 'Eve']
    engine.add_column('age', data1)
    engine.add_column('name', data2)
    engine.create_index('age')
    engine.write_index('age')
    result = engine.query('age', 3)  # 查询年龄为3的记录
    if result:
        for col_name, col_value in result:
            print(f"{col_name}: {col_value}")
