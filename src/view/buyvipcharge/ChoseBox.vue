<template>
  <div id="choseBox">
    <ul class="chose-box">
      <li
        v-for="(chose, index) in choses"
        :key="index"
        @click="$emit('choseCharge', index)"
        :class="{ 'active': activeChose === index, 'hide': index > len ? true : false }"
      >
        <img v-if="chose && chose.imgSrc" :src="chose.imgSrc" />
        <h3 v-if="chose">{{ chose.title }}</h3>
        <p v-if="chose">{{ chose.name }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  props: {
    choses: {
      type: Array,
      default() {
        return [];
      }
    },
    activeChose: {
      type: Number
    },
    len: {
      type: Number,
      default: 0
    }
  }
};
</script>
<style lang="css">
.hide {
  visibility: hidden;
}
</style>