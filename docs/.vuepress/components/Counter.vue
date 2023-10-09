<template>
  <div class="counter">
    <p class="text">{{ counter.get() }}</p>
    <div class="buttons">
      <button class="button" @click="increment">+</button>
      <button class="button" @click="decrement">-</button>
    </div>
  </div>
</template>

<script>
import { OBCounter } from "../lib/crdt";
export default {
  data() {
    return {
      counter: new OBCounter(),
    };
  },
  mounted() {},
  methods: {
    trigger() {
      this.$emit("output", {
        value: this.counter.get(),
        ops: this.counter.flush(),
      });
    },
    ack(op) {
      this.counter.ack(op);
    },
    apply(op) {
      this.counter.apply(op);
    },
    increment() {
      this.counter.increment();
      this.trigger();
    },
    decrement() {
      this.counter.decrement();
      this.trigger();
    },
  },
};
</script>

<style>
.counter {
  /* display: flex; */
  /* align-items: center; */
}

.text {
  font-size: 14px;
  line-height: 1.6;
  font-weight: 500;
  color: #0000008c;
}

.buttons {
  display: flex;
}

.button {
  width: 40px;
  margin: 0 5px;
  font-size: 16px;
  display: inline-block;
  padding: 8px 18px;
  font-weight: 500;
  border-radius: 8px;
  text-align: center;
  transition: background-color 0.5s, color;
}
</style>
