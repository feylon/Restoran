// Admin auth
import login from "./Auth/login.js";
import profile from "./Auth/getProfile.js";


export default 
[
    // Admin auth 
    {component : login, path : "/login"},
    {component : profile, path : "/profile"},
]

