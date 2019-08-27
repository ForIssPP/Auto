<template>
  <div :class="alertType">
    <p>{{ msg }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      index: 0
    }
  },
  props: {
    alertType: {
      type: String,
      default: 'msg'
    },
    msg: {
      type: String,
      default: ''
    }
  },
  methods: {
    close(index) {
      index = index || this.index;

    },
    open(index) {
      index = index || this.index;
    }
  },
}
</script>