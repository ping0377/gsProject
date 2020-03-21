<template>
  <div id="Honor">
    <el-card class="box-card">
      <div class="showText" >
        <div class="item-box">
         <div v-for="(item, index) in data" :key="index" class="Item">
           <div class="img-box">
             <img :src="item.path" alt="img" class="img" @click="showImg(item)" @error="defImg">
           </div>
            <div>
              <p class="Text">{{item.cateName}}</p>
            </div>
            <div>
              <el-button size="mini" type="primary" @click="change(item)">编辑</el-button>
              <el-button size="mini" type="danger" @click="del(item)">删除</el-button>
            </div>
          </div>
        </div>
      </div>
      <div style="width: 100%;">
        <el-button type="text" style="width: 100%; padding: 7px 0px;" @click="dialogVisible4 = true">添 加</el-button>
      </div>
    </el-card>
    <!-- 图片弹窗 -->
    <el-dialog title="显示图片" :visible.sync="dialogVisible1" width="90%" top="20vh">
      <img :src="this.img" alt="img" class="viewImg">
    </el-dialog>
    <!-- 修改弹窗 -->
    <el-dialog title="编辑" :visible.sync="dialogVisible2" width="90%" top="20vh">
      <dl class="text">
          <dd class="item1">名称:</dd>
          <dd class="item">
            <el-input v-model="changeName" clearable></el-input>
          </dd>
        </dl>
      <dl class="text">
        <dd class="item">
          <el-upload
            class="upload-demo"
            action=""
            :http-request="upImg"
            :limit="1"
            :before-upload="beforeAvatarUpload"
            ref="upLoad3">
            <span style="text-align: left;">图片:</span>
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="changeData">确 认</el-button>
      </span>
    </el-dialog>
    <!-- 删除弹窗 -->
    <el-dialog title="确认删除?" :visible.sync="dialogVisible3" width="90%" top="25vh">
      <img :src="this.delImg" alt="img" class="delImg" @error="defImg">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="delData">删 除</el-button>
      </span>
    </el-dialog>
    <!-- 添加弹窗 -->
    <el-dialog title="添加" :visible.sync="dialogVisible4" width="90%" top="20vh">
      <dl class="text">
        <dd class="item1">名称:</dd>
        <dd class="item">
          <el-input v-model="name" clearable autocomplete="off"></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item">
          <el-upload
            class="upload-demo"
            action=""
            :http-request="addImg"
            :limit="1"
            :before-upload="beforeAvatarUpload"
            ref="upLoad4">
            <span style="text-align: left;">图片:</span>
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible4 = false">取 消</el-button>
        <el-button type="primary" @click="addData()">添 加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as axios from "@/common/js/axiosServer.js";
export default {
  data(){
    return{
      data:[],
      img:"",
      dialogVisible1: false,
      // 修改
      dialogVisible2: false,
      changeImg:"",
      changeName:"",
      imgId:"",
      // 删除
      dialogVisible3: false,
      delImg:"",
      Del:[],
      // 添加
      dialogVisible4: false,
      imageUrl:"",
      name:""
    }
  },
  created(){
    this.getData();
  },
  methods:{
    defImg(){
      event.target.src = "./static/img/zhanwei.jpg";
    },
    getData(){
      let OpenId = sessionStorage.getItem('OpenId');
      let fkId = sessionStorage.getItem("id");
      let getHonor = axios.getHonor(OpenId,fkId);
      getHonor.then((res) => {
        if(res.data.msg == 'OK'){
          this.data = res.data.data;
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    showImg(img){
      this.img = img.path;
      this.dialogVisible1 = true;
    },
    // 修改
    upImg(file){
      let File = file.file;
      let addImg = axios.addImg(File);
      addImg.then((res) => {
        if(res.data.msg == 'OK'){
          this.changeImg = res.data.data;
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    change(data){
      this.changeName = data.cateName;
      this.imgId = data.pk_id;
      this.dialogVisible2 = true;
    },
    changeData(){
      let img = this.changeImg;
      let name = this.changeName;
      let OpenId = sessionStorage.getItem('OpenId');
      let fkId = sessionStorage.getItem("id");
      let id = this.imgId;
      let changeHonor = axios.changeHonor(OpenId,id,img,name,fkId);
      changeHonor.then((res) => {
        if(res.data.msg == 'OK'){
          this.$message.success('编辑成功');
          this.$refs.upLoad3.clearFiles();
          this.dialogVisible2 = false;
          this.getData();
        }else{
          this.$message.error(res.data.msg);
        }
      });

    },
    // 删除
    del(img){
      this.delImg = img.path;
      this.Del = img;
      this.dialogVisible3 = true;
    },
    delData(){
      let OpenId = sessionStorage.getItem('OpenId');
      let id = this.Del.pk_id;
      let delHonor = axios.delHonor(OpenId,id);
      delHonor.then((res) => {
        if(res.data.msg == 'OK'){
          this.$message.success('删除成功');
          this.dialogVisible3 = false;
          this.getData();
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    // 添加
    addData(){
      let name = this.name;
      let img = this.imageUrl;
      let OpenId = sessionStorage.getItem('OpenId');
      let fkId = sessionStorage.getItem("id");
      let addHonor = axios.addHonor(OpenId,fkId,img,name);
      addHonor.then((res) => {
        if(res.data.msg == 'OK'){
          this.$message.success('添加成功');
          this.$refs.upLoad4.clearFiles();
          this.name = "";
          this.dialogVisible4 = false;
          this.getData();
        }else{
          this.$message.error(res.data.msg);
        }
      });

    },
    addImg(file){
      let File = file.file;
      let addImg = axios.addImg(File);
      addImg.then((res) => {
        if(res.data.msg == 'OK'){
          this.imageUrl = res.data.data;
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
  }
}
</script>

<style scoped>
dd{
  margin: 0px;
}
.box-card {
  width: 96%;
  margin: 5px auto;
}
.showText {
  height: 100px;
  height: calc(100vh - 85px);
  overflow-y: scroll;
}
.item-box{
  overflow: hidden;
}
.Item{
  float: left;
  border: 1px solid #DDDDDD;
  border-radius: 5px;
  margin: 5px 5px 0px 5px;
  padding-bottom: 10px;
  width: calc(50% - 10px);
}
.Item:nth-of-type(2n){
  margin-left: 0px;
}
.img-box{
  margin: 5px;
  border: 1px solid #DDDDDD;
  width: calc(100% - 12px);
  height: 0;
  padding-bottom: 70%;
  position: relative;
}
.img{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
}
.Text{
  margin: 0px;
  margin-bottom: 5px;
}
.viewImg{
  width: 90%
}
.delImg{
  width: 50%;
}
dd{
  margin: 0px;
}
.text{
  margin-top: 5px;
  margin-bottom: 5px;
}
.item{
  text-align: left;
}
.item1{
  text-align: left;
  margin-bottom: 5px;
}
</style>
