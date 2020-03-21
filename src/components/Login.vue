<template>
  <div id="login">
    <div id="window">
      <div id="title">
        <h1>登 录</h1>
      </div>
      <div id="border">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
          style="width: 90%; margin: auto;"
        >
          <el-form-item prop="user">
            <el-input
              v-model="ruleForm.user"
              class="input"
              placeholder="请输入手机号"
              autocomplete="off"
              @keyup.enter.native="submitForm('ruleForm')"
            ></el-input>
          </el-form-item>
          <el-form-item prop="pw">
            <el-input
              type="password"
              v-model="ruleForm.pw"
              placeholder="请输入密码"
              autocomplete="off"
              @keyup.enter.native="submitForm('ruleForm')"
            ></el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 10px;">
            <el-button type="success" @click="submitForm('ruleForm')" style="width: 100%;">登录</el-button>
          </el-form-item>
          <div class="item-button">
            <div class="item-button-left">
              <el-button type="text" size="small" class="button" @click="dialogVisible = true">忘记密码</el-button>
            </div>
            <div class="item-button-right">
              <el-button type="text" size="small" class="button" disabled="disabled">协会注册</el-button>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <!-- 忘记密码弹窗 -->
    <el-dialog title="忘记密码" :visible.sync="dialogVisible" width="90%">
      <el-input v-model="input1" placeholder="请输入手机号" class="change-input" clearable></el-input>
      <el-input
        v-model="input2"
        placeholder="请输入邮箱"
        class="change-input"
        @focus="getAdminEmail()"
        clearable
      ></el-input>
      <el-button style="width: 100%;" class="change-input" @click="getMail()">获取邮箱验证码</el-button>
      <el-input v-model="input3" placeholder="请输入验证码" class="change-input" clearable></el-input>
      <el-input v-model="input4" show-password placeholder="请输入新密码" clearable></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="changePassWorld()" style="width: 100%;">确认修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as axios from "@/common/js/axiosServer.js";
export default {
  data() {
    var checkUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        callback();
      }
    };
    var checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入登录密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        user: "",
        pw: ""
      },
      rules: {
        user: [{ validator: checkUser, trigger: "blur" }],
        pw: [{ validator: checkPass, trigger: "blur" }]
      },
      dialogVisible: false,
      input1: "", // 手机号
      input2: "", // 邮箱
      input3: "", // 验证码
      input4: "" // 新密码
    };
  },
  created() {
    this.getURL();
  },
  methods: {
    getURL() {
      if (!sessionStorage.getItem("href")) {
        let url = location.href;
        if (url.split("#/")[1] == "login") {
          let href = location.href.split("login")[0];
          sessionStorage.setItem("href", href);
        } else {
          sessionStorage.setItem("href", location.href);
        }
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let username = this.ruleForm.user;
          let pass = this.ruleForm.pw;
          let getLogin = axios.getLogin(username, pass);
          getLogin.then(res => {
            console.log(res);
            if (res.data.msg == "OK") {
              sessionStorage.setItem("OpenId", res.data.data);
              this.$router.push({ path: "/main/index" });
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    getAdminEmail() {
      let tel = this.input1;
      let getMail = axios.getMail(tel);
      getMail.then(res => {
        if (res.data.msg == "OK") {
          this.input2 = res.data.data;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    getMail() {
      let em = this.input2;
      let getEM = axios.getEM(em);
      getEM.then(res => {
        if (res.data.msg == "OK") {
          this.$message.success("验证码获取成功");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    changePassWorld() {
      let tel = this.input1; // 手机号
      let em = this.input2; // 邮箱
      let code = this.input3; // 验证码
      let pwd = this.input4; // 新密码
      let changePW = axios.changePW(em, tel, code, pwd);
      changePW.then(res => {
        if (res.data.msg == "OK") {
          this.$message.success("修改密码成功");
        } else {
          this.$message.error(res.data.msg);
        }
      });
      this.dialogVisible = false;
    }
  }
};
</script>

<style scoped>
#login {
  background: linear-gradient(rgb(61, 184, 221), rgb(5, 34, 112));
  height: 100vh;
}
#window {
  min-width: 250px;
  width: 80%;
  height: 280px;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#title {
  width: calc(100% + 4px);
  margin: auto;
  margin-bottom: 10px;
  background-color: linear-gradient(rgb(48, 149, 196), rgb(44, 140, 189));
  color: white;
}
#title h1 {
  margin: 0px;
}
#border {
  width: 90%;
  margin: auto;
  padding-top: 10px;
  padding-bottom: 10px;
  border: 2px solid white;
  border-radius: 10px;
  background-color: white;
}
.item-button {
  overflow: hidden;
}
.item-button-left {
  float: left;
}
.item-button-right {
  float: right;
}
.button {
  padding: 0px;
  color: #cccccc;
}
.change-input {
  margin-bottom: 10px;
}
.input input {
  height: 40px;
}
</style>
