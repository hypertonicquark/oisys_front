<template>
  <div>
    <div class="row" style="padding-top: 10px">
      <div class="col-md-2">
        <h1 style="font-size: 24px; margin: 0" class="">课程教学管理</h1>
      </div>
      <div class="col-md-10 text-right">
        <a><span class="glyphicon glyphicon-home"></span> 首页</a>
        >
        <a>课程教学管理</a>
      </div>
    </div>

    <div class="row" style="padding-top: 15px" id="editCourseManageApp1">
      <div class="col-md-12">
        <div class="bgc-w box">
          <div class="panel-body">
            <div class="row form-flex">
              <!--课程编号开始-->
              <div class="col">
                <div class="input-group form-sty">
                  <span class="input-group-addon" id="basic-addon2"
                    >课程编号</span
                  >
                  <!--查看详情，展示文本框，只读。和下拉框二选一-->
                  <!--  <div class="dropdown">                 
                     <input
                      class="form-control"
                      id="courseNo"
                      name="courseNo"
                      readonly                   
                    /> 
                  </div>-->
                  <div class="dropdown">
                    <!--新增修改，展示下拉框-->
                    <select class="form-control" id="courseNo" name="courseNo">
                      <option value="">请选择</option>
                      <option>001</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col">
                <!--课程名称根据课程号填写，文本框，只读-->
                <div class="input-group form-sty">
                  <span class="input-group-addon" id="basic-addon2"
                    >课程名称</span
                  >
                  <div class="dropdown">
                    <input
                      class="form-control"
                      id="courseName"
                      name="courseName"
                      readonly
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row form-flex">
              <!--选择老师开始-->
              <div class="col">
                <div class="input-group form-sty">
                  <span class="input-group-addon" id="basic-addon2"
                    >授课老师</span
                  >
                  <!--查看详情展示文本框，只读-->
                  <!-- <div class="dropdown">                   
                       <input
                      class="form-control"
                      id="teacherNo"
                      name="teacherNo"
                      readonly
                    /> 
                  </div>-->
                  <div class="dropdown">
                    <!--新增修改展示下拉框-->
                    <select
                      class="form-control"
                      id="teacherNo"
                      name="teacherNo"
                    >
                      <option value="">请选择</option>
                      <option>刷</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col">
                <!--选择班级开始-->
                <div class="input-group form-sty">
                  <span class="input-group-addon" id="basic-addon2">班级</span>
                  <!--查看详情展示文本框，只读-->
                  <!--   <div class="dropdown">
                    <input
                      class="form-control"
                      id="classNo"
                      name="classNo"
                      readonly
                    />
                  </div> -->
                  <div class="dropdown">
                    <!--新增修改展示下拉框-->
                    <select class="form-control" id="classNo" name="classNo">
                      <option value="">请选择</option>
                      <option>软件2103</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div id="copied">
              <div class="form-group">
                <div class="row form-flex form-background">
                  <div class="input-group form-sty">
                    <a
                      style="display: table-cell; vertical-align: middle"
                      class="label shanchu"
                    >
                      <span class="glyphicon glyphicon-remove"></span>
                      删除
                    </a>
                    <span class="input-group-addon"> 上课设置</span>
                    <div class="row">
                      <span class="input-group-addon">
                        <input type="radio" />星期一
                      </span>
                      <span class="input-group-addon">
                        <input type="radio" />星期二
                      </span>
                      <span class="input-group-addon">
                        <input type="radio" />星期三
                      </span>
                      <span class="input-group-addon">
                        <input type="radio" />星期四
                      </span>
                      <span class="input-group-addon">
                        <input type="radio" />星期四
                      </span>
                      <span class="input-group-addon">
                        <input type="radio" />星期六
                      </span>
                      <span class="input-group-addon">
                        <input type="radio" />星期天
                      </span>
                    </div>
                    <div class="row margin-zoom">
                      <div class="col-sm-6 form-flex">
                        <span>上课时间</span>
                        <div class="form-group">
                          <el-time-select
                            placeholder="起始时间"
                            :picker-options="{
                              start: '08:00',
                              step: '00:10',
                              end: '20:00',
                              maxTime: '22:00',
                            }"
                          >
                          </el-time-select>
                        </div>
                      </div>
                      <div class="col-sm-6 form-flex">
                        <span>下课时间</span>
                        <el-time-select
                          placeholder="结束时间"
                          :picker-options="{
                            start: '08:00',
                            step: '00:10',
                            end: '22:00',
                            minTime: '08:00',
                          }"
                        >
                        </el-time-select>
                      </div>
                    </div>
                    <div class="row margin-zoom">
                      <div class="input-group">
                        <span class="input-group-addon">教学地址</span>
                        <input
                          type="text"
                          class="form-control address"
                          placeholder="Search for..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <button type="button" class="btn btn-default w-100 add_column">
                <span class="glyphicon glyphicon-plus"></span> 增加上课设置
              </button>
            </div>
            <!--盒子尾-->
            <div class="box-footer" style="text-align: right">
              <input
                class="btn btn-primary save_column"
                type="button"
                value="确定"
              />
              <input
                class="btn btn-default"
                id="cancel"
                type="submit"
                value="返回"
                onclick="window.history.back();"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      readOnly: true,
      weeks: [
        { name: "星期一", value: "周一" },
        { name: "星期二", value: "周二" },
        { name: "星期三", value: "周三" },
        { name: "星期四", value: "周四" },
        { name: "星期五", value: "周五" },
        { name: "星期六", value: "周六" },
        { name: "星期日", value: "周日" },
      ],
    };
  },
};
</script>
<style scoped>
* {
  margin: 0;
  /* padding: 0; */
}

.modelBox {
  width: 80%;
  margin: 0 auto;
}

.form-flex {
  display: flex;
  justify-content: space-between;
}

.row {
  width: 100%;
  margin: 0;
  margin-bottom: 10px;
}

.col {
  width: 49%;
  display: flex;
}

.input-group {
  width: 100%;
}

.form-sty > .input-group-addon {
  width: 172px;
}

.col .dropdown {
  flex: 1;
}

.col .dropdown .btn-default {
  width: 100%;
}

.margin-zoom {
  margin: 0;
}

.w-100 {
  width: 100%;
}

.form-background {
  background-color: #eee;
}

.form-group {
  position: relative;
  margin-bottom: 15px;
}
#copied .form-group:first-child .delect {
  display: none;
}

.delect {
  width: 36px;
  height: 36px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
  cursor: pointer;
}
a {
  cursor: pointer;
}
/* .el-time-spinner__item {
  height: 32px;
  line-height: 32px;
  font-size: 12px;
  color: #606266;
  text-align: center;
} */
</style>