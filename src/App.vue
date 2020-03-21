<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #EEEEEE;
}
.el-message{
  min-width: 220px !important;
  width: 90% !important;
  padding: 10px 15px;
}
.ql-editor img{
  max-width: 100% !important;
}
</style>
