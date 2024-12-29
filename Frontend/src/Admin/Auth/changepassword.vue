<template>
    <div class="w-full h-full  flex gap-4 justify-center">
<changepassword/>
<n-card title="Rasmni o'zgartirish" style="width: 400px" class="flex justify-center items-center">  
<img src="https://s0.rbk.ru/v6_top_pics/resized/1200xH/media/img/4/36/756310850118364.jpg" class="w-[130px] h-[130px] rounded-[65px] object-center" alt="">
<font-awesome-icon :icon="['fas', 'camera-rotate']" />
</n-card>
    </div>
</template>

<script setup>
import changepassword from "./component/changepassword.vue"
import {Admin} from "../../../Pinia";
const admin = Admin();
console.log(admin.profile_url);

</script>

<style lang="scss" scoped>

</style>