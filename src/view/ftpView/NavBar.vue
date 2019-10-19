<template>
  <nav class="navbar navbar-expand bg-light">
    <ul class="navbar-nav">
      <List
        v-for="({clickHandler, name}, index) in navbarMap"
        :key="index"
        :clickHandler="clickHandler"
        :name="name"
      ></List>
    </ul>
  </nav>
</template>
<script>
import List from "./NavBarList.vue";
export default {
  props: ["navbarMap"],
  components: {
    List
  }
};
</script>