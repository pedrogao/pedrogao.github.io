<template>
  <div>
    <network-setting @network="networkTrigger"></network-setting>
    <div class="flex-list">
      <div class="flex-list-item">
        <yjs ref="yjsInput1" @output="output1" />
      </div>
      <div class="flex-list-item">
        <yjs ref="yjsInput2" @output="output2" />
      </div>
    </div>
  </div>
</template>

<script>
import NetworkSetting from "../components/NetworkSetting.vue";
import Yjs from "../components/Yjs.vue";
import { defaultNetwork } from "../lib/network";

export default {
  components: {
    NetworkSetting,
    Yjs,
  },
  data() {
    return {
      channel1: null,
      channel2: null,
    };
  },
  mounted() {
    this.channel1 = defaultNetwork.createChannel("yjsInput1");
    this.channel1.receive((value) => {
      const { type, vector, items, ds } = JSON.parse(value);
      if (type === 'step1') {
        const vec = this.$refs.yjsInput1.getVector();
        this.channel1.send(
          "yjsInput2",
          JSON.stringify({ type: 'step2', vector: vec })
        );
      } else if (type === 'step2') {
        const missing = this.$refs.yjsInput1.getMissing(vector);
        const ds = this.$refs.yjsInput1.getDeleteSet();
        const vec = this.$refs.yjsInput1.getVector();
        this.channel1.send(
          "yjsInput2",
          JSON.stringify({ type: 'step3', vector: vec, items: missing, ds: ds })
        );
      } else if (type === 'step3') {
        this.$refs.yjsInput1.merge(items, ds);
      }
    });
    this.channel2 = defaultNetwork.createChannel("yjsInput2");
    this.channel2.receive((value) => {
      const { type, vector, items, ds } = JSON.parse(value);
      if (type === 'step1') {
        const vec = this.$refs.yjsInput2.getVector();
        this.channel2.send(
          "yjsInput1",
          JSON.stringify({ type: 'step2', vector: vec })
        );
      } else if (type === 'step2') {
        const missing = this.$refs.yjsInput2.getMissing(vector);
        const ds = this.$refs.yjsInput2.getDeleteSet();
        const vec = this.$refs.yjsInput2.getVector();
        this.channel2.send(
          "yjsInput1",
          JSON.stringify({ type: 'step3', vector: vec, items: missing, ds: ds })
        );
      } else if (type === 'step3') {
        this.$refs.yjsInput2.merge(items, ds);
      }
    });
  },
  methods: {
    networkTrigger({ online, delay }) {
      const delay1 = parseInt(delay);
      defaultNetwork.setDelay(delay1);
      defaultNetwork.setEnable(online);
    },
    output1({ value }) {
      // console.log("output1", value);
      const payload = {
        type: 'step1',
      };
      this.channel1.send("yjsInput2", JSON.stringify(payload));
    },
    output2({ value }) {
      // console.log("output2", value);
      const payload = {
        type: 'step1',
      };
      this.channel2.send("yjsInput1", JSON.stringify(payload));
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
