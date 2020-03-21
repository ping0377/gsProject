<template>
  <div>
    <el-main style="padding: 0px; height: calc(100vh - 30px);">
      <quill-edit
        v-model="article.content"
        :oHtml="article.content"
        @input="UpContent"
        style="margin-top: 28px;"/>
    </el-main>
    <el-footer style="height: 30px; padding: 0px;">
      <el-button style="width: 100%; padding: 7px 0px; margin: 0px;" type="success" @click="overEdit">完成编辑</el-button>
    </el-footer>
  </div>
</template>

<script>
import * as axios from "@/common/js/axiosServer.js";
import quillEdit from "./MyInfo_edit.vue";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  data() {
    return {
      article: {
        content: ''
      },
      id:""
    }
  },
  watch: {
    $route: {
      handler: function() {
        this.id = this.$route.query.id;
        this.article.content = this.$route.query.text;
      },
      immediate: true
    }
  },
  components: {
    quillEdit,
  },
  created(){
    this.out();
    if(!this.id){
      this.$router.push({path: '/main/activity'})
    }
  },
  methods: {
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
    go(url){
      this.$router.push({path: url});
    },
    goEdit(){
      
    },
    // 结束编辑
    overEdit(){
      let OpenId = sessionStorage.getItem("OpenId");
      let obj = {
        OpenId:OpenId,
        bodyText:this.article.content,
        pkId:this.id
      }
      let activityEdit = axios.activityEdit(obj);
      activityEdit.then((res) => {
        if(res.data.msg == 'OK'){
          this.$message.success('编辑成功');
          this.$router.push({
            path: '/activityedit',
            name: "activityedit",
            query:{
              id:this.id,
              text:this.article.content
            }
          });
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    // 同步输入
    UpContent(ev) {
      this.article.content = ev;
    },
  }
}
</script>

<style scoped>
.header {
  padding: 10px 15px;
  background-color: #393D49;
  color: white;
}
.img{
  width: 22px;
  height: 22px;
}
.box-card{
  width: 96%;
  margin: 5px auto;
}
</style>
