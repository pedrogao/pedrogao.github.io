<template>
  <div class="container">
    <!-- <p class="text">{{ value }}</p> -->
    <input class="editor" v-model="value" @input="input" />
  </div>
</template>

<script>
import { Doc } from "../lib/crdt/rga";

export default {
  data() {
    return {
      doc: new Doc(),
      value: "",
    };
  },
  mounted() {
  },
  methods: {
    trigger() {
      this.value = this.doc.getContent().join("");
      this.$emit("output", {
        value: this.value,
      });
    },
    getVector() {
      return this.doc.getVector();
    },
    getMissing(vector) {
      return this.doc.getMissing(vector);
    },
    getDeleteSet() {
      return this.doc.getDeleteSet();
    },
    merge(items, ds) {
      // console.log("merge: ", items);
      this.doc.merge(items, ds);
      // console.log("content: ", this.doc.getContent());
      // console.log("store: ", this.doc.store);
      this.value = this.doc.getContent().join("");
    },
    input(event) {
      const { data, inputType, srcElement } = event;
      const { selectionStart, selectionEnd } = srcElement;
      switch (inputType) {
        case "insertText":
          // console.log("insertText", data, selectionStart, selectionEnd)
          this.doc.insert(selectionStart - 1, data);
          this.trigger();
          break;
        case "deleteContentBackward":
          // console.log("deleteContentBackward", data, selectionStart, selectionEnd)
          this.doc.delete(selectionStart);
          this.trigger();
          break;
        default:
          console.log("unsupport Operation: ", data, inputType, selectionStart, selectionEnd);
      }
    },
  },
};
</script>

<style>
.text {
  font-size: 14px;
  line-height: 1.6;
  font-weight: 500;
  color: #0000008c;
}

.editor {
  height: 30px;
  border: 1px solid #0000008c;
  border-radius: 4px;
}
</style>
