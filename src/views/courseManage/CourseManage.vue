<template>
  <div>
    <div class="row" style="padding-top: 10px">
      <div class="col-md-2">
        <h1 style="font-size: 24px; margin: 0" class="">课程教学管理</h1>
      </div>
      <div class="col-md-10 text-right">
        <a><span class="glyphicon glyphicon-home"></span> 首页</a>
        &gt;
        <a href="">课程教学管理</a>
      </div>
    </div>

    <div id="courseManage" class="row" style="padding-top: 15px">
      <div class="col-md-12">
        <!--id="container"-->
        <div class="bgc-w box box-primary">
          <!--盒子头-->
          <div class="box-header">
            <h3 class="box-title">
              <router-link to="/courseManage/edit" class="label label-success" style="padding: 5px">
                <span class="glyphicon glyphicon-plus"></span>
                新增
              </router-link>
              <a href="" class="label label-success" style="padding: 5px; margin-left: 5px">
                <span class="glyphicon glyphicon-refresh"></span> 刷新
              </a>
            </h3>
            <div class="box-tools">
              <div class="input-group" style="width: 150px">
                <input type="text" class="form-control input-sm search" id="search" placeholder="请输入课程名" />
                <div class="input-group-btn">
                  <a class="btn btn-sm btn-default" style="padding: 5px">
                    <span class="glyphicon glyphicon-search usersearchgo"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <!--盒子身体-->
          <div class="box-body no-padding thistable">
            <div class="box-body no-padding">
              <div class="table-responsive">
                <table class="table table-hover table-striped">
                  <tbody>
                    <tr>
                      <th scope="col">教学安排编号</th>
                      <th scope="col">课程名称</th>
                      <th scope="col">授课老师</th>
                      <th scope="col">班级</th>
                      <th scope="col">上课时间</th>
                      <th scope="col">地点</th>
                      <th scope="col">操作</th>
                    </tr>

                    <tr v-if="courseManageList.length == 0">
                      <td style="color:red">"对不起，查询不到记录！"</td>
                    </tr>
                    <tr v-else v-for="cm in courseManageList" :key="cm.id">
                      <td>
                        <span>{{ cm.courseNo }}</span>
                      </td>
                      <td>
                        <span>{{ cm.courseName }}</span>
                      </td>
                      <td>
                        <span>{{ cm.teacherName }}</span>
                      </td>
                      <td>
                        <span>{{ cm.className }}</span>
                      </td>
                      <td>
                        <span v-for="acsl in cm.attendClassSettingList" :key="acsl.id">
                          {{ acsl.attendClassWeek }} {{ acsl.startTime }}-{{ acsl.endTime }}
                          <br>
                        </span>
                      </td>
                      <td>
                        <span v-for="acsl in cm.attendClassSettingList" :key="acsl.id">
                          {{ acsl.address }}
                          <br>
                        </span>
                      </td>
                      <td>
                        <router-link to="/courseManage/edit/1" class="label xiugai">
                          <span class="glyphicon glyphicon-edit"></span>
                          查看详情
                        </router-link>
                        <router-link to="/courseManage/edit/1" class="label xiugai">
                          <span class="glyphicon glyphicon-edit"></span> 修改
                        </router-link>
                        <a class="label shanchu">
                          <span class="glyphicon glyphicon-remove"></span> 删除
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <footer-paging :pageInfo="pageInfo"></footer-paging>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FooterPaging from "../../components/FooterPaging.vue";

export default {
  components: {
    FooterPaging,
  },
  data () {
    return {
      courseManageList: [],
      pageInfo: {}, //分页信息
      keywords: "",
    };
  },
  props: ["pageNum"],
  created () {
    this.keywords = this.$route.params.keywords;
    this.getCourseManageList();
  },
  watch: {
    $route () {
      this.getCourseManageList();
    }
  },
  methods: {
    getCourseManageList () {
      this.axios
        .get("courseManage/list", {
          params: { page: this.pageNum, searchName: this.keywords },
        })
        .then((response) => {
          this.courseManageList = response.data.courseManageList.list;
          this.pageInfo = {
            pages: response.data.courseManageList.pages,
            pageNum: response.data.courseManageList.pageNum,
            total: response.data.courseManageList.total,
            pageSize: response.data.courseManageList.pageSize,
            isFirstPage: response.data.courseManageList.isFirstPage,
            isLastPage: response.data.courseManageList.isLastPage,
            hasPreviousPage: response.data.courseManageList.hasPreviousPage,
            hasNextPage: response.data.courseManageList.hasNextPage,
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#thismodal .modal-dialog {
  width: 500px;
  top: 20%;
}

#thismodal .modal-body .icon {
  height: 80px;
  width: 80px;
  margin: 20px auto;
  border-radius: 50%;
  color: #aad6aa;
  border: 3px solid #d9ead9;
  text-align: center;
  font-size: 44px;
}

#thismodal .modal-body .icon .glyphicon {
  font-size: 46px;
  top: 14px;
}

#thismodal .modal-p {
  margin: 20px auto;
}

#thismodal .modal-body .modal-p h2 {
  text-align: center;
}

#thismodal .modal-body .modal-p p {
  text-align: center;
  color: #666;
  font-size: 16px;
  padding-top: 8px;
  font-weight: 300;
}

#thismodal .modal-p .btn {
  margin-left: 40%;
  width: 100px;
  height: 40px;
}

#thismodal .modal-error .icon {
  color: #f27474;
  border: 3px solid #f27474;
}

a {
  color: black;
}

a:hover {
  text-decoration: none;
}

.bgc-w {
  background-color: #fff;
}

a {
  cursor: pointer;
}
</style>
