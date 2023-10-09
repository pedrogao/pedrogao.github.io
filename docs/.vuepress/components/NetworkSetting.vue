<template>
  <div class="network">
    <fieldset class="control">
      <label>Network</label>
      <button type="button" class="toggle" @click="changeNetworkState">
        <span class="state" :class="{ highlight: online }">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
            <g fill="currentColor">
              <circle cx="8" cy="12.5" r="1.5"></circle>
              <path
                d="M11.5 10C10.6 9 9.3 8.5 8 8.5S5.4 9 4.5 10L3.1 8.6c1.3-1.4 3-2.1 4.9-2.1s3.6.7 4.9 2.1L11.5 10z"
              ></path>
              <path
                d="M8 2C5 2 2.2 3.1 0 5.2l1.4 1.4C3.2 4.9 5.5 4 8 4s4.8.9 6.6 2.7L16 5.2C13.8 3.1 11 2 8 2z"
              ></path>
            </g>
          </svg>
        </span>
        <span class="state" :class="{ highlight: !online }">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
            <g fill="currentColor">
              <path
                d="M8.142 7.507C8.094 7.506 8.048 7.5 8 7.5c-1.9 0-3.6.7-4.9 2.1L4.5 11c.798-.886 1.912-1.357 3.06-1.457l.582-2.036zm1.988.32-.557 1.949c.724.242 1.398.636 1.927 1.224l1.4-1.4a6.423 6.423 0 0 0-2.77-1.773zM8.848 5.039l.557-1.946C8.942 3.037 8.475 3 8 3 5 3 2.2 4.1 0 6.2l1.4 1.4C3.2 5.9 5.5 5 8 5c.286 0 .568.015.848.039zm2.52-1.546-.55 1.924A9.051 9.051 0 0 1 14.599 7.7L16 6.2a11.442 11.442 0 0 0-4.632-2.707z"
              ></path>
              <path
                d="M6.001 16a1.001 1.001 0 0 1-.963-1.275l4-14a1.001 1.001 0 0 1 1.924.549l-4 14a1 1 0 0 1-.961.726z"
              ></path>
            </g>
          </svg>
        </span>
      </button>
    </fieldset>

    <fieldset class="control">
      <label>Latency</label>
      <input type="range" min="100" max="3000" :oninput="handleInput" />
      <p>{{ rangeValue }}</p>
    </fieldset>
  </div>
</template>

<script>
export default {
  data() {
    return {
      online: true,
      rangeValue: 100,
    };
  },
  mounted() {},
  methods: {
    changeNetworkState() {
      this.online = !this.online;
      this.$emit("network", {
        online: this.online,
        delay: this.rangeValue,
      });
    },
    handleInput(event) {
      this.rangeValue = event.target.value;
      this.$emit("network", {
        online: this.online,
        delay: this.rangeValue,
      });
    },
  },
};
</script>

<style>
.network {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.toggle {
  display: flex;
  border: none;
  padding: 0;
  border: 2px solid;
}

.toggle .state {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1px 2px;
  opacity: 1;
  background-color: #6c4fff;
}

.highlight {
  background-color: #dddddd !important;
}

.control {
  display: flex;
  align-items: center;
  border: 0;
  padding: 0;
  margin-right: 40px;
}

label {
  font-size: 5px;
  opacity: 0.6;
  margin-right: 10px;
}
</style>
