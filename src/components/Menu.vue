<template>
  <div id="Menu">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#393D49"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          style="height: 100vh;">
          <el-menu-item index="1" @click="go('/main/index')">
            <i class="el-icon-menu"></i>
            <span slot="title">主页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>记录查询</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="go('/main/payment')">
                <i class="el-icon-loading"></i>
                <span>缴费详情</span>
              </el-menu-item>
              <el-menu-item index="2-2" @click="go('/main/actpayment')">
                <i class="el-icon-loading"></i>
                <span>活动缴费详情</span>
              </el-menu-item>
              <el-menu-item index="2-3" @click="go('/main/recharge')">
                <i class="el-icon-bell"></i>
                <span>卡充值记录</span>
              </el-menu-item>
              <el-menu-item index="2-4" @click="go('/main/consume')">
                <i class="el-icon-edit"></i>
                <span>会员消费记录</span>
              </el-menu-item>
              <el-menu-item index="2-5" @click="go('/main/reservation')">
                <i class="el-icon-mobile-phone"></i>
                <span>预约单记录</span>
              </el-menu-item>
              <el-menu-item index="2-6" @click="go('/main/sms')">
                <i class="el-icon-mobile-phone"></i>
                <span>短信发送记录</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-news"></i>
              <span>客户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1" @click="go('/main/viprecord')">
                <i class="el-icon-loading"></i>
                <span>会员卡管理</span>
              </el-menu-item>
              <el-menu-item index="3-2" @click="go('/main/usermanage')">
                <i class="el-icon-bell"></i>
                <span>用户管理</span>
              </el-menu-item>
              <el-menu-item index="3-3" @click="go('/main/approve')">
                <i class="el-icon-edit"></i>
                <span>会员认证申请</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="4" @click="go('/main/shopManage')">
            <i class="el-icon-message"></i>
            <span slot="title">商家管理</span>
          </el-menu-item>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-message"></i>
              <span>协会管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1" @click="go('/main/certificate')">
                <i class="el-icon-bell"></i>
                <span>证书上传</span>
              </el-menu-item>
              <el-menu-item index="5-2" @click="go('/main/honor')">
                <i class="el-icon-bell"></i>
                <span>协会荣誉</span>
              </el-menu-item>
              <el-menu-item index="5-3" @click="go('/main/userrank')">
                <i class="el-icon-edit"></i>
                <span>协会会员级别</span>
              </el-menu-item>
              <el-menu-item index="5-4" @click="go('/main/shopsort')">
                <i class="el-icon-mobile-phone"></i>
                <span>商家类别</span>
              </el-menu-item>
              <el-menu-item index="5-5" @click="go('/main/shoprank')">
                <i class="el-icon-mobile-phone"></i>
                <span>商家级别</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-message"></i>
              <span>活动管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="6-1" @click="go('/main/activity')">
                <i class="el-icon-loading"></i>
                <span>活动管理</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as axios from "@/common/js/axiosServer.js";
export default {
  created(){
    this.out();
  },
  methods: {
    go(url) {
      this.$router.push({path: url});
    },
    out(){
      let OpenId = sessionStorage.getItem("OpenId");
      let getUser = axios.getUser(OpenId);
      getUser.then((res) => {
        if(res.data.msg != 'OK'){
          this.$message.error(res.data.msg);
          this.$router.push({path: '/login'});
          sessionStorage.removeItem("OpenId");
          sessionStorage.removeItem("id");
        }
      })
    },
  }
}
</script>

<style scoped>
#Menu{
  text-align: left;
}
</style>
