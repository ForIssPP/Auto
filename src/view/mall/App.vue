<template>
  <div id="app">
    <div class="title">
      <img src="http://alidown.zcdanbao.com/cdn/images/title_bg.png" alt="title-bg" />
      <btnClick :className="!active ? 'btn-1 active' : 'btn-1'" :name="''" @clickBtn="toggle(0)"></btnClick>
      <btnClick :className="active ? 'btn-2 active' : 'btn-2'" :name="''" @clickBtn="toggle(1)"></btnClick>
    </div>
    <img class="curtains" src="http://alidown.zcdanbao.com/cdn/images/curtains.png" alt="curtains" />
    <div class="container">
      <div class="car-box" v-for="(cars, index) in carsInfo" :key="index">
        <div
          class="car"
          v-for="(car, index) in cars"
          :key="index"
          @click="buyCar(car.id, car.word, car.money)"
        >
          <imageInfo :info="car"></imageInfo>
          <div class="money">{{ car.money }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import btnClick from "../everyday_order/btnClick.vue";
import getQueryVariable from "../../modules/getQueryVariable";
import imageInfo from "../everyday_order/imageInfo.vue";

export default {
  data() {
    return {
      infos: [],
      active: 0,
      carsInfo: car_list
    };
  },
  methods: {
    buyCar(id, name, money) {
      if (!id) {
        return;
      }
      layer.confirm(
        `您将花费${money}魔法币，购买坐骑${name}`,
        {
          title: "提示",
          btn: ["确定", "取消"]
        },
        index => {
          $.ajax({
            type: "POST",
            url: "/index.php?g=appapi&m=mall&a=buycar",
            data: {
              uid: getQueryVariable("uid"),
              token: getQueryVariable("token"),
              carid: id
            },
            success(res) {
              res = typeof res === "string" ? JSON.parse(res) : res;
              layer.msg(res.msg || "服务器错误");
              layer.close(index);
            },
            error(e) {
              console.log(e);
              layer.close(index);
            }
          });
        },
        index => layer.close(index)
      );
    },
    toggle(type) {
      this.active = type;
      if (type) {
        this.active = 0;
        layer.msg("敬请期待");
      }
    }
  },
  components: {
    btnClick,
    imageInfo
  }
};
</script>
<style lang="scss" src="./mall.scss"></style>