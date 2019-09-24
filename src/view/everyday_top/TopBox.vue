<template>
  <div>
    <div class="box">
      <div class="order">
        <TitleBox
          :firstName="titleName[0]"
          :lastName="titleName[1]"
          :view="view"
          @toggleView="toggle"
        ></TitleBox>
        <ul v-if="nowLists.length > 0">
          <TopConent
            v-for="(list, index) in nowLists"
            :key="list.id"
            :index="index + 1"
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
  </div>
</template>
<script>
import TitleBox from "./TitleBox.vue";
import TopConent from "./TopContent.vue";
import NothingAnyUser from "./NothingAnyUser.vue";

export default {
  props: ["nowLists", "oldList"],

  data() {
    return {
      view: 0,
      titleName: ["每日幸运榜单", "昨日幸运榜单"],
      notAnyUser: "暂时无人上榜，敬请期待~！"
    };
  },
  methods: {
    toggle(index) {
      if (this.view !== index) {
        this.view = index;
        this.$emit("toggleOnload");
      }
    }
  },
  components: {
    TitleBox,
    NothingAnyUser,
    TopConent
  }
};
</script>