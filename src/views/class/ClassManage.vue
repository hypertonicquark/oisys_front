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
              <router-link to="/class/edit" class="label label-success" style="padding: 5px">
                <span class="glyphicon glyphicon-plus"></span>
                新增
              </router-link>
              <a href="" class="label label-success" style="padding: 5px; margin-left: 5px">
                <span class="glyphicon glyphicon-refresh"></span> 刷新
              </a>
            </h3>
            <div class="box-tools">
              <div class="input-group" style="width: 150px">
                <input type="text" class="form-control input-sm search" id="search" placeholder="请输入班级姓名"
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
                      <th scope="col">班级编号</th>
                      <th scope="col">班级名称</th>
                      <th scope="col">所在院系</th>
                      <th scope="col">名称</th>
                      <th scope="col">专业</th>
                      <th scope="col">操作</th>
                    </tr>
                    <tr v-if="classList.length == 0">
                      <td style="color:red">"对不起，查询不到记录！"</td>
                    </tr>
                    <tr v-else v-for="clas in classList" :key="clas.classId">
                      <td>
                        <span>{{ clas.classNo }}</span>
                      </td>
                      <td>
                        <span>{{ clas.className }}</span>
                      </td>
                      <td>
                        <span>{{ clas.faculty }}</span>
                      </td>
                      <td>
                        <span>{{ clas.grade }}</span>
                      </td>
                      <td>
                        <span>{{ clas.major }}</span>
                      </td>
                      <td>
                        <router-link :to="{ name: 'classEdit', params: { classId: clas.classId, }, }"
                          class="label xiugai">
                          <span class="glyphicon glyphicon-edit"></span> 修改
                        </router-link>
                        <a class="label shanchu" @click.prevent="deleteClass(clas.classId)">
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
      classList: [],
      pageInfo: {}, //分页信息，传递给分页组件
      keywords: "",
    };
  },
  props: ["pageNum"], // 接收路由传递来的params
  created () {
    this.keywords = this.$route.params.keywords;
    this.getClassList();
  },
  watch: {
    $route () {
      this.getClassList();
    }
  },
  methods: {
    getClassList () {
      this.axios
        .get("class/list", {
          params: { page: this.pageNum, searchName: this.keywords },
        })
        .then((response) => {
          this.classList = response.data.classList.list;
          this.pageInfo = {
            pages: response.data.classList.pages,
            pageNum: response.data.classList.pageNum,
            total: response.data.classList.total,
            pageSize: response.data.classList.pageSize,
            isFirstPage: response.data.classList.isFirstPage,
            isLastPage: response.data.classList.isLastPage,
            hasPreviousPage: response.data.classList.hasPreviousPage,
            hasNextPage: response.data.classList.hasNextPage,
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
    search () {
      this.keywords = this.keywords == undefined ? "" : this.keywords;
      this.$router.push(`/class/list/1/${this.keywords}`);
    },
    deleteClass (classId) {
      if (!confirm("删除该记录将不能恢复，确定删除吗？")) {
        return;
      }
      this.axios
        .delete("class/delete", { params: { classId: classId } })
        .then((response) => {
          alert(response.data.msg);
          location.reload();
          this.$router.push("/class/list/1");
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
