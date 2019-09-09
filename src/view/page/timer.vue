<template>
  <div class="timer-box" ref="timerBox">
    <div class="timer-bg"></div>
    <p>{{ h }}:{{ m }}:{{ s }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      h: 0,
      m: 0,
      s: 0
    };
  },
  mounted() {
    $.ajax({
      url: "./api/public/appapi/?service=Guard.GetServerTime",
      success: res => {
        const allTimer = /([0-9]+):([0-9]+):([0-9]+)/.exec(res.data.info.time);
        console.log(allTimer);
        this.h = parseInt(allTimer[1]);
        this.m = parseInt(allTimer[2]);
        this.s = parseInt(allTimer[3]);

        setInterval(() => {
          (this.s += 1) < 60
            ? this.s
            : ((this.s = 0), (this.m += 1)) < 60
            ? this.m
            : ((this.m = 0), (this.h += 1)) > 23
            ? (this.h = 0)
            : this.h;
        }, 1000);
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.timer-box {
  position: fixed;
  width: 1rem;
  height: 1rem;
  right: 0.3rem;
  top: 30%;
  z-index: 99999;

  .timer-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.7;
    border-radius: 50%;
    z-index: -1;
  }

  p {
    font-size: 0.22rem;
    color: rgb(255, 255, 255);
    text-align: center;
    line-height: 1rem;
  }
}
</style>