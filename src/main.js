// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vconsole from 'vconsole'
let vConsole = new Vconsole()
export default vConsole

let HTTP = 'http://' + location.host + '/association/'
// Vue.prototype.$GLO = {host:'http://xyxh.fryxy.cn/association/'}
Vue.prototype.$GLO = {host: HTTP};
// Vue.prototype.$GLO = {host:'http://192.168.1.116:8080/'}
Vue.prototype.$vipId = {};
Vue.prototype.beforeAvatarUpload = function (file) {
  const fileSize = file.size / 1024 < 513;
  if (!fileSize) {
    this.$message.error('上传图片大小不能超过512KB!');
  }
  return fileSize;
},
Vue.use(ElementUI);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// 日期过滤
Vue.filter('data', function (value) {
  let MD = value.split("-")[1] + "-" + value.split("-")[2].split(" ")[0];
  return MD;
})

// 时间过滤
Vue.filter('time', function (value) {
  let HM = value.split("-")[2].split(" ")[1].split(":")[0] + ":" + value.split("-")[2].split(" ")[1].split(":")[1];
  return HM;
})