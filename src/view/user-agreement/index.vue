<template>
  <div class="container">
    <h1>{{ header }}</h1>
    <div class="row" v-for="(title, i) in titles" :key="'title' + i">
      <h3>{{ title }}</h3>
      <p v-for="(content, j) in contents[i]" :key="'content' + j">{{ content }}</p>
    </div>
  </div>
</template>
<script>
import language from "./language";
const { title, header, content } = language;

export default {
  data() {
    return {
      header: undefined,
      titles: undefined,
      contents: undefined
    };
  },
  created() {
    this.getLanguage();
  },
  methods: {
    getLanguage() {
      let lan =
        window.location.search &&
        window.location.search.split("?")[1].split("=")[1];
      if (!title[lan]) {
        lan = "cn";
      }
      this.header = header[lan];
      this.titles = title[lan];
      this.contents = content[lan];
      document.getElementsByTagName("title")[0].innerText = this.header;
    }
  }
};
</script>
<style lang="scss">
@import "../../scss/mixins/mixin";
@import "../../scss/mixins/deletstyle";

%fc {
  @include flexCenter;
}

%fs {
  @include createFlexBox(center, flex-start, row);
}

%fss {
  @include createFlexBox(flex-start, flex-start, row);
}

%fcs {
  @include createFlexBox(center, flex-start);
}

%fcc {
  @include flexColumnCenter;
}

.container {
  padding: 0 0.3rem 0.5rem;
  h1 {
    @include cfzta_fw(#000, 0.4rem, center, bold);
    margin-top: 0.4rem;
  }
}

.row {
  @include cfzta_lh(#000, 0.3rem, justify, 1.6);
  h3 {
    margin: 0.2rem 0;
    font-weight: 500;
  }
  p {
    color: #999;
  }
}
</style>