<template>
  <div>
    <NavBar :navbarMap="navbarMap"></NavBar>
    <div class="bg-light">
      <keep-alive>
        <component :is="toggleView(view)"></component>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import config from "./config";
import NavBar from "./NavBar.vue";
import printLog from "../../modules/printLog";
import Card from "./Card.vue";
import Download from "./Download.vue";
import Delete from "./Delete.vue";
import Updata from "./Updata.vue";
import "bootstrap/dist/css/bootstrap.css";

export default {
  data() {
    return {
      view: 0,
      navbarMap: []
    };
  },
  methods: {
    toggleView(view) {
      this.view = view;
      let reComponent;

      switch (this.view) {
        case 0:
          reComponent = "Download";
          break;
        case 1:
          reComponent = "Updata";
          break;
        case 2:
          reComponent = "Delete";
          break;
      }
      return reComponent;
    }
  },
  components: {
    NavBar,
    Download,
    Delete,
    Updata
  },
  created() {
    let navbarMap = config.nav.map((e, index) => {
      e.clickHandler = () => this.toggleView(index);
      return e;
    });
    this.navbarMap = navbarMap;
  }
};
</script>
<style lang="scss" src="./index.scss"></style>