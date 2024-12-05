<template>
    <div class="w-full h-full">
        <div class="h-[70px] shadow-md text-center  bg-orange-50 sticky top-0 w-full flex items-center justify-between">
            <router-link to="/">
                <logo />
            </router-link>
            <div class="flex justify-between items-center gap-4">
                <div class="font-semibold"
                    v-for="(i, j) in [{ name: 'Why Bento' }, { name: 'Products' }, { name: 'Restaurant Type' }, { name: 'Pricing' }, { name: 'Resources' }]"
                    :key="j">

                    {{ i.name }}
                </div>
            </div>


            <div class="flex justify-around items-center gap-3 pe-3">
                <span> +1 (877) 353-2447</span>
                <button
                    class="bg-[#14838a] h-[50px] ps-3 pe-3 flex rounded-[30px] text-white items-center justify-center">
                    Get Started
                </button>
            </div>
        </div>




        <div class="ps-[100px] pe-[100px] mx-auto  items-center flex bg-orange-50 pb-3">

            <div class="flex gap-1 flex-col">
                <div class="text-[#f15541] text-[48px] font-bold">
                    Show your diners smarter hospitality
                </div>
                <div class="font-semibold">
                    Put diners at the center of how your restaurant operates to create better experiences while growing
                    your business.
                </div>

                <button
                    class="bg-[#14838a] w-[130px] h-[50px] ps-3 pe-3 flex rounded-[30px] text-white items-center justify-center">
                    Get Started
                </button>
            </div>



            <div class="w-[900px] ">

                <img src="/homepage_hero_desktop_baker__1_.webp" alt="">

            </div>


        </div>







        <div class="ps-[100px] pe-[100px] gap-4  mx-auto mt-[0px] justify-between items-center flex pb-3">

            <div class="flex gap-1 flex-col max-w-[50%] items-start">
                <div class=" text-[59px] font-bold text-gray-800">
                    Show your diners smarter hospitality
                </div>
                <div class="text-[18px] text-justify text-gray-600 font-medium">
                    The BentoBox Marketing & Commerce Platform is an all-in-one restaurant commerce engine. With
                    Restaurant Websites, Takeout & Delivery, Events Management, Reservations, and more — all powered by
                    BentoCore at the heart of the platform — it helps restaurants boost profits, stand out from
                    competitors, operate efficiently, and keep diners coming back.
                </div>
                <div
                    class="text-[20px] flex items-center cursor-pointer border-b-2 border-transparent hover:border-b-[1px] duration-500 hover:border-[#f15541] gap-4 text-[#f15541] font-tiny">
                    <span>
                        Learn more

                    </span>
                    <font-awesome-icon :icon="['fas', 'right-long']" />
                </div>
            </div>



            <div class="w-[900px] pt-[140px] flex justify-center mx-auto">

                <img class="block w-[900px]" src="../../../public/platform_graphic__2_.webp" alt="">

            </div>
        </div>
        <div class="w-[100%] ps-6 pe-6">
            <div class="mx-auto text-gray-900 font-semibold  text-[40px] text-center w-[500px]">
                See how you can transform your business

            </div>
            <div class="w-full flex gap-10">
                <div class="flex  flex-col justify-center items-center p-4 w-[350px]  text-[20px]">
                    <img src="../../../public/Group_1454.svg" class="w-[119px] object-cover min-h-[180px] font-serif"
                        alt="">
                    <div class="text-center">
                        <p class="text-lg font-semibold">See up to</p>
                        <p class="text-4xl text-red-500 font-bold leading-none">40%</p>
                        <p class="text-lg font-medium">more web traffic</p>
                    </div>

                </div>





                <div class="flex  flex-col justify-center items-center p-4 w-[350px]  text-[20px]">
                    <img src="../../../public/group_1468__1_.svg"
                        class=" object-fill  w-[199px] min-h-[180px] font-serif" alt="">
                    <div class="text-center">
                        <p class="text-lg font-semibold">Generate</p>
                        <p class="text-4xl text-red-500 font-bold leading-none">50%</p>
                        <p class="text-lg font-medium">more in revenue

                        </p>
                    </div>

                </div>

                <div class="flex  flex-col justify-center items-center p-4 w-[350px]  text-[20px]">
                    <img src="../../../public/Group_1470.svg" class="w-[119px] object-cover min-h-[180px] font-serif"
                        alt="">
                    <div class="text-center">
                        <p class="text-lg font-semibold">Convert up to
                        </p>
                        <p class="text-4xl text-red-500 font-bold leading-none">40%</p>
                        <p class="text-lg font-medium">of site visitors</p>
                    </div>

                </div>


                <div class="flex  flex-col justify-center items-center p-4 w-[350px]  text-[20px]">
                    <img src="../../../public/Group_1471.svg" class="w-[119px] object-cover min-h-[180px] font-serif"
                        alt="">
                    <div class="text-center">
                        <p class="text-lg font-semibold">Drive up to
                        </p>
                        <p class="text-4xl text-red-500 font-bold leading-none">28%</p>
                        <p class="text-lg font-medium">more mobile visitors

                        </p>
                    </div>

                </div>





            </div>
        </div>




        <div class="w-full">
            <div class="text-center w-full font-bold text-gray-800 text-[30px]">
                Meet the modules
            </div>


            <div class="text-center text-gray-700 mx-auto text-[19px] font-sans font-semibold w-[75%]">
                The Marketing & Commerce Platform includes a full suite of diner-facing modules that restaurants can
                activate based on what their diners need. Even better? The modules capture valuable diner data, which
                restaurants can then use to deliver even better hospitality.
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import logo from "../../importComponets/logo.vue"
</script>

<style lang="scss" scoped></style>