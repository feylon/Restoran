// Admin auth
import login from "./Auth/login.js";
import profile from "./Auth/getProfile.js";
import changepassword from "./Auth/changepassword.js";
import changeprofile from "./Auth/changeprofile.js";
import changephoto from "./Auth/changephoto.js";

export default 
[
    // Admin auth 
    {component : login, path : "/login"},
    {component : profile, path : "/profile"},
    {component : changepassword, path : "/changepassword"},
    {component : changeprofile, path : "/changeprofile"},
    {component : changephoto, path : "/changephoto"},
]


