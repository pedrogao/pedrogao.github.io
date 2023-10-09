import { randomString } from "../string";
import { Id, Op, OpType } from "./op";

export class OBLWWRegister<T> {
  value: T | null;
  clientId: string;
  clock: number;
  ops: Op<T>[];

  public constructor(init?: T, clientId?: string) {
    this.value = init ?? null;
    this.clientId = clientId ?? randomString(6);
    this.clock = 0;
    this.ops = [];
  }

  public get(): T | null {
    return this.value;
  }

  public set(value: T): void {
    this.value = value;
    this.ops.push({
      type: OpType.Set,
      value: value,
      id: [this.clientId, ++this.clock],
    } as Op<T>);
  }

  public apply(op: Op<T>): void {
    const id = op.id;
    // Ignore old ops
    if (this.clock > id[1]) {
      return;
    }
    if (this.clock === id[1] && this.clientId > id[0]) {
      return;
    }

    if (op.type === OpType.Set) {
      this.value = op.value;
      this.clock = id[1];
    } else {
      throw new Error(`Unsupport op type: ${op.type}`);
    }
  }

  public ack(op: Op<T>): void {
    this.ops = this.ops.filter((o) => !Id.equals(o.id, op.id));
  }

  public flush() {
    return this.ops;
  }
}

export type RegisterState<T> = {
  value: T | null;
  id: Id;
};

export class SBLWWRegister<T> {
  clientId: string;
  value: T | null;
  clock: number;

  public constructor(init?: T, clientId?: string) {
    this.value = init ?? null;
    this.clientId = clientId ?? randomString(6);
    this.clock = 0;
  }

  public get(): T | null {
    return this.value;
  }

  public set(value: T): void {
    this.value = value;
    this.clock++;
  }

  public merge(state: RegisterState<T>): void {
    if (this.clock > state.id[1]) {
      return;
    }
    if (this.clock === state.id[1] && this.clientId > state.id[0]) {
      return;
    }
    this.value = state.value;
    this.clock = state.id[1];
  }

  public toState(): RegisterState<T> {
    return {
      value: this.value,
      id: [this.clientId, this.clock],
    };
  }
}

export class MultiLWWRegister<T> {
  map: Map<string, T | null>;
  clientId: string;
  clock: number;
  ops: Op<string>[];

  public constructor(clientId?: string) {
    this.map = new Map();
    this.clientId = clientId ?? randomString(6);
    this.clock = 0;
    this.ops = [];
  }

  public get(key: string): T | null {
    return this.map.get(key) ?? null;
  }

  public set(key: string, value: T): void {
    this.map.set(key, value);
    this.ops.push({
      type: OpType.KV,
      value: JSON.stringify([key, value]),
      id: [this.clientId, ++this.clock],
    } as Op<string>);
  }

  public apply(op: Op<string>): void {
    const id = op.id;
    // Ignore old ops
    if (this.clock > id[1]) {
      return;
    }
    if (this.clock === id[1] && this.clientId > id[0]) {
      return;
    }

    if (op.type === OpType.KV) {
      const [key, value] = JSON.parse(op.value);
      this.map.set(key, value);
      this.clock = id[1];
    } else {
      throw new Error(`Unsupport op type: ${op.type}`);
    }
  }

  public ack(op: Op<string>): void {
    this.ops = this.ops.filter((o) => !Id.equals(o.id, op.id));
  }

  public flush() {
    return this.ops;
  }

  public toJSON() {
    const m: {
      [key: string]: T | null;
    } = {};
    for (const [k, v] of this.map) {
      m[k] = v;
    }
    return m;
  }
}
