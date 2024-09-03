<template>
  <div class="cotn_principal">
    <div class="cont_centrar" style="top: 5%">
      <div class="cont_login">
        <div class="cont_forms cont_forms_active_login" style="height: 480px; width: 400px; border-radius: 15px">
          <div class="cont_img_back_">
            <img src="/images/timg.jpeg" alt="背景图片" />
          </div>
          <div class="cont_form_login" style="display: block; opacity: 1; width: 400px">
            <div class="alert alert-danger alert-dismissible" role="alert" v-if="error"
              style="position: absolute; padding: 11px">
              <span class="error-mess">{{ errorMessage }}</span>
              <button type="button" class="close" data-dismiss="alert" aria-label="Close" style="right: 0px" disabled>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <h2>账号密码登录</h2>
            <input type="text" placeholder="请输入账户名" autofocus="autofocus" name="userName" class="userName test"
              v-model="userName" />
            <input type="password" placeholder="密码" name="password" class="password test" v-model="password" />

            <button type="button" class="btn_login btn" style="margin-top: 60px" @click="login">
              确定
            </button>
          </div>
        </div>
        <div style="border: 1px solid transparent">
          <p style="
              margin-top: 550px;
              font-weight: 400;
              color: #757575;
              font-size: 22px;
              letter-spacing: 1px;
            ">
            欢迎使用智能考勤管理系统
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "UserLogin",
  data () {
    return {
      userName: "",
      password: "",
      error: false,
      errorMessage: "",
    };
  },
  methods: {
    login () {
      if (this.userName.trim() == "" || this.password.trim() == "") {
        this.error = true;
        this.errorMessage = "请输入用户名和密码";
        return;
      }
      this.axios
        .post("login", { userName: this.userName, password: this.password },
          { headers: { post: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8", }, }, }
        )
        .then((response) => {
          if (response.data.code === 0) {
            sessionStorage.setItem("user",
              JSON.stringify({
                userId: response.data.userId,
                realName: response.data.realName,
                className: response.data.className,
                roleId: response.data.roleId,
                imgPath: response.data.imgPath,
              })
            );
            self.location.href = "/index.html";
          } else {
            this.error = true;
            this.errorMessage = response.data.msg;
          }
        });
    },
  },
};
</script>

<style scoped>
.inp {
  border: 1px solid #cccccc;
  border-radius: 2px;
  padding: 0 10px;
  width: 278px;
  height: 40px;
  font-size: 18px;
}

.btn:hover {
  background: #3c83a5;
  color: #fff;
}

#captcha {
  width: 300px;
  display: inline-block;
}

label {
  vertical-align: top;
  display: inline-block;
  width: 80px;
  text-align: right;
}

#wait {
  text-align: left;
  color: #666;
  margin: 0;
}

.thisimg:hover {
  cursor: pointer;
}

.test:focus {
  border-color: #66afe9 !important;
}

.modal-dialog {
  width: 500px;
}

.modal-body .icon {
  height: 80px;
  width: 80px;
  margin: 20px auto;
  border-radius: 50%;
  color: #aad6aa;
  border: 3px solid #d9ead9;
  text-align: center;
  font-size: 44px;
}

.modal-body .icon .glyphicon {
  top: 11px;
}

.modal-p {
  margin: 20px auto;
}

.modal-body .modal-p h2 {
  text-align: center;
}

.modal-body .modal-p p {
  text-align: center;
  color: #666;
  font-size: 16px;
  padding-top: 8px;
  font-weight: 300;
}

.modal-p .btn {
  width: 100px;
  height: 40px;
}

.modal-error .icon {
  color: #f27474;
  border: 3px solid #f27474;
}
</style>