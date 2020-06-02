<template>
  <div class="login-wrap">
    <el-form 
    class="login-form"
    label-position="top" 
    label-width="80px" 
    :model="formdata">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <!-- <el-form-item label="活动形式">
        <el-input v-model="formdata.type"></el-input>
      </el-form-item> -->
      <el-button type="primary" class="login-button" @click.prevent="dologin">登录</el-button>
      
    </el-form>
  </div>
</template>
<!--
 /*
              {
                  data:
                    data:
                    meta:{
                        msg: "登录成功",status: 200
                        msg: "密码错误", status: 400
                        msg: "用户名不存在", status: 400}
                    }
              }
              */ 
--> 
<script>
export default {
  name: "",
  data() {
    return {
        
        formdata:{
            username:'',
            password:''
        }
    };
  },
  methods:{
      dologin(){
          this.$http.post('login',this.formdata)
          .then(
              (res)=>{
                const {meta} = res.data
                if(meta.status ===200){
                    this.$message({
                        message: '恭喜你，登录成功',
                        type: 'success'
                        });
                        this.$router.push({name:'home'})
                        //准备跳转到home
                }else{
                    this.$message.error(meta.msg);
                }   
              }
          ).catch((reason)=>{
              console.error('登录失败');
              console.log(reason);
          })
      }
  },
  components: {}
};
</script>

<style scoped>
    .login-wrap{
        height: 100%;
        background-color: #324152;
 
        /* 居中 */
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .login-wrap  .login-form{
        width: 400px;
        background-color: #ffffff;
        border-radius: 5px;
        padding: 30px;
    }
    .login-wrap  .login-button{
        width: 100%;
    }
</style>
