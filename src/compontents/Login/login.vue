<template>
       <div align="center" id="div1">
         <el-form  status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
           <el-form-item label="用户名" style="width: 400px" >
             <el-input type="text" v-model="user" ></el-input>
           </el-form-item>


           <el-form-item label="密码"  style="width: 400px" >


             <el-input type="text"  v-model="pwd"></el-input>


           </el-form-item>

           <el-form-item>
             <el-button style="width: 140px" @click="login">提交</el-button>
             <el-button style="width: 140px">重置</el-button>
           </el-form-item>
         </el-form>
       </div>
</template>

<script>
    export default {
        name: "login",
        data(){
          return{
            user:"",
            pwd:"",
          }
        },
      methods:{
           login(){
               var params=new URLSearchParams()
                   params.append("loginId",this.user);
                   params.append("password",this.pwd);
               this.$axios.post("uers/queryByLoginIdandPassword",params).then((response)=>{
                   if(response.data){
                      this.$router.push("/App");
                     this.$message({
                       showClose: true,
                       message: '登录成功',
                       type: 'success'
                     });
                   }else{
                      this.$router.push("/Login");
                     this.$message({
                       showClose: true,
                       message: '登录失败',
                       type: 'error'
                     });
                   }
               }).catch()
           }
      }
    }
</script>

<style>

 #div1{
     margin-top: 200px;
 }


</style>
