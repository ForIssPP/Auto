<template>
  <a :class="className" href="javascript:" @click="$emit('btnClick')">{{ name }}</a>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: '确认'
    },
    className: {
      type: String,
      default: ''
    }
  }
}
</script>