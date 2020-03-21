<template>
  <div id="ShopSort">
    <el-card class="box-card">
       <el-table
        :data="tableData"
        style="width: 100%"
        height="calc(100vh - 55px)"> <!-- calc(100vh - 85px) -->
        <el-table-column prop="pk_id" label="排序编号" min-width="97" align="center" fit="true" show-overflow-tooltip></el-table-column>
        <el-table-column prop="typeName" label="名称" min-width="110" align="center" fit="true" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" min-width="100" align="center" fit="true">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="change(scope.row)">编辑</el-button>
            <!-- <el-button size="mini" type="text" @click="del(scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- <div style="width: 100%;">
        <el-button type="text" style="width: 100%; padding: 7px 0px;" @click="dialogVisible3 = true">添 加</el-button>
      </div> -->
    </el-card>
    <!-- 编辑弹窗 -->
    <el-dialog title="编辑" :visible.sync="dialogVisible1" width="90%" top="25vh">
      <dl class="text xqfl">
        <dd class="item1 xqfl1">排序编号:</dd>
        <dd class="item xqfl2">{{c_no}}</dd>
      </dl>
      <dl class="text">
        <dd class="item1">名称:</dd>
        <dd class="item">
          <el-input v-model="c_name" clearable></el-input>
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
        <dd>排序编号:</dd>
        <dd>{{delNo}}</dd>
      </dl>
      <dl style="margin-bottom: 10px;">
        <dd>名称:</dd>
        <dd>{{delName}}</dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="delData">删 除</el-button>
      </span>
    </el-dialog>
    <!-- 添加弹窗 -->
    <el-dialog title="添加" :visible.sync="dialogVisible3" width="90%" top="25vh">
      <dl class="text">
        <dd class="item1">名称:</dd>
        <dd class="item">
          <el-input v-model="name" clearable></el-input>
        </dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="addData">添 加</el-button>
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
      // 编辑
      dialogVisible1:false,
      c_no:"",
      c_name:"",
      // 删除
      dialogVisible2:false,
      delNo:"",
      delName:"",
      // 添加
      name:"",
      dialogVisible3:false,
    }
  },
  created(){
    this.getData();
  },
  methods:{
    getData(){
      let OpenId = sessionStorage.getItem('OpenId');
      let fkid = sessionStorage.getItem('id');
      let getShopSort = axios.getShopSort(OpenId,fkid);
      getShopSort.then((res) => {
        if(res.data.msg == 'OK'){
          this.tableData = res.data.data;
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    change(row){
      this.c_no = row.pk_id;
      this.c_name = row.typeName;
      this.dialogVisible1 = true;
    },
    changeData(){
      let OpenId = sessionStorage.getItem('OpenId');
      let obj = {
        OpenId:OpenId,
        typeName:this.c_name,
        typeId:this.c_no
      }
      let changeShopSort = axios.changeShopSort(obj);
      changeShopSort.then((res) => {
        if(res.data.msg == 'OK'){
          this.$message.success('修改成功');
          this.dialogVisible1 = false;
          this.getData();
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },
    del(row){
      this.delNo = row.pk_id;
      this.delName = row.typeName;
      this.dialogVisible2 = true;
    },
    delData(){
      let OpenId = sessionStorage.getItem('OpenId');
      let typeId = this.delNo;
      let delShopSort = axios.delShopSort(OpenId,typeId);
      delShopSort.then((res) => {
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
      let fkid = sessionStorage.getItem('id');
      let obj = {
        OpenId:OpenId,
        typeName:this.name,
        ccoicId:fkid
      }
      let addShopSort = axios.addShopSort(obj);
      addShopSort.then((res) => {
        if(res.data.msg == 'OK'){
          this.$message.success('添加成功');
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
  line-height: 19px;
}
</style>