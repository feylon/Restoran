import add from "./add.js";
import upload_pic from "./upload_pic.js";
import edit from "./edit.js"
import get from "./get.js"
import get_by_id from "./get_by_id.js"
export default [
    {path : "/add", component : add},
    {path:"/upload_pic", component : upload_pic},
    {path:"/edit", component : edit},
    {path:"/get", component : get},
    {path : "/get_by_id", component : get_by_id}
    
]