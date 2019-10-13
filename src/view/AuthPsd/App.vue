<template>
  <div class="container">
    <h1 class="row text-muted">
      此为 TPLINK_Auth_Key 计算器
      <span>
        设备支持：
        <a
          class="text-success"
          v-for="(item, index) in okList"
          :key="index"
          href="javascript:"
        >{{ item }}</a>
      </span>
    </h1>
    <div class="card">
      <div class="card-header">
        获取
        <a href="javascript:" class="text-info">authkey</a>
      </div>
      <div class="card-body">
        <p>使用带有 openssl 的命令行工具打开config.bin存在目录并输入</p>
        <code>openssl enc -d -des-ecb -nopad -K 478DA50BF9E3D2CF -in config.bin</code>
        <p>获取行首的authkey</p>
      </div>
    </div>
    <div v-show="cupOk" class="card">
      <div class="card-header bg-success text-white">计算后 password为：</div>
      <div class="card-body">
        <p>原始数据：</p>
        <code>{{ cupPsd }}</code>
        <p>
          提取后：
          <span class="text-success">{{ psd }}</span>
        </p>
      </div>
    </div>
    <div v-show="cupErr" class="card">Error~! see console log!</div>
    <div class="card">
      <div class="card-header">解码</div>
      <div class="card-body">
        <form class="form-group">
          <label for="key">Authkey:</label>
          <input
            class="form-control"
            v-model="key"
            type="text"
            placeholder="在此处输入 config.bin 中的 authkey"
          />
        </form>
        <button class="btn btn-primary" @click="authKeyCup">尝试解码</button>
        <button class="btn btn-primary" @click="securityEncode">验证</button>
      </div>
    </div>
  </div>
</template>
<script>
import "bootstrap/dist/css/bootstrap.min.css";

function printLog(name, msg) {
  console.log("---------");
  console.log(name, msg);
}

export default {
  data() {
    return {
      cupOk: false,
      cupErr: false,
      okList: ["TL-WR842N"],
      strDe: "RDpbLfCPsJZ7fiv",
      dic:
        "yLwVl0zKqws7LgKPRQ84Mdt708T1qQ3Ha7xv3" +
        "H7NyU84p21BriUWBU43odz3iP4rBL3cD02KZciX" +
        "TysVXiV8ngg6vL48rPJyAUw0HurW20xqxv9aY" +
        "b4M9wK1Ae0wlro510qXeU07kV57fQMc8L6aLgML" +
        "wygtc0F10a0Dg70TOoouyFhdysuRMO51yY5ZlO" +
        "ZZLEal1h0t9YQW0Ko7oBwmCAHoic4HYbUyVeU3" +
        "sfQ1xtXcPcf1aT303wAQhv66qzW",
      psd: "",
      cupPsd: "",
      key: "Hwcnw8M02oa0bwK"
    };
  },
  methods: {
    /**
     * TL-WR842N 加密算法
     */
    securityEncode() {
      let { dic, psd: key } = this;

      let output = "";
      let len, len1, len2, lenDict;
      let cl = 0xbb,
        cr = 0xbb;

      if (!key) {
        layer.msg("请先尝试解码再验证！");
        return;
      }

      len1 = key.length;
      len2 = this.strDe.length;
      lenDict = dic.length;
      len = len1 > len2 ? len1 : len2;

      for (let index = 0; index < len; index++) {
        cl = 0xbb;
        cr = 0xbb;

        if (index >= len1) {
          cr = this.strDe.charCodeAt(index);
        } else if (index >= len2) {
          cl = key.charCodeAt(index);
        } else {
          cl = key.charCodeAt(index);
          cr = this.strDe.charCodeAt(index);
        }

        output += dic.charAt((cl ^ cr) % lenDict);
      }

      layer.alert(`验证 Authkey 为：${output}`);
    },
    /**
     * 解码器
     * @param {String} key: config.bin解析出的authkey
     */
    authKeyCup() {
      let arrayPasswd = new Array(15);
      let passwdLen = 0;
      let psd = "";
      let { strDe, dic, key } = this;
      let strComp_authKey, codeCr, strtmp, codeCl, strDic;

      try {
        for (let crIndex = 0; crIndex < 15; crIndex++) {
          let psdList = "";
          strComp_authKey = key.charAt(crIndex);
          codeCr = strDe.charCodeAt(crIndex);

          for (let index = 32; index < 127; index++) {
            strtmp = String.fromCharCode(index);
            codeCl = strtmp.charCodeAt(0);

            const dicIndex = (codeCl ^ codeCr) % 255;
            strDic = dic.charAt(dicIndex);

            if (strComp_authKey === strDic) {
              psdList += strtmp;
              continue;
            }
          }

          arrayPasswd[crIndex] = psdList;
        }

        for (let index = 0; index < 25; index++) {
          const arrPsd = arrayPasswd[index];

          if (arrPsd && arrPsd.length === 0) {
            passwdLen = index;
            break;
          } else if (index === 14) {
            passwdLen = 15;
          }
        }

        let ok = false;

        this.psd = arrayPasswd.reduce((epr, cur, index) => {
          if (index === 1) {
            epr = /[0-9]/.test(epr) ? /[0-9]/.exec(epr)[0] : epr[0];
          }
          if (cur && !ok) {
            const next = /[0-9]/.test(cur) ? /[0-9]/.exec(cur)[0] : cur[0];
            return epr + next;
          } else {
            ok = true;
            return epr;
          }
        });

        this.cupPsd = arrayPasswd.reduce((epr, cur) => {
          return epr + " | " + cur;
        });

        this.cupOk = true;
      } catch (error) {
        this.cupOk = false;
        this.cupErr = true;
        printLog("Error", error);
      }
    }
  }
};
</script>
<style lang="scss">
@import "../../scss/mixins/mixin";

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

h1 {
  margin: 0.5rem 0;
  @extend %fcc;

  span {
    margin-top: 10px;
    font-size: 1rem;

    a {
      font-size: 1rem;
      font-style: italic;
      text-decoration: underline;
    }
  }
}

code {
  display: block;
  margin-bottom: 1rem;
  @include bgcBox(#2d2d2d);
  text-indent: 10px;
}

.card {
  margin-bottom: 1rem;
}

div.layui-layer-btn {
  a {
    color: #fff !important;
  }
}
</style>