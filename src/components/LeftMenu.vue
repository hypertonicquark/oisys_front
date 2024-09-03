<template>
  <div>
    <div class="col-lg-2 col-md-2 smallDiv" style="padding: 0; margin: 0; display: block">
      <div class="col-md-12 blue-b">
        <a href="index" class="navbar-brand" style="padding: 8px 10px">
          <img src="/images/logo.png" />
        </a>
      </div>
      <div class="col-md-12 list-left" style="background: rgb(34, 45, 50); height: 850px">
        <div class="thistable">
          <div style="position: relative; margin-top: 20px">
            <input type="text" placeholder="查找..." class="search-input cha" />
            <span style="
                display: inline-block;
                height: 35px;
                width: 38px;
                background: red;
                position: absolute;
                text-align: center;
                line-height: 35px;
                border-bottom-right-radius: 2px;
                border-top-right-radius: 2px;
                background: #374850;
              ">
              <a href="#" class="chazhao"><span class="glyphicon glyphicon-search" style="color: white"></span></a>
            </span>
          </div>
          <div class="panel-group" id="accordion" style="margin-top: 10px; margin-left: -12px">
            <div class="panel panel-default">
              <div class="panel-heading" v-if="roleId == 1">
                <a class="open-menu blue-left collapsed" href="#collapse92" data-toggle="collapse"
                  data-parent="#accordion" aria-expanded="false" style="border-left: 3px solid transparent">
                  <span class="glyphicon glyphicon glyphicon-calendar"></span>
                  <span>课程教学管理</span>
                  <span class="glyphicon pull-right glyphicon-menu-left"></span>
                </a>
              </div>
              <div id="collapse92" class="panel-collapse collapse" aria-expanded="false" style="height: 0px">
                <ul>
                  <li v-if="roleId == 1">
                    <router-link to="/course/list/1">
                      <span class="glyphicon glyphicon-record"></span>
                      <span>课程设置</span>
                    </router-link>
                  </li>

                  <li v-if="roleId == 1 || roleId == 2">
                    <router-link to="/courseManage/list/1">
                      <span class="glyphicon glyphicon-record"></span>
                      <span>教学管理</span>
                    </router-link>
                  </li>
                </ul>
              </div>
              <div class="panel-heading">
                <a class="open-menu blue-left collapsed" href="#collapse4" data-toggle="collapse"
                  data-parent="#accordion" style="border-left: 3px solid transparent" aria-expanded="false"
                  v-if="roleId == 1 || roleId == 2">
                  <span class="glyphicon glyphicon-time"></span>
                  <span>考勤管理</span>
                  <span class="glyphicon pull-right glyphicon-menu-left"></span>
                </a>
              </div>
              <div id="collapse4" class="panel-collapse collapse" aria-expanded="false" style="height: 0px"
                v-if="roleId == 1 || roleId == 2">
                <ul>
                  <li v-if="roleId == 1">
                    <a href="/index.html">
                      <span class="glyphicon glyphicon-record"></span>
                      <span>考勤规则设置</span>
                    </a>
                  </li>
                  <li v-if="roleId == 2">
                    <router-link :to="`/attendance/monthList/${new Date().getFullYear()}/${new Date().getMonth() + 1
                }/1`">
                      <span class="glyphicon glyphicon-record"></span>
                      <span>查询统计</span>
                    </router-link>
                  </li>
                </ul>
              </div>
              <div class="panel-heading" v-if="roleId == 1">
                <a class="open-menu blue-left" href="#collapse1" data-toggle="collapse" data-parent="#accordion"
                  aria-expanded="true" style="border-left: 3px solid rgb(0, 166, 90)">
                  <span class="glyphicon glyphicon-cog"></span>
                  <span>系统管理</span>
                  <span class="glyphicon pull-right glyphicon-menu-down"></span>
                </a>
              </div>
              <div v-if="roleId == 1" id="collapse1" class="panel-collapse collapse in" aria-expanded="true" style="">
                <ul>
                  <li>
                    <a href="/index.html">
                      <span class="glyphicon glyphicon-record"></span>
                      <span>用户管理</span>
                    </a>
                  </li>

                  <li>
                    <a href="/index.html">
                      <span class="glyphicon glyphicon-record"></span>
                      <span>角色管理</span>
                    </a>
                  </li>

                  <li>
                    <a href="/index.html">
                      <span class="glyphicon glyphicon-record"></span>
                      <span>菜单管理</span>
                    </a>
                  </li>

                  <li>
                    <router-link to="/student/list/1">
                      <span class="glyphicon glyphicon-record"></span>
                      <span>学生基本信息管理</span>
                    </router-link>
                  </li>

                  <li>
                    <a href="/class/list/1">
                      <span class="glyphicon glyphicon-record"></span>
                      <span>班级信息管理</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["roleId"],
};
</script>