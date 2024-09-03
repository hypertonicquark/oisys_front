<template>
  <div>
    <div class="row" style="padding-top: 10px">
      <div class="col-md-2">
        <h1 style="font-size: 24px; margin: 0" class="">学生信息管理</h1>
      </div>
      <div class="col-md-10 text-right">
        <a href="##"><span class="glyphicon glyphicon-home"></span> 首页</a>
        &gt; <a disabled="disabled">学生信息管理</a>
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
                    <label class="control-label"><span>学号</span></label>
                    <input name="userName" class="form-control" :readonly="student.userId" v-model="student.userName" />
                  </div>
                  <div class="col-md-6 form-group">
                    <label class="control-label"><span>姓名</span></label>
                    <input name="realName" class="form-control" v-model="student.realName" />
                  </div>
                  <div class="col-md-6 form-group">
                    <label class="control-label"> <span>性别</span> </label>
                    <select class="form-control" name="sex" v-model="student.sex">
                      <option value="男">男</option>
                      <option value="女">女</option>
                    </select>
                  </div>
                  <div class="col-md-6 form-group">
                    <label class="control-label"> <span>班级</span></label>
                    <select class="classselect form-control" name="classId" v-model="student.classId">
                      <option value="">请选择</option>
                      <option v-for="clas in classes" :key="clas.classId" :value="clas.classId">{{ clas.className }}
                      </option>
                    </select>
                  </div>
                  <div class="col-md-6 form-group">
                    <span> <label class="control-label">入学日期</label> </span>
                    <input name="entranceDate" class="form-control" id="start" onclick="WdatePicker()"
                      v-model="student.entranceDate" />
                  </div>
                  <div class="col-md-6 form-group">
                    <label class="control-label"><span>学籍状态</span></label>
                    <select class="form-control" name="studentStatus" v-model="student.studentStatus">
                      <option value="0">在籍</option>
                      <option value="1">不在籍</option>
                    </select>
                  </div>
                </div>

                <!--判断一下 请求参数的值  进行显示-->
                <div class="row">
                  <hr />
                  <div class="col-md-6">
                    <div v-show="student.userId || showPic">
                      <label class="control-label"><span>头像</span></label>
                      <div>
                        <img name="imageField" :src="getPictureUrl()" style="
                            width: 100px;
                            height: 100px;
                            border-radius: 100px;
                          " />
                      </div>
                    </div>
                    <label class="control-label"><span>上传头像</span></label>
                    <div class="form-group">
                      <div>
                        <input type="file" name="filePath" style="width: 100%" @change="previewPicture" />
                      </div>
                      <p class="help-block">
                        尺寸在512*512以内，大小在500KB以内
                      </p>
                    </div>
                  </div>
                  <div class="col-md-6" v-if="student.userId">
                    <label class="control-label"><span>重置密码</span></label>
                    <br />
                    <span class="labels"><label><input name="resetPassword" type="checkbox"
                          v-model="resetPassword" /><i>✓</i></label></span>
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
      student: {
        oiClass: {},
        sex: "男",
        studentStatus: 0,
        classId: "",
        entranceDate: "",
      },
      classes: [],
      resetPassword: false,
      showPic: false,
    };
  },
  props: ["studentId"],
  created () {
    this.getStudentById();
  },
  methods: {
    getStudentById () {
      this.axios
        .get("studentManage/edit", { params: { userId: this.studentId } })
        .then((response) => {
          if (response.data.student) {
            this.student = response.data.student;
          }
          this.classes = response.data.classes;
        })
    },
    getPictureUrl () {
      if (this.student.imgPath) {
        return `${this.axios.defaults.baseURL}/face/${this.student.imgPath}`;
      }
      return "";
    },
    previewPicture (event) {
      let pic = window.URL.createObjectURL(event.target.files[0]);
      document.querySelector("img[name=imageField]").src = pic;
      this.showPic = true;
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
      let file = event.target.elements["filePath"].files[0];
      formData.append("filePath", file);
      if (this.student.userId) {
        formData.append("userId", this.student.userId);
      } else {
        this.resetPassword = true;
      }
      formData.append("classId", this.student.classId);
      formData.append("userName", this.student.userName);
      formData.append("realName", this.student.realName);
      formData.append("sex", this.student.sex);
      formData.append("studentStatus", this.student.studentStatus);
      formData.append("entranceDate", document.getElementById("start").value);
      formData.append("resetPassword", this.resetPassword);
      this.axios
        .post("studentManage/save", formData, {
          headers: { "Content-type": "multipart/form-data" },
        })
        .then((response) => {
          alert(response.data.msg);
          if (response.data.code == 0) {
            this.$router.push("/student/list/1");
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