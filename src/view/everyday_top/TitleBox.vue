<template>
  <div class="title-box">
    <h1 :class="{ active: !view }" @click="$emit('toggleView', 0)">{{ firstName }}</h1>
    <h1 :class="{ active: view }" @click="$emit('toggleView', 1)">{{ lastName }}</h1>
  </div>
</template>
<script>
export default {
  props: ["view", "firstName", "lastName"]
};
</script>