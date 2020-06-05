<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- <el-row >
      <el-col >
        <el-input  placeholder="请输入名字" v-model="query" style="width:300px">
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="primary" >添加用户</el-button>
      </el-col>
    </el-row>-->

    <el-form :inline="true" class="search-form-inline">
      <el-form-item>
        <el-input placeholder="请输入名字" v-model="query">
          <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changevis()">添加用户</el-button>
      </el-form-item>
    </el-form>

    <el-table class="table-users" :data="usersList" style="width: 100%">
      <el-table-column label="#" type="index" width="60"></el-table-column>
      <el-table-column prop="username" label="姓名" width="100"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="create_time" label="创建日期">
        <template v-slot="scope">
          <span>{{scope.row.create_time | time_filter}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="mg_state" label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="switchq(scope.row.id,scope.row.mg_state)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            :plain="true"
            size="small"
            icon="el-icon-edit"
            @click="eidtUser(scope.row.id,scope.row.username,scope.row.email,scope.row.mobile,)"
          ></el-button>
          <el-button
            type="primary"
            :plain="true"
            size="small"
            icon="el-icon-delete"
            @click="deleteUser(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--  -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- dialog -->
    <el-dialog
      :center="true"
      class="dl-dialog-userinfo"
      :before-close="handleClose"
      title="添加用户信息"
      :visible="dialogformvisible"
    >
      <el-form :model="user_info">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="user_info.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="user_info.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="user_info.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="user_info.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogformvisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- dialog  edit user-->
    <el-dialog
      :center="true"
      class="dl-dialog-userinfo"
      :before-close="handleClose_edit"
      title="编辑用户信息"
      :visible="dialogformvisible_edit"
    >
      <el-form :model="current_edituser_info">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input :value="current_edituser_username" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="current_edituser_info.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="current_edituser_info.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogformvisible_edit = false">取 消</el-button>
        <el-button type="primary" @click="saveUser()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      current_edituser_id: 0,
      current_edituser_username: "",
      current_edituser_info: {
        mobile: "",
        email: ""
      },
      user_info: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      formLabelWidth: "60px",
      dialogformvisible: false,
      dialogformvisible_edit: false,
      query: "",

      pagesize: 4,
      pagenum: 1,
      total: 0,

      usersList: []
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    eidtUser(id, username, email, mobile) {
      //   console.log(id,username,email,mobile);
      this.current_edituser_id = id;
      this.current_edituser_username = username;
      this.current_edituser_info.email = email;
      this.current_edituser_info.mobile = mobile;
      this.dialogformvisible_edit = true;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.pagenum = 1;
      this.getUsers();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getUsers();
    },
    async saveUser() {
      this.current_edituser_info.email = this.current_edituser_info.email.trim();
      this.current_edituser_info.mobile = this.current_edituser_info.mobile.trim();
      let allValid =
        this.current_edituser_info.email && this.current_edituser_info.mobile;
      if (!allValid) {
        alert("请完善信息");
        return;
      }
      this.dialogformvisible_edit = false;

      let tk = localStorage.getItem("mytoken");
      this.$http.defaults.headers.common[`Authorization`] = tk;
      let ret = await this.$http.put(
        `users/${this.current_edituser_id}`,
        this.current_edituser_info
      );
      console.log(ret);
      let {
        meta: { msg, status }
      } = ret.data;

      //  console.log(status);
      if (status == 200) {
        this.$message.success(msg);
        this.getUsers();
      }
    },
    async addUser() {
      this.user_info.username = this.user_info.username.trim();
      this.user_info.password = this.user_info.password.trim();
      this.user_info.email = this.user_info.email.trim();
      this.user_info.mobile = this.user_info.mobile.trim();
      let allValid = this.user_info.username && this.user_info.password;
      allValid = allValid && this.user_info.email;
      allValid = allValid && this.user_info.mobile;
      if (!allValid) {
        alert("请完善信息");
        return;
      }
      this.dialogformvisible = false;

      let tk = localStorage.getItem("mytoken");
      this.$http.defaults.headers.common[`Authorization`] = tk;
      let ret = await this.$http.post(`users`, this.user_info);
      console.log(ret);
      let {
        meta: { msg, status }
      } = ret.data;

      //  console.log(status);
      if (status == 201) {
        this.getUsers();
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done((this.dialogformvisible = false));
        })
        .catch(_ => {});
    },
    handleClose_edit(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done((this.dialogformvisible_edit = false));
        })
        .catch(_ => {});
    },
    changevis() {
      this.dialogformvisible = true;
    },
    async deleteUser(id) {
      //
      console.log(id);
      let tk = localStorage.getItem("mytoken");
      this.$http.defaults.headers.common[`Authorization`] = tk;
      let ret = await this.$http.delete(`users/${id}`);
      console.log(ret);
      let {
        meta: { msg, status }
      } = ret.data;

      //  console.log(status);
      if (status == 200) {
        this.getUsers();
      }
    },
    async switchq(id, state) {
      console.log(id, state);
      let tk = localStorage.getItem("mytoken");
      this.$http.defaults.headers.common[`Authorization`] = tk;
      //users/:uId/state/:type
      try {
        let ret = await this.$http.put(`users/${id}/state/${state}`);
        console.log(ret.data);

        let {
          meta: { msg, status }
        } = ret.data;

        //  console.log(status);
        if (status == 200) {
          this.$message.success("修改成功");
        } else this.$message.error("修改失败");
      } catch (e) {
        console.log(e);
      }
    },
    searchUser() {
      this.pagenum = 1;
      this.getUsers();
    },
    async getUsers() {
      let tk = localStorage.getItem("mytoken");
      this.$http.defaults.headers.common[`Authorization`] = tk;
      //  query=''  不行,
      //  query=${this.query} 可以
      //  query=&直接下一个参数, =后面不跟 ,可以,
      let ret = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
        console.log(ret);
      let {
        data: { total, pagenum, users },
        meta: { msg, status }
      } = ret.data;
      this.total = total;
      this.pagenum = pagenum;

      //  console.log(status);

      if (status == 200) {
        this.usersList = users;
        console.log(this.usersList);
      }
    }
  },
  components: {}
};
</script>

<style scoped>
.box-card {
  height: 100%;
  width: 100%;
}
/* 逗号分隔多个选择器 */
.table-users,
.search-form-inline {
  line-height: 40px;
  padding-top: 10px;
}
.dialog-footer,
.dl-dialog-userinfo {
  line-height: 60px;
}
</style>
