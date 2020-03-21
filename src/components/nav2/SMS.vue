<template>
  <div id="Payment">
    <el-card class="box-card">
      <el-table
        :data="tableData"
        style="width: 100%"
        height="calc(100vh - 112px)">
        <el-table-column
          prop="sendTel"
          label="手机号码"
          min-width="95"
          align="center"
          fit="true"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="发送时间"
          min-width="89"
          align="center"
          fit="true"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="time_size">{{scope.row.sendDate | data}} {{scope.row.sendDate | time}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="sendCode"
          label="状态"
          min-width="60"
          align="center"
          fit="true"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" min-width="63" align="center" fit="true">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="getData(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="sum">短信剩余：<span>{{costSum}}</span>条</div>
      <div style="width: 100%; display:flex;">
        <div style="width:50%; border-right: 1px solid #EAEDF4;">
          <el-button type="text" style="width: 100%; padding: 7px 0px;" @click="dialogVisible2 = true">查 询</el-button>
        </div>
        <div style="width:calc(50% - 1px)">
          <el-button @click="dialogVisible3 = true" type="text" style="width: 100%; padding: 7px 0px;">充 值</el-button>
        </div>
      </div>
    </el-card>
    <!-- 详情弹窗 -->
    <el-dialog title="详情" :visible.sync="dialogVisible1" width="90%" top="20vh">
      <dl class="text xqfl">
        <dd class="item1 xqfl1">手机号码:</dd>
        <dd class="item xqfl2">{{sendTel}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">发送时间:</dd>
        <dd class="item xqfl2">{{sendDate}}</dd>
      </dl>
      <dl class="text xqfl">
        <dd class="item1 xqfl1">状态:</dd>
        <dd class="item xqfl2">{{sendCode}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">发送信息:</dd>
        <dd class="item">{{sendMsg}}</dd>
      </dl>
    </el-dialog>
    <!-- 查询弹窗 -->
    <el-dialog title="查询" :visible.sync="dialogVisible2" fullscreen>
      <dl class="text">
        <dd class="item1">电话号码:</dd>
        <dd class="item">
          <el-input v-model="S_tel" clearable autocomplete="off"></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">发送状态:</dd>
        <dd class="item">
          <el-select v-model="S_type" placeholder="请选择" style="width: 100%;">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
            :editable="false">
          </el-date-picker>
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
            default-time="23:59:59">
          </el-date-picker>
        </dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="refresh()">清 空</el-button>
        <el-button type="primary" @click="searchData()">查 询</el-button>
      </span>
    </el-dialog>
    <!-- 充值弹窗 -->
    <el-dialog title="充值" :visible.sync="dialogVisible3" width="90%" top="25vh">
      <el-select value-key="pkid" @change="getPkid" v-model="value" placeholder="请选择" style="width: 100%;">
        <el-option
          v-for="item in options"
          :key="item.label"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <div class="sms-cash" :class="value==''?'hide':''">需支付{{money}}元</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="WXPay()">充 值</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as axios from "@/common/js/axiosServer.js";
export default {
  data(){
    return{
      tableData:[],
      options:[],
      costSum:0,
      // 详情
      dialogVisible1:false,
      sendCode:"",
      sendDate:"",
      sendMsg:"",
      sendTel:"",
      // 查询
      dialogVisible2:false,
      S_tel:"",
      S_type:"",
      S_stime:"",
      S_etime:"",
      typeList:[
        {
          value: true,
          label: '成功'
        }, {
          value: false,
          label: '失败'
        }
      ],
      // 充值
      value:"",
      options:[],
      dialogVisible3:false,
      money:""
    }
  },
  created(){
    this.getAllData();
    this.getSMS();
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
    getSMS(){
      let getSMSCost = axios.getSMSCost();
      this.options = [];
      getSMSCost.then((res) => {
        if(res.data.msg == 'OK'){
          let data = res.data.data;
          for(let i=0;i<data.length;i++){
            this.options.push({value:{money:parseFloat(data[i].payment),pkid:data[i].pkId},label:data[i].typeName})
          };
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    getAllData(tel,type,sdata,edata){
      let obj = {
        OpenId:sessionStorage.getItem('OpenId'),
        associationId:sessionStorage.getItem("id"),
        startDate:sdata,
        endDate:edata,
        sendTel:tel,
        sendCode:type
      };
      let getSMSData = axios.getSMSData(obj);
      getSMSData.then((res) => {
        if(res.data.msg == 'OK'){
          let data = res.data.data.sendRecord;
          for(let i=0;i<data.length;i++){
            data[i].sendDate = this.formatDate(new Date(data[i].sendDate));
            if(data[i].sendCode){
              data[i].sendCode = '成功';
            }else{
              data[i].sendCode = '失败';
            }
          };
          this.tableData = data;
          this.costSum = res.data.data.residue;
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    getData(row){
      this.sendCode = row.sendCode;
      this.sendDate = row.sendDate;
      this.sendMsg = row.sendMsg;
      this.sendTel = row.sendTel;
      this.dialogVisible1 = true;
    },
    searchData(){
      this.getAllData(this.S_tel,this.S_type,this.S_stime,this.S_etime);
      this.dialogVisible2 = false;
    },
    refresh(){
      this.S_tel = "";
      this.S_type = "";
      this.S_stime = "";
      this.S_etime = "";
      this.getAllData();
      this.dialogVisible2 = false;
    },
    getPkid(e){
      this.money = e.money.toFixed(2);
    },
    WXPay(){
      let value = parseFloat(this.value.money)*100;
      if(!!value){
        let obj = {
          OpenId:sessionStorage.getItem('OpenId'),
          ccoicId:'1',
          totalFee:value
        };
        let getWXPay = axios.getWXPay(obj);
        getWXPay.then(res => {
          if(res.data.msg == 'OK'){
            let wxObj = {
              appId: res.data.data.appId, //公众号名称，由商户传入
              timeStamp: res.data.data.timeStamp, //时间戳，自1970年以来的秒数
              nonceStr: res.data.data.nonceStr, //随机串
              package: res.data.data.package, //订单详情扩展字符串
              signType: res.data.data.signType, //微信签名方式
              paySign: res.data.data.paySign //微信签名
            };
            let that = this;
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest',
              wxObj,
              function(res){
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                  // 使用以上方式判断前端返回,微信团队郑重提示：
                  //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                  that.getSMSNum();
                }
                if (res.err_msg == "get_brand_wcpay_request:cancel") {
                  alert("已取消！")
                  return;
                }
                if (res.err_msg == "get_brand_wcpay_request:fail") {
                  alert("支付失败！")
                  return;
                }
              }
            );
          }else{
            this.$message.error(res.data.msg);
          }
        });
      }else{
        this.$message.error("请选择充值金额")
      }
    },
    getSMSNum(){
      let obj = {
        OpenId:sessionStorage.getItem('OpenId'),
        associationId:sessionStorage.getItem('id'),
        rechargeId:this.value.pkid
      };
      let getSMSNum = axios.getSMSNum(obj);
      getSMSNum.then((res) => {
        if(res.data.msg == 'OK'){
          this.value = {};
          this.dialogVisible3 = false;
          this.getAllData();
          this.$message.success('充值成功');
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    inputNone(){
      document.activeElement.blur();
    }
  }
}
</script>

<style scoped>
dd{
  margin: 0px;
}
.box-card {
  width: 96%;
  margin: 0px auto;
  margin-top: 5px;
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
  height: 19px;
  line-height: 19px;
  margin-bottom: 5px;
}
.sum{
  font-size: 13px;
  color: #94979C;
  font-weight: bold;
  padding: 5px 0px;
  border-bottom: 1px solid #EAEDF4;
}
.sum span{
  color: red;
}
.hide{
  display: none;
}
.sms-cash{
  margin-top: 5px;
  font-size: 0.9em;
  color: red;
}
</style>
