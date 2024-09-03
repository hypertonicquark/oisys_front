<template>
  <div>
    <div class="container">
      <div class="progress">
        <div class="progress-bar">
          <div class="progress-shadow"></div>
        </div>
      </div>
    </div>

    <div class="main">
      <div class="container-fluid">
        <div class="row">
          <left-menu :roleId="loginUser.roleId"></left-menu>

          <!--顶层右侧的导航栏，栅格系统分10份-->
          <div class="col-md-10 moredeep" style="padding: 0; margin: 0">
            <!-- 导航栏 -->
            <div class="col-md-12 blue">
              <ul class="nav navbar-nav navbar-right moredeep">
                <li class="dropdown">
                  <!--设置导航栏头像面板-->
                  <a href="#" class="white blue-none" data-toggle="dropdown">
                    <img src="/images/oasys.jpg" class="user-image" />
                    <span>欢迎您，{{ loginUser.realName }}</span>
                  </a>
                  <!--设置点击按钮弹出用户面板层-->
                  <ul class="dropdown-menu" style="padding: 0">
                    <li class="user-header blue">
                      <img :src="`http://127.0.0.1:8086/face/${loginUser.imgPath}`" class="img-circle"
                        style="width: 100px; height: 100px" />
                      <p class="white" style="">
                        <span>{{ loginUser.className }} </span><br />
                        <small>{{ getRoleName(loginUser.roleId) }}</small>
                      </p>
                    </li>
                    <li class="user-footer">
                      <div class="pull-left">
                        <a href="javascript:changepath('userpanel');" class="btn btn-default">用户面板</a>
                      </div>
                      <div class="pull-right">
                        <a href="#" class="btn btn-danger" @click.prevent="logout">退出登录</a>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div class="col-md-12 list-right" style="
                background: rgb(236, 240, 245);
                position: relative;
                height: 850px;
                padding: 0px;
              ">
              <router-view></router-view>

              <div class="col-md-12" id="ss" style="
                  background: white;
                  padding: 15px;
                  position: absolute;
                  bottom: 0;
                  height: 50px;
                ">
                <div class="pull-right currt-time" style="display: inline-block; margin-right: 20px">
                  2023年8月14日,星期一
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftMenu from "./components/LeftMenu.vue";
export default {
  name: "App",
  components: {
    LeftMenu,
  },
  data () {
    return { loginUser: JSON.parse(sessionStorage.getItem("user")) };
  },
  created () {
    if (this.loginUser == null) {
      self.location.href = "/login.html";
    }
  },
  methods: {
    getRoleName (roleId) {
      let roleName = "";
      switch (roleId) {
        case 1:
          roleName = "超级管理员";
          break;
        case 2:
          roleName = "老师";
          break;
        case 3:
          roleName = "主任";
          break;
        case 4:
          roleName = "学生";
          break;
      }
      return roleName;
    },
    logout () {
      this.axios.get("/logout").then((response) => {
        sessionStorage.clear();
        alert(response.data.msg);
        self.location.href = "/login.html";
      })
    },
  },
};
</script>
<style scoped>
.container-fluid {
  padding-right: 0px;
  padding-left: 0px;
  margin-right: 0px;
  margin-left: 0px;
}
</style>