<template>
  <div class="box-footer no-padding" style="margin-top: -20px">
    <div style="padding: 5px">
      <div
        id="page"
        style="
          background: #fff;
          border: 0px;
          margin-top: 0px;
          padding: 2px;
          height: 25px;
        "
      >
        <div style="width: 40%; float: left">
          <div class="pageInfo" style="margin-left: 5px">
            共<span>{{ pageInfo.total }}</span
            >条 | 每页<span>{{ pageInfo.pageSize }}</span
            >条 | 共<span>{{ pageInfo.pages }}</span
            >页
          </div>
        </div>
        <div style="width: 60%; float: left">
          <div class="pageOperation">
            <!--  跳转到第1页按钮 ，第1页时不可用 -->
            <a
              @click.prevent="pageInfo.isFirstPage ? '' : nav(1)"
              class="btn btn-sm btn-default no-padding tablefirst"
              v-bind:disabled="pageInfo.isFirstPage"
              style="width: 30px; height: 20px"
            >
              <span class="glyphicon glyphicon-backward"></span
            ></a>
            <!--  跳转到上一页按钮 ，第1页时不可用 -->
            <a
              @click.prevent="
                pageInfo.isFirstPage ? '' : nav(pageInfo.pageNum - 1)
              "
              class="btn btn-sm btn-default no-padding tablefirst"
              v-bind:disabled="pageInfo.isFirstPage"
              style="width: 30px; height: 20px"
            >
              <span class="glyphicon glyphicon-triangle-left"></span
            ></a>
            <a
              disabled="disabled"
              class="btn btn-default no-padding"
              style="width: 30px; height: 20px"
            >
              {{ pageInfo.isLastPage ? pageInfo.pages : pageInfo.pageNum }}
            </a>
            <!--   跳转到下一页按钮 ，最后一页时不可用 -->
            <a
              @click.prevent="
                pageInfo.isLastPage ? '' : nav(pageInfo.pageNum + 1)
              "
              class="btn btn-sm btn-default no-padding tabledown"
              v-bind:disabled="pageInfo.isLastPage"
              style="width: 30px; height: 20px"
            >
              <span class="glyphicon glyphicon-triangle-right"></span
            ></a>
            <!--  跳转到最后一页按钮 ，最后一页时不可用 -->
            <a
              @click.prevent="pageInfo.isLastPage ? '' : nav(pageInfo.pages)"
              class="btn btn-sm btn-default no-padding tablelast"
              v-bind:disabled="pageInfo.isLastPage"
              style="width: 30px; height: 20px"
            >
              <span class="glyphicon glyphicon-forward"></span
            ></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["pageInfo"],
  created() {},

  methods: {
    nav(pageNum) {
      //导航到第pageNum页
      let params = this.$route.params;
      params.pageNum = pageNum;
      this.$router.push({
        //保持routeName不变，其它params、query参数不变，只改变了路径参数里的pageNum
        name: this.$route.name,
        params,
        query: this.$route.query,
      });
    },
  },
};
</script>