<template>
  <div id="UserRank">
    <el-card class="box-card">
       <el-table
        :data="tableData"
        style="width: 100%"
        height="calc(100vh - 85px)">
        <el-table-column prop="gradeName" label="名称" min-width="107" align="center" fit="true" show-overflow-tooltip></el-table-column>
        <el-table-column prop="expense" label="费用" min-width="100" align="center" fit="true" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" min-width="100" align="center" fit="true">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="change(scope.row)">编辑</el-button>
            <el-button size="mini" type="text" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="width: 100%;">
        <el-button type="text" style="width: 100%; padding: 7px 0px;" @click="dialogVisible3 = true">添 加</el-button>
      </div>
    </el-card>
    <!-- 编辑弹窗 -->
    <el-dialog title="编辑" :visible.sync="dialogVisible1" width="90%" top="10vh">
      <dl class="text">
        <dd class="item1">名称:</dd>
        <dd class="item">
          <el-input v-model="c_name" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">费用:</dd>
        <dd class="item">
          <el-input v-model="c_pirce" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">是否默认:</dd>
        <dd class="item">
          <el-select v-model="c_value" placeholder="请选择" style="width: 100%;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">有效天数:</dd>
        <dd class="item">
          <el-input v-model="c_time" clearable></el-input>
        </dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="changeData">确 认</el-button>
      </span>
    </el-dialog>
    <!-- 删除弹窗 -->
    <el-dialog title="确认删除?" :visible.sync="dialogVisible2" width="90%" top="25vh">
      <dl style="margin-bottom: 10px;">
        <dd>名称:</dd>
        <dd>{{delName}}</dd>
      </dl>
      <dl style="margin-bottom: 10px;">
        <dd>费用:</dd>
        <dd>{{delPirce}}</dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="delData">删 除</el-button>
      </span>
    </el-dialog>
    <!-- 添加弹窗 -->
    <el-dialog title="添加" :visible.sync="dialogVisible3" width="90%" top="15vh">
      <dl class="text">
        <dd class="item1">名称:</dd>
        <dd class="item">
          <el-input v-model="name" clearable></el-input>
        </dd>
      </dl>
      <dl class="text">
        <dd class="item1">费用:</dd>
        <dd class="item">
          <el-input v-model="pirce" clearable></el-input>
        </dd>
      </dl>
      <!-- <dl class="text">
        <dd class="item1">是否默认:</dd>
        <dd class="item">
          <el-select v-model="value" placeholder="请选择" style="width: 100%;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </dd>
      </dl> -->
      <dl class="text">
        <dd class="item1">有效天数:</dd>
        <dd class="item">
          <el-input v-model="time" clearable></el-input>
        </dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="addData">确 认</el-button>
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
      options: [
      {
        value: true,
        label: '是'
      }, 
      {
        value: false,
        label: '否'
      }],
      // 添加
      dialogVisible3:false,
      value:false,
      name:"",
      pirce:"",
      time:"",
      // 编辑
      dialogVisible1:false,
      c_name:"",
      c_pirce:"",
      c_time:"",
      c_id:"",
      c_value:"",
      // 删除
      dialogVisible2:false,
      delName:"",
      delPirce:"",
      delGrade:""
    }
  },
  created(){
    this.getData();
  },
  methods:{
    getData(){
      let OpenId = sessionStorage.getItem('OpenId');
      let fkId = sessionStorage.getItem("id");
      let getGradeAll = axios.getGradeAll(OpenId,fkId);
      getGradeAll.then((res) => {
        if(res.data.msg == 'OK'){
          let data = res.data.data;
          for(let i=0;i<data.length;i++){
            if(!!data[i].expense){
              let price = parseFloat(data[i].expense);
              data[i].expense = price.toFixed(2);
            }else{
              let item = 0;
              data[i].expense = item.toFixed(2);
            }
          }
          this.tableData = data;
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    change(row){
      this.c_pirce = row.expense;
      this.c_name = row.gradeName;
      this.c_value = row.defaultGrade;
      this.c_time = row.timeBar;
      this.c_id = row.pkId;
      this.dialogVisible1 = true;
    },
    changeData(){
      let OpenId = sessionStorage.getItem('OpenId');
      let obj = {
        expense:this.c_pirce,
        gradeName:this.c_name,
        defaultGrade:this.c_value,
        timeBar:this.c_time,
        pkId:this.c_id,
        OpenId:OpenId
      };
      let changeGrade = axios.changeGrade(obj);
      changeGrade.then((res) => {
        if(res.data.msg == 'OK'){
          this.$message.success('编辑成功');
          this.dialogVisible1 = false;
          this.getData();
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    del(row){
      this.delPirce = row.expense;
      this.delName = row.gradeName;
      this.delGrade = row.pkId;
      this.dialogVisible2 = true;
    },
    delData(){
      let OpenId = sessionStorage.getItem('OpenId');
      let fkId = sessionStorage.getItem("id");
      let id = this.delGrade
      let delGrade = axios.delGrade(OpenId,fkId,id);
      delGrade.then((res) => {
        if(res.data.msg == 'OK'){
          this.$message.success('删除成功');
          this.dialogVisible2 = false;
          this.getData();
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    addData(){
      let OpenId = sessionStorage.getItem('OpenId');
      let fkId = sessionStorage.getItem("id");
      let obj = {
        expense:this.pirce,
        gradeName:this.name,
        // defaultGrade:this.value,
        timeBar:this.time,
        fkCcoicId:fkId,
        OpenId:OpenId
      };
      let addGrade = axios.addGrade(obj);
      addGrade.then((res) => {
        if(res.data.msg == 'OK'){
          this.$message.success('添加成功');
          this.time = "";
          this.name = "";
          this.pirce = "";
          // this.value = false;
          this.dialogVisible3 = false;
          this.getData();
        }else{
          this.$message.error(res.data.msg);
        }
      });
    }
  }
}
</script>

<style scoped>
.box-card {
  width: 96%;
  margin: 5px auto;
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
