<template>
  <div>
    <div class="row" style="padding-top: 10px">
      <div class="col-md-5">
        <h1 style="font-size: 24px; margin: 0" class="">
          张三同学2023年8月考勤详情
        </h1>
      </div>
      <div class="col-md-7 text-right">
        <a href="##"><span class="glyphicon glyphicon-home"></span> 首页</a> >
        <a>考勤详情</a>
      </div>
    </div>

    <div id="attendList" class="row" style="padding-top: 15px">
      <div class="col-md-12">
        <!--id="container"-->
        <div class="bgc-w box box-primary">
          <!--盒子头-->
          <div class="box-header">
            <h3 class="box-title">
              <router-link
                to="/attendance/monthList/2023/8"
                class="label label-default"
                style="padding: 5px"
              >
                <i class="glyphicon glyphicon-chevron-left"></i>
                <span>返回</span>
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
                      <th scope="col">授课老师</th>
                      <th scope="col">班级</th>
                      <th scope="col">打卡类型</th>
                      <th scope="col">打卡时间</th>
                      <th scope="col">打卡方式</th>
                      <th scope="col">地点</th>
                      <th scope="col">状态</th>
                    </tr>

                    <tr>
                      <td>
                        <span>001</span>
                      </td>
                      <td>
                        <span>高等数学</span>
                      </td>
                      <td>
                        <span>数学老师</span>
                      </td>
                      <td>
                        <span>软件2103</span>
                      </td>
                      <td>
                        <span> 上课打卡 </span>
                      </td>
                      <td>
                        <span>2023年8月14日 10:20</span>
                      </td>
                      <td>
                        <span> 手机端 </span>
                      </td>
                      <td>
                        <span>资讯楼101</span>
                      </td>
                      <td>
                        <span>迟到 </span>
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
.ired {
  color: red;
}
.iblack {
  color: black;
}
</style>
