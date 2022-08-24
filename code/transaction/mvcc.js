/**
 * ES6 tutorial: https://es6.ruanyifeng.com/
 */

/**
 * Table
 */
class Table {
  constructor() {
    this.nextXid = 0; // next transaction id
    this.activeXids = []; // active transaction ids
    this.records = []; // data records
  }

  newTransaction() {
    this.nextXid += 1;
    this.activeXids.push(this.nextXid);
    return new Transaction(this.nextXid, this);
  }

  removeTransaction(xid) {
    // delete from active xids
    const idx = this.activeXids.indexOf(xid);
    this.activeXids.splice(idx, 1);
  }
}

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

  addRecord(record) {
    record.createdXid = this.xid;
    record.expiredXid = 0;
    // undo log
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
          throw "row locked by another transaction, can't delete.";
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

  fetchAll() {
    return this.table.records.filter((record) => this.rowIsVisible(record));
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
    // 记录未被删除，且在活跃列表里面，那么该记录就被其它事务锁住了
    return (
      record.expiredXid !== 0 && this.table.activeXids.includes(record.expiredXid)
    );
  }

  rowIsVisible(record) {
    // 记录是否可见

    // 如果记录不是自己创建的，且在活跃在列表中，那么不可见
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

const main = () => {
  const table = new Table();

  const t1 = table.newTransaction();
  const t2 = table.newTransaction();

  t1.addRecord({ id: 1, name: "pedro" });
  t1.addRecord({ id: 2, name: "mike" });

  t1.deleteRecord(1);
  t1.updateRecord(2, { name: "jerry" });

  console.log(t1.fetchAll());
  console.log(t2.fetchAll());

  t1.rollback();

  console.log(t1.fetchAll());
  console.log(t2.fetchAll());
};

main();
