<template>
  <div>
    <div class="row" style="padding-top: 10px">
      <div class="col-md-4">
        <h1 style="font-size: 24px; margin: 0" class="">
          考勤月报表 2023年8月
        </h1>
      </div>
      <div class="col-md-8 text-right">
        <a href="##"><span class="glyphicon glyphicon-home"></span> 首页</a> >
        <a>考勤月报表</a>
      </div>
    </div>

    <div id="attendList" class="row" style="padding-top: 15px">
      <div class="col-md-12">
        <!--id="container"-->
        <div class="bgc-w box box-primary">
          <!--盒子头-->
          <div class="box-header">
            <h3 class="box-title">
              <a
                class="label label-success"
                style="
                  padding: 5px;
                  background-color: rgb(108, 123, 139);
                  color: white;
                "
              >
                <span class="glyphicon glyphicon-chevron-left"></span>
                上一月
              </a>
              <a
                class="label label-success"
                style="
                  padding: 5px;
                  margin-left: 5px;
                  background-color: rgb(108, 123, 139);
                  color: white;
                "
              >
                <span class="glyphicon glyphicon-chevron-right"></span>
                下一月
              </a>

              <span style="font-size: 16px; font-family: sans-serif"
                >请选择课程和班级：
                <select
                  id="courseManageId"
                  name="courseManageId"
                  style="display: inline; border-color: rgb(204, 204, 204)"
                >
                  <option>高等数学--软件2103</option>
                </select>
              </span>
            </h3>
            <div class="box-tools">
              <div class="input-group" style="width: 150px">
                <input
                  type="text"
                  class="form-control input-sm search"
                  id="search"
                  placeholder="请输入姓名"
                />
                <div class="input-group-btn">
                  <a class="btn btn-sm btn-default" style="padding: 5px">
                    <span
                      class="glyphicon glyphicon-search usersearchgo"
                    ></span>
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
                      <th scope="col">班级</th>
                      <th scope="col">正常</th>
                      <th scope="col">迟到</th>
                      <th scope="col">早退</th>
                      <th scope="col">请假</th>
                      <th scope="col">旷课</th>
                      <th scope="col">补卡</th>
                      <th scope="col">缺卡</th>
                      <th scope="col">操作</th>
                    </tr>

                    <tr>
                      <td>
                        <span>20230814</span>
                      </td>
                      <td>
                        <span>张三</span>
                      </td>
                      <td>
                        <span>软件2103</span>
                      </td>
                      <td>
                        <span>10</span>
                      </td>
                      <td>
                        <span>1</span>
                      </td>
                      <td>
                        <span>0</span>
                      </td>
                      <td>
                        <span>1</span>
                      </td>
                      <td>
                        <span>1</span>
                      </td>
                      <td>
                        <span>0</span>
                      </td>
                      <td>
                        <span>0</span>
                      </td>
                      <td>
                        <router-link
                          to="/attendance/attendanceDetails/20230814/2023/8"
                          class="label xiugai"
                        >
                          <span class="glyphicon glyphicon-edit"></span>
                          查看详情
                        </router-link>
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
  data() {
    return {
      pageInfo: {}, //分页信息
    };
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
