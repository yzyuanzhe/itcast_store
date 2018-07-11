<template>
 <el-card class="box-card">
     <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>活动管理</el-breadcrumb-item>
    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
</el-breadcrumb>
    <!-- 搜索框 -->
    <div class="sousuo">
        <el-row>
            <el-col :span="24">
            <el-input placeholder="请输入内容" v-model="add" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="handlesousuo"></el-button>
            </el-input>
        <el-button type="success" @click="handleaddopen" plain>添加用户</el-button> 
        
        
         <!-- 弹出添加表单 -->
        <el-button type="text" @click="dialogFormVisible = true"></el-button>
                <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
                <el-form :model="form" :rules="ruleform" ref="addform">
                    <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
                    <el-input  v-model="form.username" auto-complete="off"></el-input>
                    </el-form-item>
                       <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
                    <el-input  type="password" v-model="form.password" auto-complete="off"></el-input>
                    </el-form-item>
                       <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input type="email" v-model="form.email" auto-complete="off"></el-input>
                    </el-form-item>
                       <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input v-model="form.mobile" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleadd">确 定</el-button>
                </div>
                </el-dialog>
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
            <el-button plain size="mini" type="primary" icon="el-icon-edit" @click="esitusers(scope.row)"></el-button>
               
                <!-- 弹出修改表单 -->
        <el-dialog title="用户修改" :visible.sync="editdialogFormVisible">
          <el-form :model="form">
                    <el-form-item  label="用户名" :label-width="formLabelWidth">
                    <el-input disabled v-model="form.username" auto-complete="off"></el-input>
                    </el-form-item>
                       <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input type="email" v-model="form.email" auto-complete="off"></el-input>
                    </el-form-item>
                       <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input v-model="form.mobile" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editdialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleedit">确 定</el-button>
            </div>
        </el-dialog>

            <el-button plain size="mini" type="danger" icon="el-icon-delete" @click="handledelete(scope.row.id)">
            </el-button>
            <el-button plain size="mini" type="success" icon="el-icon-check" ></el-button>
            </template>
        </el-table-column>
  </el-table>

  <!-- 分页 -->
  <!-- @size-change 每页多少条数据发生改变 触发的事件 -->
  <!-- @current-change 当前页码改变发生 -->
  <!-- current-page 当前页码 -->
  <!-- page-sizes 每页多少条数据的下拉框 -->
  <!-- page-size 每页显示多少条数据 -->

  <!-- total  总条数 -->
  <!-- layout 分页所支持的功能 -->
  <div class="block">
    <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pagenum"
    :page-sizes="[2, 4, 6, 8]"
    :page-size="pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
  </div>
    

 </el-card>
</template>
<script>
   export default {
      data() {
        return {
          list:[ ],
          pagenum:'1',
          pagesize:'6',
          total:'5',
          add:'',
        dialogFormVisible: false,
        editdialogFormVisible: false,
        formLabelWidth: '120px',
        form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
        },
        ruleform: {
            username: [
                { required: true, message: '请输用户名', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' },
            ],
                email: [
                { required: true, type:"email" , message: '请输入邮箱', trigger: 'blur' },
          
            ],

            
        },


        }
      },
      created () {
          this.loadData();
      },
      methods:{
        //   页面加载功能
        async loadData (){
             // 发送请求之前，获取token
             loading: true;
            const token = sessionStorage.getItem('token');
            // 在请求头中设置token
            this.$http.defaults.headers.common['Authorization'] = token;
                const res = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.add}`);
                const data =res.data;
                const {meta:{status,msg}} = data;
                if(status===200){ 
                    loading: false;
                    const { data: { users, total } } = data;
                    this.list = users;
                    this.total=total;
                  
                }
        },
        //删除功能
        async handledelete(id){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(async() => {
                const res =await this.$http.delete(`users/${id}`);
                const data=res.data;
                const {meta:{status,msg}}=data;
                if(status===200){
                    this.loadData()
                    this.$message({
                type: 'success',
                message: msg
            });
            
                }
            
            }).catch(() => {
            this.$message({
                type: 'info',
                message: msg
            });          
            });
      
        },

         handleSizeChange(val) {
        this.pagesize=val;
        this.loadData();
        },
        handleCurrentChange(val) {
         this.pagenum=val; 
         this.loadData();
         
        },
        handlesousuo(){
            this.loadData();
        },
        handleaddopen(){
             this.dialogFormVisible = true;
        },
        async handleadd (){
          this.$refs.addform.validate(async(valid) => {
          if (valid) {
           const res = await this.$http.post('users', this.form);
        //  console.log(data)
         const data = res.data;
         const {meta:{status,msg}}=data;
         if(status===201){
             this.$message.success(msg);
             this.dialogFormVisible = false;
             for(let key in this.form){
                 this.form[key]='';
             }
             this.loadData();

         }else{
             this.$message.error(msg);
         }

          } else {
            console.log('请完整输入内容');
            return false;
          }
        })
      
        },
        esitusers(user){
            // console.log(user)
            this.editdialogFormVisible =true;
            this.form.username = user.username;
            this.form.email = user.email;
            this.form.mobile = user.mobile;
            this.form.id = user.id;
        },
        async handleedit(id){
            const res = await this.$http.put(`users/${this.form.id}`,{email:this.form.email,mobile:this.form.mobile});
            const data = res.data;
            const {meta:{status,msg}}=data;
            if(status===200){
                for(let key in this.form){
                    this.form[key]='';
                }
                this.editdialogFormVisible = false;
                this.loadData();
                this.$message.success(msg);
            }
            
        },
      
      
      
        

    },

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
.block{
    margin-top: 10px;
}
</style>
