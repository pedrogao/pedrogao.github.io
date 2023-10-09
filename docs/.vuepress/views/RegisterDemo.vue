<template>
  <div>
    <network-setting @network="networkTrigger"></network-setting>
    <div class="flex-list">
      <register
        ref="register1"
        class="flex-list-item"
        @output="output1"
      ></register>
      <register
        ref="register2"
        class="flex-list-item"
        @output="output2"
      ></register>
    </div>
  </div>
</template>

<script>
import Register from "../components/Register.vue";
import NetworkSetting from "../components/NetworkSetting.vue";
import { defaultNetwork } from "../lib/network";

export default {
  components: {
    Register,
    NetworkSetting,
  },
  data() {
    return {
      channel1: null,
      channel2: null,
    };
  },
  mounted() {
    this.channel1 = defaultNetwork.createChannel("register1");
    this.channel1.receive((value) => {
      const { type, ops } = JSON.parse(value);
      if (type === "submit") {
        for (const op of ops) {
          this.$refs.register1.apply(op);
        }
        this.channel1.send("register2", JSON.stringify({ type: "ack", ops }));
      } else if (type === "ack") {
        for (const op of ops) {
          this.$refs.register1.ack(op);
        }
      } else {
        throw new Error("unknown type");
      }
    });
    this.channel2 = defaultNetwork.createChannel("register2");
    this.channel2.receive((value) => {
      const { type, ops } = JSON.parse(value);
      if (type === "submit") {
        for (const op of ops) {
          this.$refs.register2.apply(op);
        }
        this.channel2.send("register1", JSON.stringify({ type: "ack", ops }));
      } else if (type === "ack") {
        for (const op of ops) {
          this.$refs.register2.ack(op);
        }
      } else {
        throw new Error("unknown type");
      }
    });
  },
  methods: {
    networkTrigger({ online, delay }) {
      const delay1 = parseInt(delay);
      defaultNetwork.setDelay(delay1);
      defaultNetwork.setEnable(online);
    },
    output1({ value, ops }) {
      // console.log("output1", value, ops);
      const payload = {
        type: "submit",
        ops,
      };
      this.channel1.send("register2", JSON.stringify(payload));
    },
    output2({ value, ops }) {
      // console.log("output2", value, ops);
      const payload = {
        type: "submit",
        ops,
      };
      this.channel2.send("register1", JSON.stringify(payload));
    },
  },
};
</script>

<style>
.flex-list {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  background: #fff;
}

.flex-list .flex-list-item {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 40%;
  padding-bottom: 20px;
}

.flex-list .flex-list-item:nth-child(2n + 1) {
  margin-right: 4%;
}
</style>
