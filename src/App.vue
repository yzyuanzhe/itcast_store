<template>
  <div id="app">
 <!-- 最后呈现 -->
    <!-- <img src="./assets/logo.png"> -->
 <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
//   created() {
// this.$message.error('测试');
//   }
}
</script>

<style>
#app{
  height: 100%;
}
</style>
