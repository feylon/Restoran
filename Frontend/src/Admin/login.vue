<template>
      <n-message-provider :placement="'bottom-right'">

    <div v-if="isLoading" class="fixed w-[100vw] h-[100vh] flex items-center bg-slate-900 justify-center ">
        <img src="/infinite-spinner.svg" class="w-[200px]" alt="">
    </div>
    <div v-else :class="form ? 'form' : ''"
        class="w-[100vw] select-none -z-10 body h-[100vh] bg-cover bg-origin-padding bg-no-repeat object-center">

        <div class="fixed text-white top-0 w-full flex justify-center" >
            <ul v-if="!form" class="flex justify-around gap-10 mt-4 ">
                <button  @click="form = true;" class="w-[100px] rounded cursor-pointer h-[30px] backdrop-blur-[1px]  flex justify-center items-center border border-white"> <span>Kirish</span></button>
                <button class="w-[100px] rounded cursor-pointer h-[30px] backdrop-blur-[1px]  flex justify-center items-center border border-white"> <span>Tiklash</span></button>
                
            </ul>
        </div>

        <form v-if="form"
            @submit.prevent="login"
            class="w-[400px]  sticky p-3 z-1  shadow-lg bg-white  shadow-black shadow-[10px] rounded-lg translate-x-8">
            <div>
                <img src="../../public//fork-and-knife-icon-vector-18744737.jpg" class="w-[80px] mx-auto object-cover">
            </div>
            <div  class="w-full flex justify-center ">
                <span class="enter text-black ">Kirish</span>

            </div>
            <div class="w-100 h-[250px] justify-evenly  items-center flex flex-col">
                <div class="flex justify-center items-center gap-4">
                    <label for="input-6" class="block text-sm mt-2 font-medium text-gray-700">Email</label>
                    <div class="relative mt-1">
                        <input type="text" id="input-6"
                            v-model="login1"
                            class="block w-[300px]  h-10 pl-8 pr-3 mt-1 text-sm text-gray-700 border focus:outline-none rounded shadow-sm focus:border-blue-500"
                            placeholder="jamshid14092002@gmail.com" />
                        <span class="absolute inset-y-0 left-0 flex items-center justify-center ml-2">
                            <font-awesome-icon class="text-blue-600 mt-1" :icon="['fas', 'user']" />                        </span>
                    </div>
                </div>



                <div class="flex mt-[-40px] justify-center items-center gap-4">
                    <label for="input-7" class="block text-sm mt-2 font-medium text-gray-700">Parol</label>
                    <div class="relative mt-1">
                        <input type="password" id="input-7"
                            v-model="password"
                            class="block w-[300px]  h-10 pl-8 pr-3 mt-1 text-sm text-gray-700 border focus:outline-none rounded shadow-sm focus:border-blue-500"
                            placeholder="parol1345" />
                        <span class="absolute inset-y-0 left-0 flex items-center justify-center ml-2"><font-awesome-icon class="text-blue-600 mt-1" :icon="['fas', 'lock']" />
                        </span>
                    </div>
                </div>
            </div>
            <routerLink to="/" class="w-full text-sm text-blue-600 mt-[-30px] flex justify-end">
                Parolni unitdingizmi ?
            </routerLink>
            <div class="w-full mt-4 mb-4">
                <button type="submit" 
                    :disabled="loading"
                    :class="loading ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed' : 'bg-blue-600'"
                    class="py-2  px-4 max-w-md  flex justify-center items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                    <font-awesome-icon v-if="!loading" :icon="['fas', 'circle-arrow-right']" />
                    <svg v-else xmlns='http://www.w3.org/2000/svg' class="w-[20px] h-[20px]" viewBox='0 0 200 200'><circle fill='#FFFFFF' stroke='#FFFFFF' stroke-width='15' r='15' cx='40' cy='65'><animate attributeName='cy' calcMode='spline' dur='2' values='65;135;65;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='-.4'></animate></circle><circle fill='#FFFFFF' stroke='#FFFFFF' stroke-width='15' r='15' cx='100' cy='65'><animate attributeName='cy' calcMode='spline' dur='2' values='65;135;65;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='-.2'></animate></circle><circle fill='#FFFFFF' stroke='#FFFFFF' stroke-width='15' r='15' cx='160' cy='65'><animate attributeName='cy' calcMode='spline' dur='2' values='65;135;65;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='0'></animate></circle></svg>
                </button>
            </div>

            <div class="absolute top-[10px] right-[30px]">
                <font-awesome-icon @click="form = false"
                    class="text-[15px] cursor-pointer hover:text-red-700 font-extrabold" :icon="['fas', 'x']" />
            </div>

        </form>
    </div></n-message-provider>
</template>

<script setup>
// import bouncing from "../../public/bouncing-circles.svg" 
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {useMessage} from "naive-ui";
const message = useMessage();
const form = ref(!false);
const router = useRouter();
const login1 = ref("");
const password = ref("");
const loading = ref(false);
const isLoading = ref(true);
onMounted(()=>{


    setTimeout(() => {
    isLoading.value = false;
  }, 500); 
    window.addEventListener("keydown", (e)=>{

        if(e.key == "Escape" && form.value)form.value = false;
    })
});


const login = async function(){
    loading.value = true;
try {
    
    let backend = await fetch(`${window.url}/admin/login`, {
    method : "POST",
    headers : {
        "Content-Type" : "application/json"
    },
    body : JSON.stringify({
        login : login1.value,
        password : password.value
    })});

    if(backend.status == 400){
    backend = await backend.json();
   
        loading.value = false;
        throw new Error("Email yoki parol noto'g'ri kiritildi");
    }
    if(backend.status == 200){
        let data = await backend.json();
        localStorage.setItem("token", data.token);
        router.push("/admin");
    }
} catch (error) {
    message.error(error.message);

}
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@200..800&family=Edu+AU+VIC+WA+NT+Arrows:wght@400..700&family=Playwrite+HR+Lijeva:wght@100..400&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');

.body {
    transition: background ease 0.5s;
    background:

        url('/adminlogin back.jpg');
    /* Ensure this path is correct */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100vw;
    overflow: hidden;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.enter {
    font-family: "Edu AU VIC WA NT Arrows", cursive;
    font-optical-sizing: auto;
    font-weight: 600;
    font-style: normal;
    font-size: 2rem;
}


.form {
    background:
        linear-gradient(rgba(0, 0, 0, 0.7),
            rgba(0, 0, 0, 0.7)),
        url('/adminlogin back.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background ease 0.5s;
}
</style>