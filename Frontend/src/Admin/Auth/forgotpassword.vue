<template>
    <div>
        <n-message-provider :placement="'bottom-right'">

            <div v-if="isLoading" class="fixed w-[100vw] h-[100vh] flex items-center bg-slate-900 justify-center ">
                <img src="/infinite-spinner.svg" class="w-[200px]" alt="">
            </div>
            <div v-else
                class="w-[100vw] select-none -z-10 body flex justify-center form h-[100vh] bg-cover bg-origin-padding bg-no-repeat object-center">
                <div class="w-[600px] rounded-lg  pb-[50px] bg-white">
                    <img src="../../../public//fork-and-knife-icon-vector-18744737.jpg"
                        class="w-[80px] mx-auto object-cover">
                    <div class="text-center mt-5 font-bold  text-[20px]">Emailni kiriting</div>
                    <div class="w-[70%] flex justify-center flex-wrap mx-auto mt-5">
                        <n-input type="email" v-model:value="email" :disabled="loading" size="large"
                            placeholder="salom@gmail.com" />

                        <div class="w-full flex justify-center pt-4">
                            <n-button @click="forgot" type="success" :disabled="loading" class="w-full">
                                <span v-if="!loading">
                                    {{ content }}
                                </span>
                                <svg v-else xmlns='http://www.w3.org/2000/svg' class="w-[20px] h-[20px]"
                                    viewBox='0 0 200 200'>
                                    <circle fill='#FFFFFF' stroke='#FFFFFF' stroke-width='15' r='15' cx='40' cy='65'>
                                        <animate attributeName='cy' calcMode='spline' dur='2' values='65;135;65;'
                                            keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='-.4'>
                                        </animate>
                                    </circle>
                                    <circle fill='#FFFFFF' stroke='#FFFFFF' stroke-width='15' r='15' cx='100' cy='65'>
                                        <animate attributeName='cy' calcMode='spline' dur='2' values='65;135;65;'
                                            keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='-.2'>
                                        </animate>
                                    </circle>
                                    <circle fill='#FFFFFF' stroke='#FFFFFF' stroke-width='15' r='15' cx='160' cy='65'>
                                        <animate attributeName='cy' calcMode='spline' dur='2' values='65;135;65;'
                                            keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='0'>
                                        </animate>
                                    </circle>
                                </svg>

                            </n-button>
                        </div>

                    </div>
                </div>
            </div>
        </n-message-provider>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMessage } from 'naive-ui';
const message = useMessage();
const isLoading = ref(true);
const content = ref('Parolni tiklash');
const loading = ref(false);
onMounted(() => {
    isLoading.value = false;
});
const email = ref("");
const forgot = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        message.error('Iltimos, to\'g\'ri email kiriting');
        return;
    }
    try {
        loading.value = true;
        const response = await fetch(`${window.url}/admin/forgotpassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.value,
            }),
        });
        if (response.status == 404) {
            loading.value = false;

            message.info("Email topilmadi");
            email.value = '';
            return;
        }
        if (response.status == 200) {
            loading.value = false;

            message.info("Parolni tiklash uchun elektron pochta muvaffaqiyatli yuborildi ");
            email.value = '';
            return;
        }
    } catch (error) {
        console.log(error);
        loading.value = false;
        message.error("Tizimda muommo chiqdi")
    }
};
</script>

<style lang="scss" scoped>
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