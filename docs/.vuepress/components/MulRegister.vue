<template>
  <div>
    <div>
      <div class="kv">
        <span class="text">key</span>
        <input class="input-inline" type="text" v-model="key" />
      </div>
      <div class="kv">
        <span class="text">value</span>
        <input class="input-inline" type="text" v-model="value" />
        <button class="add" @click="add">+</button>
      </div>
    </div>
    <hr />
    <div v-for="(value, key) in register.toJSON()" class="kv">
      <span class="text">{{ key }}</span>
      <input
        class="input-inline"
        type="text"
        @keyup.enter="(event) => submit(key, event)"
        :value="value"
      />
      <button class="del" @click="del(key)">x</button>
    </div>
  </div>
</template>

<script>
import { MultiLWWRegister } from "../lib/crdt";
export default {
  data() {
    return {
      register: new MultiLWWRegister(),
      key: "",
      value: "",
    };
  },
  mounted() {},
  methods: {
    trigger() {
      this.$emit("output", {
        value: this.register.toJSON(),
        ops: this.register.flush(),
      });
    },
    ack(op) {
      this.register.ack(op);
    },
    apply(op) {
      this.register.apply(op);
    },
    submit(key, event) {
      const value = event.target.value;
      this.register.set(key, value);
      this.trigger();
    },
    add() {
      this.register.set(this.key, this.value);
      this.key = "";
      this.value = "";
      this.trigger();
    },
    del(key) {
      this.register.set(key, "");
      this.trigger();
    },
  },
};
</script>

<style>
.text {
  display: inline-block;
  width: 50px;
  text-align: right;

  font-size: 14px;
  line-height: 1.6;
  font-weight: 500;
  color: #0000008c;
}

.input-inline {
  display: inline-block;
  border-radius: 4px;
  padding: 1px 2px;
  margin-left: 10px;
  margin-top: 10px;
  background: transparent;
  transition: background-color 0.5s;
}

.kv {
  display: inline-block;
  width: 300px;
  height: 30px;
  color: #0ff;
  font-size: 20px;
  border: 0px transparent;
  border-bottom: 2px solid #fff;
}

.add {
  margin-left: 10px;
  border-radius: 4px;
  padding: 1px 2px;
  background: transparent;
  transition: background-color 0.5s;
}

.del {
  margin-left: 10px;
  border-radius: 4px;
  padding: 1px 2px;
  background: transparent;
  transition: background-color 0.5s;
}
</style>
