<template>
<div class="login-wrap">
 
    <el-form :model="formData" label-position="top" label-width="100px" class="login-form ">
       <h2>用户登录</h2>
        <el-form-item label="用户名">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input type="password" v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-button" @click="handlelogin">提交</el-button>
      </el-form-item>
</el-form>
</div>
</template>

<script>
export default{
data(){
  return{
  formData:{
      username:'',
      password:''
  }
  }
},
methods:{
  handlelogin(){
    this.$http
    .post('login',this.formData)
    .then((res)=>{
     //判断状态码
     console.log(res);
     const data = res.data;
     const {meta:{status,msg}} = data;
     if(status===200){//登陆成功
    
     const token = data.data.token;
     this.$message.success(msg);
     sessionStorage.setItem('touken',token);
    //  this.$route.push({name:})

     }else{
     this.$message.error(msg);
     
     }
    })
  }
}
}
</script>

<style>
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap .login-form {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}
.login-wrap .login-form h2{
text-align: center;
}

.login-button {
  width: 100%;
}
</style>
