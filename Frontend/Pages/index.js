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
        ]
    }
    
    
    ]
});
export default router;