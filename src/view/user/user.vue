<template>
 <el-card class="box-card">
     <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>活动管理</el-breadcrumb-item>
    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    <el-breadcrumb-item>活动详情</el-breadcrumb-item>

    <!-- 搜索框 -->
    <div class="sousuo">
        <el-row>
            <el-col :span="24">
            <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        <el-button type="success" plain>成功按钮</el-button>
        </el-col>
        </el-row>
    </div>

    <!-- 表格 -->
    <el-table
      v-loading="loading"
      stripe
      border
      :data="list"
      style="width: 100%">
      <el-table-column
        type="index"
        width="70">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="290">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="260">
      </el-table-column>
         <el-table-column
        label="创建时间"
        width="300">
        <template slot-scope="scope">
            {{scope.row.create_time|fmtDate('YYYY-MM-DD')}}
        </template>
      </el-table-column>
       <el-table-column
      label="用户状态"
      width="120">
      <template slot-scope="scope">
           <el-switch
        v-model="scope.row.mg_state"
        active-color="#13ce66"
        inactive-color="#ff4949">
        </el-switch>
      </template>
     
    </el-table-column>
       <el-table-column label="操作">
         <template slot-scope="scope">
          <el-button plain size="mini" type="primary" icon="el-icon-edit" ></el-button>
          <el-button plain size="mini" type="danger" icon="el-icon-delete" ></el-button>
          <el-button plain size="mini" type="success" icon="el-icon-check" ></el-button>
        </template>
    </el-table-column>
  </el-table>
    
</el-breadcrumb>
 </el-card>
</template>
<script>
   export default {
      data() {
        return {
          list:[ ]
        }
      },
      created () {
          this.loadData()
      },
      methods:{
        async loadData (){
             // 发送请求之前，获取token
      const token = sessionStorage.getItem('token');
      // 在请求头中设置token
      this.$http.defaults.headers.common['Authorization'] = token;
        const res = await this.$http.get('users?pagenum=1&pagesize=10');
        const data =res.data;
        const {meta:{status,msg}} = data;
        if(status===200){
            this.list=data.data.users;
        }
        }
      }
    }
</script>
<style>
.box-card{
    height: 100%;
}
.sousuo{
    margin-top: 40px;
}
.sousuo .input-with-select{
    width: 300px;
}
</style>
