<template>
  <div>
    <div class="row" style="padding-top: 10px">
      <div class="col-md-2">
        <h1 style="font-size: 24px; margin: 0" class="">课程信息管理</h1>
      </div>
      <div class="col-md-10 text-right">
        <a href=""><span class="glyphicon glyphicon-home"></span> 首页</a>
        &gt; <a disabled="disabled">课程信息管理</a>
      </div>
    </div>

    <div id="stuManage" class="row" style="padding-top: 15px">
      <div class="col-md-12">
        <!--id="container"-->
        <div class="bgc-w box box-primary">
          <!--盒子头-->
          <div class="box-header">
            <h3 class="box-title">
              <router-link to="/course/edit" class="label label-success" style="padding: 5px">
                <span class="glyphicon glyphicon-plus"></span>
                新增
              </router-link>
            </h3>
          </div>
          <!--盒子身体-->
          <div class="box-body no-padding thistable">
            <div class="box-body no-padding">
              <div class="table-responsive">
                <table class="table table-hover table-striped">
                  <tbody>
                    <tr>
                      <th scope="col">课程编号</th>
                      <th scope="col">课程名称</th>
                      <th scope="col">操作</th>
                    </tr>
                    <tr v-if="courseList.length == 0">
                      <td style="color:red">"对不起，查询不到记录！"</td>
                    </tr>
                    <tr v-else v-for="course in courseList" :key="course.Id">
                      <td>
                        <span>{{ course.courseNo }}</span>
                      </td>
                      <td>
                        <span>{{ course.courseName }}</span>
                      </td>
                      <td>
                        <router-link :to="{ name: 'courseEdit', params: { courseId: course.id, }, }"
                          class="label xiugai">
                          <span class="glyphicon glyphicon-edit"></span> 修改
                        </router-link>
                        <a class="label shanchu" @click.prevent="deleteCourse(course.Id)">
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
      courseList: [],
      pageInfo: {}, //分页信息，传递给分页组件
      keywords: "",
    };
  },
  props: ["pageNum"], // 接收路由传递来的params
  created () {
    this.keywords = this.$route.params.keywords;
    this.getCourseList();
  },
  watch: {
    $route () {
      this.getCourseList();
    }
  },
  methods: {
    getCourseList () {
      this.axios
        .get("course/list", {
          params: { page: this.pageNum },
        })
        .then((response) => {
          this.courseList = response.data.courseList.list;
          this.pageInfo = {
            pages: response.data.courseList.pages,
            pageNum: response.data.courseList.pageNum,
            total: response.data.courseList.total,
            pageSize: response.data.courseList.pageSize,
            isFirstPage: response.data.courseList.isFirstPage,
            isLastPage: response.data.courseList.isLastPage,
            hasPreviousPage: response.data.courseList.hasPreviousPage,
            hasNextPage: response.data.courseList.hasNextPage,
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteCourse (studentId) {
      if (!confirm("删除该记录将不能恢复，确定删除吗？")) {
        return;
      }
      this.axios
        .delete("studentManage/delete", { params: { userId: studentId } })
        .then((response) => {
          alert(response.data.msg);
          location.reload();
          this.$router.push("/student/list/1");
        })
        .catch((error) => {
          console.log(error)
        })
    },
  }
};
</script>

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
</style>
