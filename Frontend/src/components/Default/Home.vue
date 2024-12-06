<template>
    <div class="h-[70px] shadow-md text-center  p-3 bg-orange-50 sticky top-0 w-[100vw] flex items-center justify-between">
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
    <div class="max-w-[1300px] mx-auto h-full">




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


        <div class="w-full flex  flex-wrap p-3 justify-center">

            <div  class="w-[400px] flex flex-col items-center">
                <img  src="../../../public/2takeout_and_delivery.webp" alt="">
            <span class="mt-1 text-[24px] font-semibold text-orange-700">
                Restaurant Websites
            </span>

            <span class="text-center w-[70%] text-gray-700 text-[16px] mt-3">
                Launch a branded online experience built specifically to help your restaurant stand out and make more money.
            </span>
                </div>





                <div  class="w-[400px] flex flex-col items-center">
                <img  src="../../../public/3digital_waitlist.webp" alt="">
            <span class="mt-1 text-[24px] font-semibold text-orange-700">
                Takeout & Delivery
            </span>

            <span class="text-center w-[70%] text-gray-700 text-[16px] mt-3">
                Launch a branded online experience built specifically to help your restaurant stand out and make more money.
            </span>
                </div>







                <div  class="w-[400px] flex flex-col items-center">
                <img  src="../../../public/4online_catering.webp" alt="">
            <span class="mt-1 text-[24px] font-semibold text-orange-700">
                Digital Waitlist
            </span>

            <span class="text-center w-[70%] text-gray-700 text-[16px] mt-3">
                Launch a branded online experience built specifically to help your restaurant stand out and make more money.
            </span>
                </div>





                <div  class="w-[400px] flex flex-col items-center">
                <img  src="../../../public/5events_management.webp" alt="">
            <span class="mt-1 text-[24px] font-semibold text-orange-700">
                Online Catering
            </span>

            <span class="text-center w-[70%] text-gray-700 text-[16px] mt-3">
                Launch a branded online experience built specifically to help your restaurant stand out and make more money.
            </span>
                </div>




                <div  class="w-[400px] flex flex-col items-center">
                <img  src="../../../public/6reservations.webp" alt="">
            <span class="mt-1 text-[24px] font-semibold text-orange-700">
                Events Management
            </span>

            <span class="text-center w-[70%] text-gray-700 text-[16px] mt-3">
                Launch a branded online experience built specifically to help your restaurant stand out and make more money.
            </span>
                </div>



                <div  class="w-[400px] flex flex-col items-center">
                <img  src="../../../public/7ecommerce_stores.webp" alt="">
            <span class="mt-1 text-[24px] font-semibold text-orange-700">
                Reservations
            </span>

            <span class="text-center w-[70%] text-gray-700 text-[16px] mt-3">
                Launch a branded online experience built specifically to help your restaurant stand out and make more money.
            </span>
                </div>



                <div  class="w-[400px] flex flex-col items-center">
                <img  src="../../../public/8gift_cards.webp" alt="">
            <span class="mt-1 text-[24px] font-semibold text-orange-700">
                eCommerce Stores
            </span>

            <span class="text-center w-[70%] text-gray-700 text-[16px] mt-3">
                Launch a branded online experience built specifically to help your restaurant stand out and make more money.
            </span>
                </div>


                <div  class="w-[400px] flex flex-col items-center">
                <img  src="../../../public/9qr_code.webp" alt="">
            <span class="mt-1 text-[24px] font-semibold text-orange-700">
                Gift Cards
            </span>

            <span class="text-center w-[70%] text-gray-700 text-[16px] mt-3">
                Launch a branded online experience built specifically to help your restaurant stand out and make more money.
            </span>
                </div>


                <div  class="w-[400px] flex flex-col items-center">
                <img  src="../../../public/1restaurant_websites__2_.webp" alt="">
            <span class="mt-1 text-[24px] font-semibold text-orange-700">
                QR Code Order & Pay
            </span>

            <span class="text-center w-[70%] text-gray-700 text-[16px] mt-3">
                Launch a branded online experience built specifically to help your restaurant stand out and make more money.
            </span>
                </div>


                <div class="mx-auto p-7">
                    <img src="../../../public/homepage_testimonial_fini.webp" alt="">
                </div>




                <div class="mx-auto p-7">
                    <img src="../../../public/homepage_testimonial_little_tart.webp" alt="">
                </div>
                
        </div>


    </div>
        <footer class="w-full h-[300px] bg-pink-100 flex justify-around gap-4 pt-4">
            <div class=" border-r border-r-[1px] pe-[70px] flex items-start pt-3 pb-2 flex-col justify-center border-gray-300" >
                <span class="font-bold mb-2 block text-[18px] text-gray-800">
                    BentoBox
                </span>
                <ul class="gap-4 flex flex-col text-gray-500 font-bold">
                    <li>Life at Bentobox</li>
                    <li>Careers</li>
                    <li>Customer Stories</li>
                    <li>Platform Status</li>
                    <li>DEI</li>
                </ul>
            </div>



            <div class=" border-r border-r-[1px] pe-[70px] flex items-start pt-3 pb-2 flex-col justify-center border-gray-300" >
                <span class="font-bold mb-2 block text-[18px] text-gray-800">
                    Contact





                </span>
                <ul class="gap-4 flex flex-col text-gray-500 font-bold">
                    <li>Sign Up</li>
                    <li>Call Now</li>
                    <li>Watch The Demo</li>
                    <li>Refer a Restaurant</li>
                    <li>Referral Terms</li>
                </ul>
            </div>





        </footer>


</template>

<script setup>
import { ref } from "vue"
import logo from "../../importComponets/logo.vue"
</script>

<style lang="scss" scoped></style>