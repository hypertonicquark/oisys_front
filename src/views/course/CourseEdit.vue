<template>
  <div>
    <div class="row" style="padding-top: 10px">
      <div class="col-md-2">
        <h1 style="font-size: 24px; margin: 0" class="">课程信息管理</h1>
      </div>
      <div class="col-md-10 text-right">
        <a href="##"><span class="glyphicon glyphicon-home"></span> 首页</a>
        &gt; <a disabled="disabled">课程信息管理</a>
      </div>
    </div>
    <div id="studentEdit" class="row" style="padding-top: 15px">
      <div class="col-md-12">
        <!--id="container"-->
        <div class="bgc-w box">
          <!--盒子头-->
          <form enctype="multipart/form-data" @submit.prevent="save">
            <div class="box-header">
              <h3 class="box-title">
                <a href="javascript:history.back();" class="label label-default" style="padding: 5px">
                  <i class="glyphicon glyphicon-chevron-left"></i>
                  <span>返回</span>
                </a>
              </h3>
            </div>
            <!--盒子身体-->
            <div class="box-body no-padding">
              <div class="box-body">
                <div class="row">
                  <div class="col-md-6 form-group">
                    <label class="control-label"><span>课程编号</span></label>
                    <input name="userName" class="form-control" :readonly="course.id" v-model="course.courseNo" />
                  </div>
                  <div class="col-md-6 form-group">
                    <label class="control-label"><span>课程名称</span></label>
                    <input name="realName" class="form-control" v-model="course.courseName" />
                  </div>
                </div>
              </div>
            </div>
            <!--盒子尾-->
            <div class="box-footer">
              <input class="btn btn-primary" id="save" type="submit" value="保存" />
              <input class="btn btn-default" id="cancel" type="button" value="取消" onclick="history.back()" />
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="modal fade in" id="thismodal" data-backdrop="static">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body modal-success" style="display: none">
            <div class="icon">
              <span class="glyphicon glyphicon-ok"></span>
            </div>
            <div class="modal-p">
              <h2>操作成功</h2>
              <div class="modal-p">
                <button type="button" class="btn btn-primary successToUrl" data-dismiss="modal">
                  确定
                </button>
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
  data () {
    return {
      course: {
        courseNo: "",
        courseName: "",
      },
    };
  },
  props: ["courseId"],
  created () {
    this.getStudentById();
  },
  methods: {
    getStudentById () {
      this.axios
        .get("course/edit", { params: { courseId: this.courseId } })
        .then((response) => {
          if (response.data.course) {
            this.course = response.data.course;
          }
        })
    },
    checkEmpty (form) {
      for (let i = 0; i < form.elements.length; i++) {
        if (form.elements[i].value == "" && form.elements[i].name != "filePath") {
          alert("表单不能为空！");
          return false;
        }
      }
      return true;
    },
    save (event) {
      if (!this.checkEmpty(event.target)) {
        return;
      }
      let formData = new FormData();
      if (this.course.id) {
        formData.append("id", this.course.id);
      }
      formData.append("courseNo", this.course.courseNo);
      formData.append("courseName", this.course.courseName);
      this.axios
        .post("course/save", formData, {
          headers: { "Content-type": "multipart/form-data" },
        })
        .then((response) => {
          alert(response.data.msg);
          if (response.data.code == 0) {
            this.$router.push("/course/list/1");
          }
        })
        .catch((error) => {
          console.log(error);
        })
    },
  }
};
</script>
<style scoped>
a {
  color: black;
}

a:hover {
  text-decoration: none;
}

.bgc-w {
  background-color: #fff;
}

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
</style>