<template>
  <div>
    <div class="row" style="padding-top: 10px">
      <div class="col-md-2">
        <h1 style="font-size: 24px; margin: 0" class="">学生信息管理</h1>
      </div>
      <div class="col-md-10 text-right">
        <a href=""><span class="glyphicon glyphicon-home"></span> 首页</a>
        &gt; <a disabled="disabled">学生信息管理</a>
      </div>
    </div>

    <div id="stuManage" class="row" style="padding-top: 15px">
      <div class="col-md-12">
        <!--id="container"-->
        <div class="bgc-w box box-primary">
          <!--盒子头-->
          <div class="box-header">
            <h3 class="box-title">
              <router-link to="/student/edit" class="label label-success" style="padding: 5px">
                <span class="glyphicon glyphicon-plus"></span>
                新增
              </router-link>
              <a href="" class="label label-success" style="padding: 5px; margin-left: 5px">
                <span class="glyphicon glyphicon-refresh"></span> 刷新
              </a>
            </h3>
            <div class="box-tools">
              <div class="input-group" style="width: 150px">
                <input type="text" class="form-control input-sm search" id="search" placeholder="请输入学生姓名"
                  v-model="keywords" />
                <div class="input-group-btn">
                  <a class="btn btn-sm btn-default" style="padding: 5px" @click.prevent="search">
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
                      <th scope="col">学号</th>
                      <th scope="col">姓名</th>
                      <th scope="col">性别</th>
                      <th scope="col">年级</th>
                      <th scope="col">院系</th>
                      <th scope="col">班级</th>
                      <th scope="col">入学日期</th>
                      <th scope="col">学籍状态</th>
                      <th scope="col">操作</th>
                    </tr>
                    <tr v-if="studentList.length == 0">
                      <td style="color:red">"对不起，查询不到记录！"</td>
                    </tr>
                    <tr v-else v-for="stu in studentList" :key="stu.userId">
                      <td>
                        <span>{{ stu.userName }}</span>
                      </td>
                      <td>
                        <span>{{ stu.realName }}</span>
                      </td>
                      <td>
                        <span>{{ stu.sex }}</span>
                      </td>
                      <td>
                        <span>{{ stu.oiClass.grade }}</span>
                      </td>
                      <td>
                        <span>{{ stu.oiClass.faculty }}</span>
                      </td>
                      <td>
                        <span>{{ stu.oiClass.className }}</span>
                      </td>
                      <td>
                        <span>{{ stu.entranceDate }}</span>
                      </td>
                      <td>
                        <span style="margin-left: 8px" :class="status(stu)">
                          {{ stu.studentStatus == 0 ? "在籍" : "不在籍" }}
                        </span>
                      </td>
                      <td>
                        <router-link :to="{ name: 'studentEdit', params: { studentId: stu.userId, }, }"
                          class="label xiugai">
                          <span class="glyphicon glyphicon-edit"></span> 修改
                        </router-link>
                        <a class="label shanchu" @click.prevent="deleteStudent(stu.userId)">
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
      studentList: [],
      pageInfo: {}, //分页信息，传递给分页组件
      keywords: "",
    };
  },
  props: ["pageNum"], // 接收路由传递来的params
  created () {
    this.keywords = this.$route.params.keywords;
    this.getStudentList();
  },
  watch: {
    $route () {
      this.getStudentList();
    }
  },
  methods: {
    getStudentList () {
      this.axios
        .get("studentManage/list", {
          params: { page: this.pageNum, searchName: this.keywords },
        })
        .then((response) => {
          this.studentList = response.data.studentList.list;
          this.pageInfo = {
            pages: response.data.studentList.pages,
            pageNum: response.data.studentList.pageNum,
            total: response.data.studentList.total,
            pageSize: response.data.studentList.pageSize,
            isFirstPage: response.data.studentList.isFirstPage,
            isLastPage: response.data.studentList.isLastPage,
            hasPreviousPage: response.data.studentList.hasPreviousPage,
            hasNextPage: response.data.studentList.hasNextPage,
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
    search () {
      this.keywords = this.keywords == undefined ? "" : this.keywords;
      this.$router.push(`/student/list/1/${this.keywords}`);
    },
    status (stu) {
      return stu.studentStatus == 0 ? "label label-info" : "label label-danger";
    },
    deleteStudent (studentId) {
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
