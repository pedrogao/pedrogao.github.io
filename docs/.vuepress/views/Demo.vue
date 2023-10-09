<template>
  <div>
    <network-setting @network="networkTrigger"></network-setting>
    <div class="flex-list">
      <resize-textarea
        class="flex-list-item"
        :placeholder="placeholder"
        :rows="20"
        :cols="40"
        :maxHeight="150"
        :value="textValue1"
        @update:output="textValue1Update"
      >
      </resize-textarea>
      <resize-textarea
        class="flex-list-item"
        :placeholder="placeholder"
        :rows="20"
        :cols="40"
        :maxHeight="150"
        :value="textValue2"
        @update:output="textValue2Update"
      >
      </resize-textarea>
    </div>
  </div>
</template>

<script>
import ResizeTextarea from "../components/ResizeTextarea.vue";
import NetworkSetting from "../components/NetworkSetting.vue";
import { defaultNetwork } from "../lib/network";

export default {
  components: {
    ResizeTextarea,
    NetworkSetting,
  },
  data() {
    return {
      placeholder: "Please enter your text here",
      textValue1: "",
      textValue2: "",
      channel1: null,
      channel2: null,
    };
  },
  mounted() {
    this.channel1 = defaultNetwork.createChannel("textValue1");
    this.channel1.receive((value) => {
      this.textValue1 = value;
    });
    this.channel2 = defaultNetwork.createChannel("textValue2");
    this.channel2.receive((value) => {
      this.textValue2 = value;
    });
  },
  methods: {
    textValue1Update(value) {
      this.channel1.send("textValue2", value);
    },
    textValue2Update(value) {
      this.channel2.send("textValue1", value);
    },
    networkTrigger({ online, delay }) {
      const delay1 = parseInt(delay);
      defaultNetwork.setDelay(delay1);
      defaultNetwork.setEnable(online);
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
