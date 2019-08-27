<template>
  <button :class="className" @click="$emit('clickBtn')">{{ name }}</button>
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