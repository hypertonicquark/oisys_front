import VueRouter from 'vue-router';
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push (location) {//解决重复路由时的错误
    return originalPush.call(this, location).catch(err => err)
}
const routes = [
    {   // 课程列表
        path: "/course/list/:pageNum?/:keywords?",
        name: "courseManage",
        component: () => import("../views/courseManage/CourseManage.vue"),
        props: true
    },
    {   // 新增/修改课程信息
        path: "/course/edit/:courseId?",
        name: "courseEdit",
        component: () => import("../views/courseManage/CourseEdit.vue"),
        props: true
    },
    {   // 学生列表
        path: "/student/list/:pageNum?/:keywords?",
        name: "studentManage",
        component: () => import("../views/student/StudentManage.vue"),
        props: true
    },
    {   // 新增/修改学生信息
        path: "/student/edit/:studentId?",
        name: "studentEdit",
        component: () => import("../views/student/StudentEdit.vue"),
        props: true
    },
    {   // 新增/修改班级信息
        path: "/class/edit/:classId?",
        name: "classEdit",
        component: () => import("../views/class/ClassEdit.vue"),
        props: true
    },
    {   // 班级管理列表
        path: "/class/list/:pageNum?/:keywords?",
        name: "classManage",
        component: () => import("../views/class/ClassManage.vue"),
        props: true
    },
    {   // 课程管理列表
        path: "/courseManage/list/:pageNum?/:keywords?",
        name: "courseManageManage",
        component: () => import("../views/course/CourseManage.vue"),
        props: true
    },
    {   // 添加/修改课程管理
        path: "/courseManage/edit/:courseManageId?/:details?",
        name: "courseManageEdit",
        component: () => import("../views/course/CourseEdit.vue"),
        props: true
    },
    {   // 考勤月汇总
        path: "/attendance/monthList/:year/:month/:pageNum?/:keywords?",
        name: "attendanceMonthList",
        component: () => import("../views/attendance/AttendanceMonthList.vue"),
        props: true
    },
    {   // 考勤详情
        path: "/attendance/attendanceDetails/:userId/:year/:month/:pageNum?",
        name: "attendanceDetails",
        component: () => import("../views/attendance/StudentAttendanceDetails.vue"),
        props: true
    },
];
let router = new VueRouter({ mode: 'history', routes });
//  跳转前先验证登录
router.beforeEach((to, from, next) => {//to为目标路由
    if (JSON.parse(sessionStorage.getItem("user")) == null) {//本地sessionStorage中没有用户信息，打回登录页面
        self.location.href = '/login.html';
    } else {
        next();//如果登录验证成功，正常路由跳转
    }
});

export default router;