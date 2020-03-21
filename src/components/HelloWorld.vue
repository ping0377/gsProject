<template>
  <div class="hello">
    <p>1</p>
  </div>
</template>

<script>
import * as axios from "@/common/js/axiosServer.js";
export default {
  name: 'HelloWorld',
  data () {
    return {
      
    }
  },
  created(){
    this.Test()
  },
  methods:{
    Test(){
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button{
  width: 100%;
  border-bottom: 1px solid #E3E6EC;
  border-radius: 0px;
  color: black;
}
.button:focus{
  border-bottom: 1px solid #429EFD;
  color: #429EFD;
}
</style>

<style>
.message .el-dialog__header{
  padding: 16px 20px 0px 20px !important;
}
.message .el-tabs__nav{
  width: 100% !important;
}
.message .el-tabs__item {
  width: 50% !important;
  text-align: center;
}
</style>

