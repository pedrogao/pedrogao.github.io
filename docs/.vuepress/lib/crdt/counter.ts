import { randomString } from "../string";
import { Op, Id, OpType } from "./op";

//
// Operation-based counter
//

export class OBCounter {
  value: number;
  clientId: string;
  clock: number;
  ops: Op<number>[];
  vector: Map<string, number>;

  public constructor(init: number = 0, clientId?: string) {
    this.value = init;
    this.clientId = clientId ?? randomString(6);
    this.clock = 0;
    this.ops = [];
    this.vector = new Map();
  }

  public get(): number {
    return this.value;
  }

  public increment(): void {
    this.value++;
    this.ops.push({
      type: OpType.Increment,
      value: 1,
      id: [this.clientId, this.clock++],
    } as Op<number>);
  }

  public decrement(): void {
    this.value--;
    this.ops.push({
      type: OpType.Decrement,
      value: 1,
      id: [this.clientId, this.clock++],
    } as Op<number>);
  }

  public apply(op: Op<number>): void {
    const id = op.id;
    const clock = this.vector.get(id[0]) ?? -1;
    // Ignore old ops
    if (clock >= id[1]) {
      return;
    }
    // New op must match clock sequence
    if (clock + 1 !== id[1]) {
      throw new Error(`Op id not in order: ${clock} ${id[1]}`);
    }

    if (op.type === OpType.Increment) {
      this.value += op.value;
    } else if (op.type === OpType.Decrement) {
      this.value -= op.value;
    } else {
      throw new Error(`Unsupport op type: ${op.type}`);
    }
    this.vector.set(id[0], id[1]);
  }

  public ack(op: Op<number>): void {
    this.ops = this.ops.filter((o) => !Id.equals(o.id, op.id));
  }

  public flush() {
    return this.ops;
  }
}

//
// State-based counter
//

export type CounterState = {
  s1: Map<string, number>;
  s2: Map<string, number>;
};

export class SBCounter {
  clientId: string;
  s1: Map<string, number>;
  s2: Map<string, number>;

  public constructor(clientId?: string) {
    this.clientId = clientId ?? randomString(6);
    this.s1 = new Map();
    this.s2 = new Map();
  }

  public get(): number {
    return (
      Array.from(this.s1.values()).reduce((a, b) => a + b, 0) -
      Array.from(this.s2.values()).reduce((a, b) => a + b, 0)
    );
  }

  public increment(): void {
    this.s1.set(this.clientId, (this.s1.get(this.clientId) ?? 0) + 1);
  }

  public decrement(): void {
    this.s2.set(this.clientId, (this.s2.get(this.clientId) ?? 0) + 1);
  }

  public merge(other: CounterState): void {
    for (const [k, v] of other.s1.entries()) {
      const old = this.s1.get(k) ?? 0;
      this.s1.set(k, Math.max(old, v));
    }

    for (const [k, v] of other.s2.entries()) {
      const old = this.s2.get(k) ?? 0;
      this.s2.set(k, Math.max(old, v));
    }
  }

  public toState(): CounterState {
    return {
      s1: this.s1,
      s2: this.s2,
    };
  }
}
