<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="../../assets/img/logo.png" style="height:60px;width:100" alt />
          </div>
        </el-col>
        <el-col :span="18" class="middle">
          <h3>电商后台管理系统</h3>
          <!-- <div class="grid-content bg-purple-light"></div> -->
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <a class="login_a" href  @click.prevent="logoff">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" style='width:200px'>
        <el-menu unique-opened >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-unfold"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="user" @click="to_user()">
                <i class="el-icon-right"></i>
                <span>用户列表</span>
            </el-menu-item> 
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-unfold"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-1">
                <i class="el-icon-right"></i>
                <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="2-2">
              <i class="el-icon-right"></i>
              <span>权限列表</span>
            </el-menu-item>  
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-unfold"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
                <i class="el-icon-right"></i>
                <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-right"></i>
              <span>分类参数</span>
            </el-menu-item>  
            <el-menu-item index="3-3">
              <i class="el-icon-right"></i>
              <span>商品分类</span>
            </el-menu-item>  
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-unfold"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
                <i class="el-icon-right"></i>
                <span>订单列表</span>
            </el-menu-item>
              
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-unfold"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
                <i class="el-icon-right"></i>
                <span>数据报表</span>
            </el-menu-item > 
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  beforeCreate(){
    let mytoken= localStorage.getItem('mytoken');
    if(!mytoken){
      this.$router.push({name:'login'})
    }
  },
  methods:{
    // :router='true'
    to_user(){
      // this.$router.push(
      //   {name:'user'},
      //   ()=>{},
      //   (e)=>{console.log('error==>',e);
      // })

      this.$router.push({name:'user'}).catch(err=>{
        console.log('error==>',err);
      })
    },
    logoff(){
      localStorage.clear()
      this.$message.success('已退出登录')
      this.$router.push({name:'login'})
    }
  },
  components: {}
};
</script>

<style scoped>
.container {
  height: 100%;
}

.main {
  height: 100%;
}

.middle {
  /* text-align: center; */
}

.login_a {
  line-height: 60px;
  text-decoration: none;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  /* line-height: 60px; */
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
