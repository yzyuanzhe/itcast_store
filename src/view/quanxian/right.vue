<template>
    <el-card class="box-card">
       <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>权限列表</el-breadcrumb-item>  
    </el-breadcrumb>

<!-- 表格部分 -->
<template>
  <el-table
 class="biao"
    :data="list"
    border
    style="width: 100%">
      <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="authName"
      label="权限名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径"
      width="180">
    </el-table-column>
    <el-table-column
      prop="level"
      label="层级">
    </el-table-column>
  </el-table>
</template>

    </el-card>
</template>

<script>
    export default{
data (){
    return{
         list:[]
    }
   
},
  created () {
     this.loadData();
      },
methods:{
    async loadData(){
       const token = sessionStorage.getItem('token');
        // 在请求头中设置token
       this.$http.defaults.headers.common['Authorization'] = token;
        const res = await this.$http.get('rights/list');
        console.log(res);
       const data =res.data;
        this.list=data.data;
     

    }
  }
    }
</script>

<style>
.box-card{
    height: 100%;
}
.biao{
    margin-top: 20px;
}
</style>
