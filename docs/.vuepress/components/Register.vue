<template>
  <div class="register">
    <span class="text">{{ register.get() }}</span>
    <input
      class="input"
      type="text"
      @keyup.enter="submit"
      placeholder="Enter something..."
    />
  </div>
</template>

<script>
import { OBLWWRegister } from "../lib/crdt";
export default {
  data() {
    return {
      register: new OBLWWRegister(),
    };
  },
  mounted() {},
  methods: {
    trigger() {
      this.$emit("output", {
        value: this.register.get(),
        ops: this.register.flush(),
      });
    },
    ack(op) {
      this.register.ack(op);
    },
    apply(op) {
      this.register.apply(op);
    },
    submit(event) {
      const value = event.target.value;
      this.register.set(value);
      this.trigger();
    },
  },
};
</script>

<style>
.register {
}

.text {
  display: inline-block;
  width: 50px;
  text-align: right;

  font-size: 14px;
  line-height: 1.6;
  font-weight: 500;
  color: #0000008c;
}

.input {
  border-radius: 4px;
  padding: 1px 2px;
  margin-top: 10px;
  background: transparent;
  transition: background-color 0.5s;
}
</style>
