<template>
  <div id="Approve">
    <el-card class="box-card">
     <div v-for="(item,index) in data" :key="index">
        <div class="box" @click="review(item)">
          <div class="img-box">
            <img src="../../../static/img/ccic.png" class="img" alt="img">
          </div>
          <div class="text-box">
            <el-row>
              <el-col :span="12" class="hover">{{item.contactName}}</el-col>
              <el-col :span="12" style="text-align: center;">{{item.contactNumber}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="time">{{item.createTime}}</el-col>
            </el-row>
          </div>
          <div class="icon-box">
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
     </div>
    </el-card>
    <!-- 审核弹窗 -->
    <el-dialog title="审核" :visible.sync="dialogVisible" fullscreen>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">申请单位名称:</dd>
        <dd class="item xqfl2">{{title}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">电话:</dd>
        <dd class="item xqfl2">{{tel}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">地址:</dd>
        <dd class="item xqfl2">{{shopSite}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">状态:</dd>
        <dd class="item xqfl2">{{state}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">类别:</dd>
        <dd class="item">
          <el-select v-model="S_class" placeholder="请选择类别" style="width: 100%">
            <el-option
              v-for="item in classOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">级别:</dd>
        <dd class="item">
          <el-select v-model="S_rank" placeholder="请选择级别" style="width: 100%">
            <el-option
              v-for="item in rankOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">营业执照:</dd>
        <dd class="item view-img-box">
          <div class="view-img" v-for="(item,index) in licenseList" :key="index">
            <img :src="item" alt="img" @error="defImg" class="Img" @click="showImg(item)">
          </div>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">身份证:</dd>
        <dd class="item view-img-box">
          <div class="view-img" v-for="(item,index) in idcardList" :key="index">
            <img :src="item" alt="img" @error="defImg" class="Img" @click="showImg(item)">
          </div>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">入会协议:</dd>
        <dd class="item view-img-box">
          <div class="view-img" v-for="(item,index) in protocolList" :key="index">
            <img :src="item" alt="img" @error="defImg" class="Img" @click="showImg(item)">
          </div>
        </dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="auditProcess(false)" :disabled="disbutton">拒绝申请</el-button>
        <el-button type="success" @click="auditProcess(true)" :disabled="disbutton">通过申请</el-button>
      </span>
    </el-dialog>
    <!-- 图片显示 -->
    <el-dialog title="" :visible.sync="dialogVisible2" fullscreen>
      <div class="show-img-box">
        <img :src="imgView" alt="img" style="width: 100%;">
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as axios from "@/common/js/axiosServer.js";
export default {
  data(){
    return{
      data:[],
      dialogVisible:false,
      licenseList:[],
      idcardList:[],
      protocolList:[],
      tel:"",
      title:"",
      shopSite:"",
      id:"",
      state:"",
      disbutton:false,
      S_class:"",
      S_rank:"",
      classOptions:[],
      rankOptions:[],
      dialogVisible2:false,
      imgView:""
    }
  },
  created(){
    this.getData();
    this.getClass();
    this.getRank();
  },
  methods:{
    formatDate(now) { 
      let year=now.getFullYear();
      let month=now.getMonth()+1;
      let date=now.getDate();
      let hour=now.getHours();
      let minute=now.getMinutes();
      let second=now.getSeconds();
      if(month<10){
        month = '0' + month;
      };
      if(date<10){
        date = '0' + date;
      };
      if(hour<10){
        hour = '0' + hour;
      };
      if(minute<10){
        minute = '0' + minute;
      };
      if(second<10){
        second = '0' + second;
      };
      return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
    },
    getData(){
      let OpenId = sessionStorage.getItem('OpenId');
      let fkId = sessionStorage.getItem("id");
      let obj = {
        OpenId:OpenId,
        ccoicId:fkId
      }
      let getApprove = axios.getApprove(obj);
      getApprove.then((res) => {
        if(res.data.msg == 'OK'){
          let data = res.data.data;
          for(let i=0;i<data.length;i++){
            let timeData = new Date(data[i].createTime)
            let time = this.formatDate(timeData);
            data[i].createTime = time;
            data[i].businessLicence = JSON.parse(data[i].businessLicence);
            data[i].idCardFront = JSON.parse(data[i].idCardFront);
            data[i].photoCopy = JSON.parse(data[i].photoCopy);
          }
          this.data = data;
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    getClass(){
      this.classOptions = [];
      let OpenId = sessionStorage.getItem("OpenId");
      let fkId = sessionStorage.getItem("id");
      let getShopOptions = axios.getShopOptions(OpenId,fkId);
      getShopOptions.then((res) => {
        if(res.data.msg == 'OK'){
          let data = res.data.data;
          for(let i=0;i<data.length;i++){
            this.classOptions.push({value:data[i].pk_id,label:data[i].typeName});
          }
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    getRank(){
      this.rankOptions = [];
      let OpenId = sessionStorage.getItem('OpenId');
      let fkId = sessionStorage.getItem("id");
      let obj = {
        fkCcoicId:fkId,
        OpenId:OpenId
      };
      let getShopRank = axios.getShopRank(obj);
      getShopRank.then((res) => {
        if(res.data.msg == 'OK'){
          let data = res.data.data.businessLevelAll;
          for(let i=0;i<data.length;i++){
            this.rankOptions.push({value:data[i].pk_id,label:data[i].levelName});
          }
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    defImg(){
      event.target.src = "./static/img/zhanwei.png";
    },
    review(data){
      this.licenseList = data.businessLicence;
      this.idcardList = data.idCardFront;
      this.protocolList = data.photoCopy;
      this.tel = data.contactNumber;
      this.title = data.contactName;
      this.shopSite = data.shopSite;
      this.id = data.pk_id;
      this.dialogVisible = true;
      this.check(data);
    },
    check(data){
      if(data.applyForComplete == true){
        this.state = "已审核";
        this.disbutton = true;
      }else{
        this.state = "未审核";
        this.disbutton = false;
      }
    },
    auditProcess(data){
      let OpenId = sessionStorage.getItem('OpenId');
      let fkId = sessionStorage.getItem('id');
      let obj = {
        OpenId:OpenId,
        pkId:this.id,
        pass:data,
        applyForComplete:true,
        fkBusinessTypeId:this.S_class,
        fkLevelId:this.S_rank,
        fkCcoicId:fkId,
      }
      let auditProcess = axios.auditProcess(obj);
      auditProcess.then((res) => {
        if(res.data.msg == 'OK'){
          this.$message.success('操作成功');
          this.getData();
          this.dialogVisible = false;
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    showImg(data){
      this.imgView = data;
      this.dialogVisible2 = true;
    }
  }
}
</script>

<style scoped>
.box-card {
  width: 96%;
  margin: 5px auto;
  max-height: calc(100vh - 54px);
  overflow-y: scroll;
}
dd{
  margin: 0px;
}
.box{
  overflow: hidden;
  padding: 5px 0px;
  border-bottom: 1px solid #EBEEF5;
}
.img-box,.text-box,.icon-box{
  float: left;
}
.img-box{
  height: 40px;
}
.text-box{
  text-align: left;
  font-size: 14px;
  line-height: 20px;
  width: calc(100vw - 80px);
}
.icon-box{
  line-height: 40px;
  width: 20px;
}
.img{
  width: 30px;
  height: 30px;
  margin: 5px;
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
.xqfl{
  overflow: hidden;
}
.xqfl1{
  float: left;
  margin-bottom: 5px;
  margin-right: 5px;
}
.xqfl2{
  float: left;
  line-height: 19px;
}
.Img{
  max-width: 100%;
}
.hover{
  overflow: hidden;
  white-space:nowrap;
  text-overflow: ellipsis;
}
.time{
  font-size: 11px;
  color: #8E8E8E;
}
.view-img-box{
  display: flex;
  align-items: center;
}
.view-img{
  max-width: 45%;
  margin-right: 5px;
}
.show-img-box{
  width: calc(100% - 10px);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>