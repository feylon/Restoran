import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../src/components/Default/Home.vue";

const router = createRouter({
    history : createWebHashHistory(),
    routes : [
        {path : "/", component : Home},
    
    
    
    // admin routers
    {path:"/admin/login", component :()=>import("../src/Admin/login.vue")},
    {path:"/admin/forgot", component :()=>import("../src/Admin/Auth/ForgotPassword.vue")},
    {path : "/admin/reset/:token", component:()=>import("../src/Admin/Auth/ResetPassword.vue")},
    {path : "/admin", component:()=>import("../src/Admin/main.vue"),
        
        children :
        [
            {path:"/admin", component :()=>import("../src/Admin/components/dashtboard.vue")},
            {path: "/admin/security", component:()=>import("../src/Admin/Auth/ChangePassword.vue")},





            // Category
            {path:"/admin/category", component :()=>import("../src/Admin/Category/CategoryList.vue")},
            {path:"/admin/category/add", component :()=>import("../src/Admin/Category/addCategory.vue")},
            {path:"/admin/food", component :()=>import("../src/Admin/taom/taom.vue")},
            {path : "/admin/food/edit/:id", component:()=>import ("../src/admin/Taom/edit_taom.vue")},
            {path:"/admin/category/edit/:id", component:()=>import("../src/Admin/Category/edit.vue")},
            {path:"/admin/nofound", component:()=>import("../src/Admin/reuseable/404.vue")}


        ]
    }
    
    
    ]
});
export default router;