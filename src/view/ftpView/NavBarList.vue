<template>
  <li class="nav-item">
    <a class="nav-link" href="javascript:" @click="clickHandler">{{ name }}</a>
  </li>
</template>
<script>
import printLog from "../../modules/printLog";

export default {
  props: {
    clickHandler: {
      type: Function,
      default: () => {}
    },
    name: {
      type: String,
      default: ""
    }
  },
  created() {
    printLog("created", "List is on loading!");
  },
  mounted() {
    printLog("mounted", "List is load OK");
  }
};
</script>