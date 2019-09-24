<template>
  <div class="box month">
    <div class="order">
      <ul v-if="monthList.length > 0">
        <TopConent
          v-for="(list) in monthList"
          :key="list.id"
          :avatar="list.avatar"
          :name="list.user_nicename"
          :totalcoin="list.totalcoin"
        ></TopConent>
      </ul>
      <ul v-else>
        <li style="margin-top: 1rem">
          <NothingAnyUser></NothingAnyUser>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import TopConent from "./TopContent.vue";
import NothingAnyUser from "./NothingAnyUser.vue";

export default {
  props: ["monthList"],
  components: {
    TopConent,
    NothingAnyUser
  }
};
</script>