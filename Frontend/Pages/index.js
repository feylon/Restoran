import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../src/components/Default/Home.vue";

const router = createRouter({
    history : createWebHashHistory(),
    routes : [
        {path : "/", component : Home},
    
    
    
    // admin routers
    {path:"/admin/login", component :()=>import("../src/Admin/login.vue")},
    {path : "/admin", component:()=>import("../src/Admin/main.vue")}
    
    
    ]
});
export default router;