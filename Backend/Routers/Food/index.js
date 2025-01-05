import add from "./add.js";
import add_pic from "./add.pic.js"
import get from "./get.js";
import get_category_id from "./get_category_id.js"
import get_name from "./get_name.js"
import remove_pic from "./remove.pic.js"
import deletefood from "./deletefood.js"

export default [
    {path:"/add", component : add},
    {path:"/add_pic", component : add_pic},
    {path:"/get", component : get},
    {path:"/get_category_id", component : get_category_id},
    {path:"/get_name", component : get_name},
    {path:"/remove_pic", component : remove_pic},
    {path:"/deletefood", component : deletefood},
]