<template>
     <n-card title="Rasmni o'zgartirish" style="width: 400px" class="flex h-[280px] ps-3 pe-3 pb-3">
           <label for="file" class="flex items-center justify-center relative">
            <img  @mouseover="hover = true" @mouseleave="hover = false" :src="`${url}${data.profile_url.replace('/uploads', '')}`"
                class="w-[180px] h-[180px]  rounded-[90px] object-center"
                :class="hover?'bg-opacity-50':'bg-opacity-0'"
                
                alt="">
            <font-awesome-icon
                @mouseover="hover = true" 
                :class="hover?'opacity-1':'opacity-0'"
            class="text-[25px] absolute bottom-2 text-white cursor-pointer" :icon="['fas', 'camera-rotate']" />
           </label>
        </n-card>
        <input v-show="false" type="file" id="file"  @change="uploadfile">
</template>

<script setup>
import { Admin } from "../../../../Pinia";
import { ref, onMounted, watch } from "vue";
import url from "../../../../url";
import { useRouter } from "vue-router";
import { useMessage } from "naive-ui";
const message = useMessage();
let file = ref(null);
const router = useRouter();
const hover = ref(false);
const admin = Admin();
console.log(admin.profile_url);
watch(hover, (newwal, oldwal)=>{
// console.log(newwal, oldwal)
});
const data = ref({

    profile_url: ""
});

onMounted(() => {
    data.value.profile_url = admin.profile_url;
});

const uploadfile = (e)=>{
    if(e.target.files[0])
{    console.log(e.target.files[0].size);
    if(e.target.files[0].size > 2000000){
        message.error("Rasm hajmi 2mb dan oshmasligi kerak");
        return;
    }
    if(e.target.files[0].type !== "image/jpeg" && e.target.files[0].type !== "image/png"){
        message.error("Rasm formati faqatgina jpg yoki png bo'lishi kerak");
        return;
    }
    file.value = e.target.files[0];
    
    const formData = new FormData();
    formData.append("profile_photo", file.value);
    console.log(formData.values());
    fetchAdmin("admin/changephoto", {
        method: "POST",
        headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
        body: formData
    }, router).then((res) => {
        console.log(res)
        if(res.status === 200){
            message.success("Rasm muvaffaqiyatli o'zgartirildi");
            router.go(0)   ;
        }
    })
    .catch((err) => {
        console.log(err);
    });
    ;
}

}

</script>

<style scoped>
img{
    background-position: center;
    background-color:   rgba(0, 0, 0, 0.1);
}
</style>