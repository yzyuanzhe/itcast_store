<template>
    <el-container class="container"> 
        <!-- 头部 -->
  <el-header class="header">
     
      <el-row>
        <el-col :span="3"><div class="grid-content bg-purple"></div><img src="../../static/logo.png" alt=""></el-col>
        <el-col :span="20"><div class="grid-content bg-purple-light"><h2 class="hh2">电商后台管理系统</h2></div></el-col>
        <el-col :span="1"><div class="grid-content bg-purple"><a href="#" class="aa" @click.prevent="handleout">退出</a></div></el-col>
     </el-row>
  </el-header>
  <el-container>
      <!-- 左侧导航部分 -->
    <el-aside width="200px" class="leftaside">
        <el-row class="tac">
            <el-menu default-active="1-1" class="mmenu" :router="true">

            <el-submenu index="1">
                <template slot="title">  <!--一级分类 -->
                <i class="el-icon-location"></i><span>用户管理</span>
                </template>
                <el-menu-item-group><!--二级分类 -->
                <el-menu-item index="/user"> <i class="el-icon-star-off"></i>用户选项1</el-menu-item>
                <el-menu-item index="1-2"> <i class="el-icon-star-off"></i>用户选项1</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
                <template slot="title">  <!--一级分类 -->
                <i class="el-icon-location"></i><span>权限管理</span>
                </template>
                <el-menu-item-group><!--二级分类 -->
                <el-menu-item index="2-1"> <i class="el-icon-star-off"></i>用户选项1</el-menu-item>
                <el-menu-item index="2-2"> <i class="el-icon-star-off"></i>用户选项1</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3">
                <template slot="title">  <!--一级分类 -->
                <i class="el-icon-location"></i><span>商品管理</span>
                </template>
                <el-menu-item-group><!--二级分类 -->
                <el-menu-item index="3-1"> <i class="el-icon-star-off"></i>用户选项1</el-menu-item>
                <el-menu-item index="3-2"> <i class="el-icon-star-off"></i>用户选项1</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="4">
                <template slot="title">  <!--一级分类 -->
                <i class="el-icon-location"></i><span>订单管理</span>
                </template>
                <el-menu-item-group><!--二级分类 -->
                <el-menu-item index="4-1"> <i class="el-icon-star-off"></i>用户选项1</el-menu-item>
                <el-menu-item index="4-2"> <i class="el-icon-star-off"></i>用户选项1</el-menu-item>
                </el-menu-item-group>
            </el-submenu>


            <el-submenu index="5">
                <template slot="title">  <!--一级分类 -->
                <i class="el-icon-location"></i><span>数据管理</span>
                </template>
                <el-menu-item-group><!--二级分类 -->
                <el-menu-item index="5-1"> <i class="el-icon-star-off"></i>用户选项1</el-menu-item>
                <el-menu-item index="5-2"> <i class="el-icon-star-off"></i>用户选项1</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            </el-menu>

        </el-row>
    </el-aside>
    <!-- 右侧内容部分 -->
   <el-main class="main">
  <router-view></router-view>
   </el-main>
  </el-container>
</el-container>
</template>

<script>
    export default{
  // 在组件一开始的时候就判断是否有session,不用等页面组件加载完成
    beforeCreate() {
     const token=sessionStorage.getItem('token');
     if(!token){
         this.$router.push({name:'login'});
         this.$message.warning('请先登录');
     } 
    },
    methods:{
      handleout(){
          sessionStorage.clear();
        this.$router.push({name:'login'});
        this.$message.success('退出成功');
      }
    }
    }
</script>

<style>
.container{
    height: 100%;
}
.header{
    background-color: #B3C0D1;   
    padding: 0;

}
.aside{
     background-color: #D3DCE6;
}
.main{
    background-color: #E9EEF3;
}
.hh2{
    color: #fff;
    text-align: center;
    margin: 0;
    line-height: 60px;
}
.aa{
    line-height: 60px;
}
.leftaside{
    height: 100%;
}
.mmenu{
    height: 100%;
}

</style>
