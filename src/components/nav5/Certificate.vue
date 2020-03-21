<template>
  <div id="Certificate">
    <el-card class="box-card">
      <div class="showText">
        <div class="certificate-box" v-for="(item,index) in certificateList" :key="index">
          <div class="certificate-item-box" @click="showButtonDown(index)">
            <div class="certificate-item-left">
              <div class="item-img-box">
                <img :src="item.path" alt="img" />
              </div>
              <div class="item-text-border">
                <div class="item-text-box">
                  <div class="item-text-top">
                    <div class="item-text-title">{{item.certificateName}}</div>
                    <div class="item-text-title">{{item.holderName}}</div>
                  </div>
                  <div class="item-text-bottom">
                    <div>{{item.category}}</div>
                    <div>{{item.profession}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="certificate-item-right">
              <i class="el-icon-arrow-right" v-show="!item.itemActive"></i>
              <i class="el-icon-arrow-down" v-show="item.itemActive"></i>
            </div>
          </div>
          <div class="certificate-item-button" v-show="item.itemActive">
            <el-button size="mini" type="primary" @click="getInfoData(item)">详情</el-button>
            <el-button size="mini" type="success" @click="changeItem(item)">编辑</el-button>
            <el-button size="mini" type="danger" @click="delItem(item)">删除</el-button>
          </div>
        </div>
      </div>
      <div style="width: 100%; display: flex; border-top: 1px solid #EAEDF4;">
        <div style="width: 50%; border-right: 1px solid #EAEDF4;">
          <el-button
            type="text"
            style="width: 100%; padding: 7px 0px;"
            @click="dialogVisible1 = true"
          >添 加</el-button>
        </div>
        <div style="width: calc(50% - 1px);">
          <el-button
            type="text"
            style="width: 100%; padding: 7px 0px;"
            @click="dialogVisible4 = true"
          >查 询</el-button>
        </div>
      </div>
    </el-card>
    <!-- 添加弹框 -->
    <el-dialog title="添加" :visible.sync="dialogVisible1" fullscreen>
      <dl class="text">
        <dd class="item1">
          带
          <span class="must">*</span>为必填项
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">证书名称:</dd>
        <dd class="item">
          <el-input v-model="addName" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">
          证书编号
          <span class="must">*</span>:
        </dd>
        <dd class="item">
          <el-input v-model="addNum" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">
          证书工种
          <span class="must">*</span>:
        </dd>
        <dd class="item">
          <el-input v-model="addWork" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">
          证书级别
          <span class="must">*</span>:
        </dd>
        <dd class="item">
          <el-input v-model="addType" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">
          持证人身份证号
          <span class="must">*</span>:
        </dd>
        <dd class="item">
          <el-input v-model="addUserId" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">
          持证人姓名
          <span class="must">*</span>:
        </dd>
        <dd class="item">
          <el-input v-model="addUserName" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item">
          <el-upload
            class="upload-demo"
            action="#"
            :http-request="addImg"
            :limit="1"
            ref="upLoad20"
            :before-upload="beforeAvatarUpload"
          >
            <span style="text-align: left;">
              请选择证书图片
              <!-- <span class="must">*</span>: -->
            </span>
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="addData()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑弹框 -->
    <el-dialog title="编辑" :visible.sync="dialogVisible2" fullscreen>
      <dl class="text">
        <dd class="item1">
          带
          <span class="must">*</span>为必填项
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">证书名称:</dd>
        <dd class="item">
          <el-input v-model="changeName" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">
          证书编号
          <span class="must">*</span>:
        </dd>
        <dd class="item">
          <el-input v-model="changeNum" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">
          证书工种
          <span class="must">*</span>:
        </dd>
        <dd class="item">
          <el-input v-model="changeWork" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">
          证书类型
          <span class="must">*</span>:
        </dd>
        <dd class="item">
          <el-input v-model="changeType" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">
          持证人身份证号
          <span class="must">*</span>:
        </dd>
        <dd class="item">
          <el-input v-model="changeUserId" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">
          持证人姓名
          <span class="must">*</span>:
        </dd>
        <dd class="item">
          <el-input v-model="changeUserName" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item">
          <el-upload
            class="upload-demo"
            action="#"
            :http-request="changeImg"
            :limit="1"
            ref="upLoad21"
            :before-upload="beforeAvatarUpload"
          >
            <span style="text-align: left;">请选择证书图片:</span>
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="changeData()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除弹窗 -->
    <el-dialog title="确认删除?" :visible.sync="dialogVisible3" width="90%" top="25vh">
      <dl style="margin-bottom: 10px;" class="del">
        <dd class="del1">编号:</dd>
        <dd class="del2">{{delId}}</dd>
      </dl>
      <dl style="margin-bottom: 10px;" class="del">
        <dd class="del1">持卡人名称:</dd>
        <dd class="del2">{{delName}}</dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="delData">删 除</el-button>
      </span>
    </el-dialog>
    <!-- 查询弹窗 -->
    <el-dialog title="查询" :visible.sync="dialogVisible4" fullscreen>
      <dl class="text">
        <dd class="item1">证书名称:</dd>
        <dd class="item">
          <el-input v-model="S_Name" clearable autocomplete="off"></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">
          证书编号
          <span class="must">*</span>:
        </dd>
        <dd class="item">
          <el-input v-model="S_Num" clearable autocomplete="off"></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">
          证书工种
          <span class="must">*</span>:
        </dd>
        <dd class="item">
          <el-input v-model="S_Work" clearable autocomplete="off"></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">
          证书类型
          <span class="must">*</span>:
        </dd>
        <dd class="item">
          <el-input v-model="S_Type" clearable autocomplete="off"></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">
          持证人身份证号
          <span class="must">*</span>:
        </dd>
        <dd class="item">
          <el-input v-model="S_UserId" clearable autocomplete="off"></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">开始时间:</dd>
        <dd class="item">
          <el-date-picker
            v-model="S_stime"
            type="datetime"
            placeholder="请选择时间"
            style="width: 100%"
            value-format="yyyy-MM-dd HH:mm:ss"
            :editable="false"
          ></el-date-picker>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">结束时间:</dd>
        <dd class="item">
          <el-date-picker
            v-model="S_etime"
            type="datetime"
            placeholder="请选择时间"
            style="width: 100%"
            value-format="yyyy-MM-dd HH:mm:ss"
            :editable="false"
            default-time="23:59:59"
          ></el-date-picker>
        </dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible4 = false">取 消</el-button>
        <el-button type="primary" @click="searchData()">查 询</el-button>
      </span>
    </el-dialog>
    <!-- 详情弹窗 -->
    <el-dialog title="详情" :visible.sync="dialogVisible5" width="90%">
      <dl class="info">
        <dd class="info-item-left">证书名称:</dd>
        <dd class="info-item-right">{{name}}</dd>
      </dl>
      <dl class="info">
        <dd class="info-item-left">证书编号:</dd>
        <dd class="info-item-right">{{num}}</dd>
      </dl>
      <dl class="info">
        <dd class="info-item-left">证书工种:</dd>
        <dd class="info-item-right">{{work}}</dd>
      </dl>
      <dl class="info">
        <dd class="info-item-left">证书类型:</dd>
        <dd class="info-item-right">{{type}}</dd>
      </dl>
      <dl class="info">
        <dd class="info-item-left">持证人身份证号:</dd>
        <dd class="info-item-right">{{userId}}</dd>
      </dl>
      <dl class="info">
        <dd class="info-item-left">持证人姓名:</dd>
        <dd class="info-item-right">{{userName}}</dd>
      </dl>
      <dl class="info">
        <dd class="info-item-left">创建时间:</dd>
        <dd class="info-item-right">{{time}}</dd>
      </dl>
      <dl>
        <dd style="text-align: left;">证书图标:</dd>
        <dd class="img-box">
          <div class="info-img-box">
            <img :src="icon" alt="img" />
          </div>
        </dd>
      </dl>
    </el-dialog>
  </div>
</template>

<script>
import * as axios from "@/common/js/axiosServer.js";
export default {
  data() {
    return {
      certificateList: [],
      // 添加
      dialogVisible1: false,
      addType: "",
      addWork: "",
      addNum: "",
      addName: "",
      addUserId: "",
      addUserName: "",
      addIcon: "",
      // 编辑
      dialogVisible2: false,
      changeType: "",
      changeWork: "",
      changeNum: "",
      changeName: "",
      changeUserId: "",
      changeUserName: "",
      changeIcon: "",
      // 删除
      dialogVisible3: false,
      delName: "",
      delId: "",
      // 查询
      dialogVisible4: false,
      S_Type: "",
      S_Work: "",
      S_Num: "",
      S_Name: "",
      S_UserId: "",
      S_stime: "",
      S_etime: "",
      // 详情
      dialogVisible5: false,
      type: "",
      work: "",
      num: "",
      name: "",
      userId: "",
      userName: "",
      icon: "",
      time: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    formatDate(now) {
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      let date = now.getDate();
      let hour = now.getHours();
      let minute = now.getMinutes();
      let second = now.getSeconds();
      if (month < 10) {
        month = "0" + month;
      }
      if (date < 10) {
        date = "0" + date;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }
      return (
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    },
    showButtonDown(index) {
      let data = this.certificateList;
      for (let i = 0; i < data.length; i++) {
        if (i == index) {
          if (data[i].itemActive == true) {
            data[i].itemActive = false;
          } else {
            data[i].itemActive = true;
          }
        } else {
          data[i].itemActive = false;
        }
      }
    },
    getData() {
      let pkId = sessionStorage.getItem("id");
      let obj = {
        cid: pkId,
        pkId: "",
        name: "",
        idNum: "",
        profession: "",
        category: "",
        startDate: "",
        endDate: ""
      };
      let searchCertificate = axios.searchCertificate(obj);
      searchCertificate.then(res => {
        console.log(res);
        if (res.data.msg == "OK") {
          let data = res.data.data;
          for (let i = 0; i < data.length; i++) {
            let time = this.formatDate(new Date(data[i].createDate));
            data[i].createDate = time;
            data[i].itemActive = false;
            if (!data[i].path || data[i].path == "") {
              data[i].path = "./static/img/zhanwei.jpg";
            }
            if (!data[i].certificateName || data[i].certificateName == "") {
              data[i].certificateName = "未填写";
            }
          }
          this.certificateList = data;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 添加证书上传
    addData() {
      let OpenId = sessionStorage.getItem("OpenId");
      let pkId = sessionStorage.getItem("id");
      let obj = {
        OpenId: OpenId,
        pkId: this.addNum,
        certificateName: this.addName,
        holderName: this.addUserName,
        holderIdNum: this.addUserId,
        path: this.addIcon,
        coicId: pkId,
        profession: this.addWork,
        category: this.addType
      };
      let addCertificate = axios.addCertificate(obj);
      addCertificate.then(res => {
        if (res.data.msg == "OK") {
          this.$message.success("添加成功");
          this.addNum = "";
          this.addName = "";
          this.addUserName = "";
          this.addUserId = "";
          this.addWork = "";
          this.addType = "";
          this.$refs.upLoad20.clearFiles();
          this.getData();
          this.dialogVisible1 = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    addImg(file) {
      let File = file.file;
      let addImg = axios.addImg(File);
      addImg.then(res => {
        if (res.data.msg == "OK") {
          this.addIcon = res.data.data;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 编辑
    changeItem(data) {
      this.changeType = data.category;
      this.changeWork = data.profession;
      this.changeNum = data.pkId;
      this.changeName = data.certificateName;
      this.changeUserId = data.holderIdNum;
      this.changeUserName = data.holderName;
      this.changeIcon = data.path;
      this.dialogVisible2 = true;
    },
    changeData() {
      let OpenId = sessionStorage.getItem("OpenId");
      let obj = {
        OpenId: OpenId,
        pkId: this.changeNum,
        certificateName: this.changeName,
        holderName: this.changeUserName,
        holderIdNum: this.changeUserId,
        path: this.changeIcon,
        profession: this.changeWork,
        category: this.changeType
      };
      let changeCertificate = axios.changeCertificate(obj);
      changeCertificate.then(res => {
        if (res.data.msg == "OK") {
          this.$message.success("编辑成功");
          this.$refs.upLoad21.clearFiles();
          this.getData();
          this.dialogVisible2 = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    changeImg(file) {
      let File = file.file;
      let addImg = axios.addImg(File);
      addImg.then(res => {
        if (res.data.msg == "OK") {
          this.changeIcon = res.data.data;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 删除
    delItem(data) {
      this.delName = data.holderName;
      this.delId = data.pkId;
      this.dialogVisible3 = true;
    },
    delData() {
      let OpenId = sessionStorage.getItem("OpenId");
      let pkId = sessionStorage.getItem("id");
      let obj = {
        OpenId: OpenId,
        cid: pkId,
        cerid: this.delId
      };
      let delCertificate = axios.delCertificate(obj);
      delCertificate.then(res => {
        if (res.data.msg == "OK") {
          this.$message.success("删除成功");
          this.getData();
          this.dialogVisible3 = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 查询
    searchData() {
      let pkId = sessionStorage.getItem("id");
      let obj = {
        cid: pkId,
        pkId: this.S_Num,
        name: this.S_Name,
        idNum: this.S_UserId,
        profession: this.S_Work,
        category: this.S_Type,
        startDate: this.S_stime,
        endDate: this.S_etime
      };
      let searchCertificate = axios.searchCertificate(obj);
      searchCertificate.then(res => {
        if (res.data.msg == "OK") {
          let data = res.data.data;
          for (let i = 0; i < data.length; i++) {
            let time = this.formatDate(new Date(data[i].createDate));
            data[i].createDate = time;
            data[i].itemActive = false;
            if (!data[i].path || data[i].path == "") {
              data[i].path = "./static/img/zhanwei.jpg";
            }
            if (!data[i].certificateName || data[i].certificateName == "") {
              data[i].certificateName = "未填写";
            }
          }
          this.certificateList = data;
          this.dialogVisible4 = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 详情
    getInfoData(data) {
      this.type = data.category;
      this.work = data.profession;
      this.num = data.pkId;
      this.name = data.certificateName;
      this.userId = data.holderIdNum;
      this.userName = data.holderName;
      this.icon = data.path;
      this.time = data.createDate;
      this.dialogVisible5 = true;
    }
  }
};
</script>

<style scoped>
dd,
dl {
  margin: 0px;
}
.box-card {
  width: 96%;
  margin: 5px auto;
}
.showText {
  height: calc(100vh - 86px);
  overflow-y: scroll;
}
.certificate-box {
  border-bottom: 1px solid #ebeef5;
}
.certificate-item-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 1.5% 0px 1.5%;
}
.certificate-item-left {
  width: 90%;
  display: flex;
  align-items: center;
  height: 100%;
}
.item-img-box {
  width: 25%;
  height: 0px;
  padding-bottom: 20%;
  position: relative;
  margin: 0px 1.5%;
}
.item-img-box img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
}
.item-text-border {
  width: calc(75% - 1.5%);
  height: 0px;
  padding-bottom: 17%;
  position: relative;
}
.item-text-box {
  width: 100%;
  height: 100%;
  font-size: 14px;
  position: absolute;
}
.item-text-top {
  height: 50%;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 5px;
  font-weight: bold;
}
.item-text-bottom {
  height: 50%;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 5px;
}
.certificate-item-right {
  width: 10%;
}
.certificate-item-button {
  padding-top: 2%;
  padding-bottom: 8px;
}
.hide {
  display: none;
}
.must {
  color: red;
}
.text {
  margin-top: 5px;
  margin-bottom: 5px;
}
.item {
  text-align: left;
}
.item1 {
  text-align: left;
  margin-bottom: 5px;
}
.del {
  display: flex;
  align-items: center;
  justify-content: center;
}
.del1 {
  margin-right: 5px;
}
.info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.info-item-left,
.info-item-right {
  text-align: left;
  margin-bottom: 5px;
}
.info-item-left {
  margin-right: 5px;
}
.img-box {
  width: 100%;
}
.info-img-box {
  width: 80%;
  height: 0px;
  padding-bottom: 60%;
  position: relative;
}
.info-img-box img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
}
</style>