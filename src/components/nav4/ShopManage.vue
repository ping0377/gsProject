<template>
  <div id="ShopManage">
    <el-card class="box-card">
      <el-tabs
        type="card"
        v-model="activeName"
        @tab-click="handleClick"
        style="height: calc(100vh - 85px);"
      >
        <!-- 其他商家 -->
        <el-tab-pane :label="aTypeName[0].typeName" :name="aTypeName[0].pk_id">
          <el-collapse accordion class="showText">
            <el-collapse-item v-for="(item,index) in shop" :key="index">
              <template slot="title">
                <div class="shop-box">
                  <div class="img-box">
                    <img :src="item.shopIcon" class="img" alt="img" @error="defImg" />
                  </div>
                  <div>{{item.shopName}}</div>
                </div>
              </template>
              <div>
                <el-row>
                  <el-col
                    :span="6"
                    style="text-align: left; padding-left: 10px; line-height: 28px;"
                  >店家描述</el-col>
                  <el-col :span="18">
                    <el-button size="mini" type="primary" @click="shopInfo(item)">审核</el-button>
                    <el-button size="mini" type="success" @click="level(item)">升级</el-button>
                    <el-button size="mini" type="primary" @click="shopEdit(item)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="del(item)">删除</el-button>
                  </el-col>
                </el-row>
              </div>
              <div style="text-align: left; padding-left: 10px;">{{item.shopDescribe}}</div>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <!-- 会员商户 -->
        <el-tab-pane :label="aTypeName[1].typeName" :name="aTypeName[1].pk_id">
          <el-collapse accordion class="showText">
            <el-collapse-item v-for="(item,index) in shop" :key="index">
              <template slot="title">
                <div class="shop-box">
                  <div class="img-box">
                    <img :src="item.shopIcon" class="img" alt="img" @error="defImg" />
                  </div>
                  <div>{{item.shopName}}</div>
                </div>
              </template>
              <div>
                <el-row>
                  <el-col
                    :span="6"
                    style="text-align: left; padding-left: 10px; line-height: 28px;"
                  >店家描述</el-col>
                  <el-col :span="18">
                    <el-button size="mini" type="primary" @click="shopInfo(item)">审核</el-button>
                    <el-button size="mini" type="success" @click="level(item)">升级</el-button>
                    <el-button size="mini" type="primary" @click="shopEdit(item)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="del(item)">删除</el-button>
                  </el-col>
                </el-row>
              </div>
              <div style="text-align: left; padding-left: 10px;">{{item.shopDescribe}}</div>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <!-- 其他协会 -->
        <el-tab-pane :label="aTypeName[2].typeName" :name="aTypeName[2].pk_id">
          <el-collapse accordion class="showText">
            <el-collapse-item v-for="(item,index) in shop" :key="index">
              <template slot="title">
                <div class="shop-box">
                  <div class="img-box">
                    <img :src="item.shopIcon" class="img" alt="img" @error="defImg" />
                  </div>
                  <div>{{item.shopName}}</div>
                </div>
              </template>
              <div>
                <el-row>
                  <el-col
                    :span="6"
                    style="text-align: left; padding-left: 10px; line-height: 28px;"
                  >店家描述</el-col>
                  <el-col :span="18">
                    <el-button size="mini" type="primary" @click="shopInfo(item)">审核</el-button>
                    <el-button size="mini" type="success" @click="level(item)">升级</el-button>
                    <el-button size="mini" type="primary" @click="shopEdit(item)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="del(item)">删除</el-button>
                  </el-col>
                </el-row>
              </div>
              <div style="text-align: left; padding-left: 10px;">{{item.shopDescribe}}</div>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
      </el-tabs>
      <div style="width: 100%; display:flex;">
        <div style="width:33%; border-right: 1px solid #EAEDF4;">
          <el-button
            type="text"
            style="width: 100%; padding: 7px 0px;"
            @click="dialogVisible4 = true"
          >添 加</el-button>
        </div>
        <div style="width:calc(33% - 1px); border-right: 1px solid #EAEDF4;">
          <el-button
            type="text"
            style="width: 100%; padding: 7px 0px;"
            @click="dialogVisible3 = true"
          >查 询</el-button>
        </div>
        <div style="width:calc(34% - 1px)">
          <el-button type="text" style="width: 100%; padding: 7px 0px;" @click="refresh()">刷 新</el-button>
        </div>
      </div>
    </el-card>
    <!-- 编辑弹窗 -->
    <el-dialog title="编辑" :visible.sync="dialogVisible1" fullscreen>
      <dl class="text">
        <dd class="item1">店铺名称:</dd>
        <dd class="item">
          <el-input v-model="c_Name" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">店铺电话:</dd>
        <dd class="item">
          <el-input v-model="c_tel" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">店铺公众号:</dd>
        <dd class="item">
          <el-input v-model="c_URL" clearable></el-input>
        </dd>
      </dl>
      <!-- <dl class="text">
        <dd class="item1">店铺分类:</dd>
        <dd class="item">
          <el-select v-model="c_TypeId" placeholder="请选择" style="width: 100%;">
            <el-option
              v-for="item in optionsT"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </dd>
      </dl>-->
      <dl class="text">
        <dd class="item1">店铺地址:</dd>
        <dd class="item">
          <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 2}" v-model="c_Site"></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">店铺描述:</dd>
        <dd class="item">
          <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 2}" v-model="c_Describe"></el-input>
        </dd>
      </dl>
      <!-- <dl class="text">
        <dd class="item1">级别:</dd>
        <dd class="item">
          <el-select v-model="c_Rank" placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in rankOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </dd>
      </dl>-->
      <dl class="text">
        <dd class="item">
          <el-upload
            :before-upload="beforeAvatarUpload"
            class="upload-demo"
            action="#"
            :http-request="upImg"
            :limit="1"
            ref="upLoad"
          >
            <span style="text-align: left;">店铺图标:</span>
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item">
          <span>详细资料:</span>
          <el-button size="small" type="primary" @click="go()">编辑详细资料</el-button>
        </dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="upchange()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除弹窗 -->
    <el-dialog title="确认删除?" :visible.sync="dialogVisible2" width="90%" top="25vh">
      <dl style="margin-bottom: 10px;" class="del">
        <dd class="del1">编号:</dd>
        <dd class="del2">{{del_ID}}</dd>
      </dl>
      <dl style="margin-bottom: 10px;" class="del">
        <dd class="del1">名称:</dd>
        <dd class="del2">{{delName}}</dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="shopDel">删 除</el-button>
      </span>
    </el-dialog>
    <!-- 查询弹窗 -->
    <el-dialog title="查询" :visible.sync="dialogVisible3" width="90%" top="20vh">
      <dl class="text">
        <dd class="item1">名称:</dd>
        <dd class="item">
          <el-input v-model="searchName" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">级别:</dd>
        <dd class="item">
          <el-select v-model="searchRank" placeholder="请选择" style="width: 100%">
            <el-option label="全部级别" value></el-option>
            <el-option
              v-for="item in rankOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="searchShop(activeName)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加弹框 -->
    <el-dialog title="添加" :visible.sync="dialogVisible4" fullscreen>
      <dl class="text">
        <dd class="item1">店铺名称:</dd>
        <dd class="item">
          <el-input v-model="addName" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">店铺电话:</dd>
        <dd class="item">
          <el-input v-model="addTel" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">店铺公众号:</dd>
        <dd class="item">
          <el-input v-model="addURL" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">店铺分类:</dd>
        <dd class="item">
          <el-select v-model="addTypeId" placeholder="请选择" style="width: 100%;">
            <el-option
              v-for="item in optionsT"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">店铺地址:</dd>
        <dd class="item">
          <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 2}" v-model="addSite"></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">店铺描述:</dd>
        <dd class="item">
          <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 2}" v-model="addDescribe"></el-input>
        </dd>
      </dl>
      <!-- <dl class="text">
        <dd class="item1">级别:</dd>
        <dd class="item">
          <el-select v-model="addRank" placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in rankOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </dd>
      </dl>-->
      <dl class="text">
        <dd class="item">
          <el-upload
            class="upload-demo"
            action="#"
            :http-request="addImg"
            :limit="1"
            ref="upLoad10"
            :before-upload="beforeAvatarUpload"
          >
            <span style="text-align: left;">店铺图标:</span>
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible4 = false">取 消</el-button>
        <el-button type="primary" @click="addData()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 升级 -->
    <el-dialog title="升级" :visible.sync="dialogVisible5" width="90%" top="25vh">
      <dl class="text">
        <dd class="item1">级别:</dd>
        <dd class="item">
          <el-select v-model="Rank" placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in rankOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">金额:</dd>
        <dd class="item">
          <el-input v-model="money" clearable></el-input>
        </dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible5 = false">取 消</el-button>
        <el-button type="primary" @click="levelUp()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as axios from "@/common/js/axiosServer.js";
export default {
  data() {
    return {
      shop: [],
      tabName: "",
      tabId: "",
      activeName: "1",
      rankOptions: [],
      optionsT: [], //分类列表
      aTypeName: [
        { typeName: "分类一" },
        { typeName: "分类二" },
        { typeName: "分类三" }
      ],
      // 编辑
      dialogVisible1: false,
      c_TypeId: "", //分类
      c_Describe: "", //描述
      c_Icon: "", //图标
      c_Name: "", //名称
      c_Site: "", //地址
      c_URL: "", //url
      c_tel: "", //电话
      c_Id: "", //id
      c_Rank: "", //级别
      // 删除
      dialogVisible2: false,
      delName: "",
      del_ID: "",
      // 查询
      dialogVisible3: false,
      searchName: "",
      searchRank: "",
      // 添加
      dialogVisible4: false,
      addRank: "",
      addIcon: "",
      addDescribe: "",
      addSite: "",
      addTypeId: "",
      addURL: "",
      addTel: "",
      addName: "",
      // 升级
      dialogVisible5: false,
      money: "",
      Rank: "",
      upId: ""
    };
  },
  created() {
    this.getRank();
    this.getType();
    this.getOptionsT();
  },
  methods: {
    defImg() {
      event.target.src = "./static/img/ccic.png";
    },
    getData(businessType) {
      let OpenId = sessionStorage.getItem("OpenId");
      let Type = businessType;
      let fkId = sessionStorage.getItem("id");
      let typeName = "后台";
      let getShop = axios.getShop(OpenId, Type, fkId, typeName);
      let zhanwei = "./static/img/ccic.png";
      getShop.then(res => {
        if (res.data.msg == "OK") {
          let shop = res.data.data;
          for (var i = 0; i < shop.length; i++) {
            if (!shop[i].shopIcon) {
              shop[i].shopIcon = zhanwei;
            }
          }
          this.shop = shop;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    getRank() {
      let OpenId = sessionStorage.getItem("OpenId");
      let fkId = sessionStorage.getItem("id");
      let obj = {
        fkCcoicId: fkId,
        OpenId: OpenId
      };
      let getShopRank = axios.getShopRank(obj);
      let rank = [];
      getShopRank.then(res => {
        if (res.data.msg == "OK") {
          let data = res.data.data.businessLevelAll;
          for (let i = 0; i < data.length; i++) {
            rank.push({ value: data[i].pk_id, label: data[i].levelName });
          }
          this.rankOptions = rank;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 分类列表
    getOptionsT() {
      this.optionsT = [];
      let OpenId = sessionStorage.getItem("OpenId");
      let fkId = sessionStorage.getItem("id");
      let getShopOptions = axios.getShopOptions(OpenId, fkId);
      getShopOptions.then(res => {
        if (res.data.msg == "OK") {
          let data = res.data.data;
          for (let i = 0; i < data.length; i++) {
            this.optionsT.push({
              value: data[i].pk_id,
              label: data[i].typeName
            });
          }
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    getType() {
      let OpenId = sessionStorage.getItem("OpenId");
      let fkid = sessionStorage.getItem("id");
      let getShopSort = axios.getShopSort(OpenId, fkid);
      getShopSort.then(res => {
        if (res.data.msg == "OK") {
          let data = res.data.data;
          for (let i = 0; i < data.length; i++) {
            let id = data[i].pk_id.toString();
            data[i].pk_id = id;
          }
          this.aTypeName = data;
          this.getData(data[0].pk_id);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 其他商家 编辑
    shopEdit(data) {
      this.c_Name = data.shopName; //名称
      this.c_tel = data.tel; //电话
      this.c_URL = data.shopURL; // url
      this.c_Describe = data.shopDescribe; //描述
      this.c_Site = data.shopSite; //地址
      this.c_TypeId = data.fk_businessTypeId;
      this.c_Rank = parseInt(data.fk_levelId);
      this.c_Id = data.pk_id;
      this.shop_Info = data.shopDetails;
      this.dialogVisible1 = true;
    },
    upImg(file) {
      let File = file.file;
      let addImg = axios.addImg(File);
      addImg.then(res => {
        if (res.data.msg == "OK") {
          this.c_Icon = res.data.data;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    upchange() {
      if (!this.tabId) {
        this.tabId = "1";
      }
      let OpenId = sessionStorage.getItem("OpenId");
      let type = this.c_TypeId;
      let obj = {
        OpenId: OpenId,
        fkBusinessTypeId: type,
        shopDescribe: this.c_Describe,
        shopName: this.c_Name,
        shopSite: this.c_Site,
        shopURL: this.c_URL,
        shopIcon: this.c_Icon,
        tel: this.c_tel,
        pkId: this.c_Id,
        fkLevelId: this.c_Rank
      };
      let reg = /^\d+$/;
      if (reg.test(this.c_tel)) {
        let editShop = axios.editShop(obj);
        editShop.then(res => {
          if (res.data.msg == "OK") {
            this.$message.success("编辑成功");
            this.getData(this.tabId);
            this.dialogVisible1 = false;
            this.$refs.upLoad.clearFiles();
          } else {
            this.$message.error(res.data.msg);
          }
        });
      } else {
        this.$message.error("电话不能为空且只能为数字");
      }
    },
    // 删除
    del(data) {
      this.del_ID = data.pk_id;
      this.delName = data.shopName;
      this.dialogVisible2 = true;
    },
    shopDel() {
      if (!this.tabId) {
        this.tabId = "1";
      }
      let OpenId = sessionStorage.getItem("OpenId");
      let id = this.del_ID;
      let delShop = axios.delShop(OpenId, id);
      delShop.then(res => {
        if (res.data.msg == "OK") {
          this.$message.success("删除成功");
          this.getData(this.tabId);
          this.dialogVisible2 = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 查询
    searchShop() {
      if (!this.tabId) {
        this.tabId = "1";
      }
      let OpenId = sessionStorage.getItem("OpenId");
      let id = sessionStorage.getItem("id");
      let zhanwei = "./static/img/ccic.png";
      let obj = {
        OpenId: OpenId,
        fkCcoicId: id,
        shopName: this.searchName,
        fkBusinessTypeId: this.tabId,
        fkLevelId: this.searchRank,
        typeName: "后台"
      };
      let shopSearch = axios.shopSearch(obj);
      shopSearch.then(res => {
        if (res.data.msg == "OK") {
          let shop = res.data.data;
          for (var i = 0; i < shop.length; i++) {
            if (!shop[i].shopIcon) {
              shop[i].shopIcon = zhanwei;
            }
          }
          this.shop = shop;
          this.dialogVisible3 = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 添加
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
    addData() {
      if (!this.tabId) {
        this.tabId = "1";
      }
      let OpenId = sessionStorage.getItem("OpenId");
      let pkId = sessionStorage.getItem("id");
      let obj = {
        OpenId: OpenId,
        tel: this.addTel,
        fkCcoicId: pkId,
        shopName: this.addName,
        shopSite: this.addSite,
        shopDescribe: this.addDescribe,
        shopURL: this.addURL,
        fkLevelId: this.addRank,
        shopIcon: this.addIcon,
        fkBusinessTypeId: this.addTypeId,
        tel: this.addTel
      };
      let addShop = axios.addShop(obj);
      addShop.then(res => {
        if (res.data.msg == "OK") {
          this.$message.success("添加成功");
          this.getData(this.tabId);
          this.addName = "";
          this.addSite = "";
          this.addDescribe = "";
          this.addURL = "";
          this.addRank = "";
          this.addTel = "";
          this.$refs.upLoad10.clearFiles();
          this.dialogVisible4 = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 升级
    level(data) {
      this.Rank = parseInt(data.fk_levelId);
      this.upId = data.pk_id;
      this.money = "";
      this.dialogVisible5 = true;
    },
    levelUp() {
      if (!this.tabId) {
        this.tabId = "1";
      }
      let OpenId = sessionStorage.getItem("OpenId");
      let pkId = sessionStorage.getItem("id");
      let obj = {
        fkCcoicId: pkId,
        OpenId: OpenId,
        fkBusinessId: this.upId,
        fkLevelId: this.Rank,
        cost: this.money
      };
      let upDate = axios.upDate(obj);
      upDate.then(res => {
        if (res.data.msg == "OK") {
          this.$message.success("升级成功");
          this.getData(this.tabId);
          this.dialogVisible5 = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 详情
    shopInfo(data) {
      let OpenId = sessionStorage.getItem("OpenId");
      let obj = {
        fkBusinessId: data.pk_id,
        ccoicId: data.fk_ccoicId,
        OpenId: OpenId
      };
      let showReview = axios.showReview(obj);
      showReview.then(res => {
        if (res.data.msg == "OK") {
          if (JSON.stringify(res.data.data) != "{}") {
            this.$router.push({
              path: "/main/shopReview",
              name: "shopReview",
              query: {
                ccoicId: data.fk_ccoicId,
                pkId: data.pk_id
              }
            });
          } else {
            this.$message.warning("该商家未提交修改");
          }
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    refresh() {
      if (!this.tabId) {
        this.tabId = "1";
      }
      this.getData(this.tabId);
    },
    handleClick(tab) {
      this.tabName = tab.label;
      this.tabId = tab.name;
      this.getData(tab.name);
    },
    go() {
      this.$router.push({
        path: "/shop_edit",
        name: "shop_edit",
        query: {
          introduction: this.shop_Info,
          id: this.c_Id
        }
      });
    }
  }
};
</script>

<style>
.el-card__body {
  padding: 0;
}
</style>

<style scoped>
.box-card {
  width: 96%;
  margin: 5px auto;
}
.img-box {
  width: 22px;
  height: 22px;
  margin-left: 5px;
  margin-right: 5px;
}
.img-box img {
  width: 100%;
  height: 100%;
}
.showText {
  height: calc(100vh - 128px);
  overflow-y: scroll;
}
dd {
  margin: 0px;
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
  overflow: hidden;
}
.del1 {
  float: left;
  text-align: right;
  margin-right: 5px;
  width: 45%;
  line-height: 20px;
}
.del2 {
  float: left;
  text-align: left;
  width: 52%;
  line-height: 20px;
}
.search {
  -webkit-appearance: none;
  background-color: #fff;
  border-radius: 4px;
  border: 0px;
  box-sizing: border-box;
  color: #606266;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  outline: 0;
  padding: 0 15px;
  width: 90%;
  text-align: left;
}
.shop-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.shop-vip {
  margin-right: 5px;
}
</style>
