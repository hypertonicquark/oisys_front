<template>
  <div>
    <div class="row" style="padding-top: 10px">
      <div class="col-md-2">
        <h1 style="font-size: 24px; margin: 0" class="">班级信息管理</h1>
      </div>
      <div class="col-md-10 text-right">
        <a href="##"><span class="glyphicon glyphicon-home"></span> 首页</a>
        &gt; <a disabled="disabled">班级信息管理</a>
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
                    <label class="control-label"><span>班级编号</span></label>
                    <input name="classNo" class="form-control" :readonly="clas.classId" v-model="clas.classNo" />
                  </div>
                  <div class="col-md-6 form-group">
                    <label class="control-label"><span>班级名称</span></label>
                    <input name="className" class="form-control" v-model="clas.className" />
                  </div>
                  <div class="col-md-6 form-group">
                    <label class="control-label"><span>所在院系</span></label>
                    <input name="classFaculty" class="form-control" v-model="clas.faculty" />
                  </div>
                  <div class="col-md-6 form-group">
                    <label class="control-label"><span>年级</span></label>
                    <input name="classGrade" class="form-control" v-model="clas.grade" />
                  </div>
                  <div class="col-md-6 form-group">
                    <label class="control-label"><span>专业</span></label>
                    <input name="classMajor" class="form-control" v-model="clas.major" />
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
      clas: {
        classNo: "",
        className: "",
        faculty: "",
        grade: "",
        major: "",
      },
    };
  },
  props: ["classId"],
  created () {
    this.getStudentById();
  },
  methods: {
    getStudentById () {
      this.axios
        .get("class/edit", { params: { classId: this.classId } })
        .then((response) => {
          if (response.data.class) {
            this.clas = response.data.class;
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
      if (this.clas.classId) {
        formData.append("classId", this.clas.classId);
      }
      formData.append("classNo", this.clas.classNo);
      formData.append("className", this.clas.className);
      formData.append("faculty", this.clas.faculty);
      formData.append("grade", this.clas.grade);
      formData.append("major", this.clas.major);
      this.axios
        .post("class/save", formData, {
          headers: { "Content-type": "multipart/form-data" },
        })
        .then((response) => {
          alert(response.data.msg);
          if (response.data.code == 0) {
            this.$router.push("/class/list/1");
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