<template>
    <div v-if="isLoading" class="fixed  w-[100vw] h-[100vh] flex items-center bg-slate-900 justify-center ">
        <img src="/infinite-spinner.svg" class="w-[200px]" alt="">
    </div>
    <div v-else class="w-[100vw] overflow-hidden bg-[#F9FAFB] h-[100vh] min-h-[100vh]">
<div class="w-full items-center h-[60px]  flex border-transparent shadow-sm  bg-white">
    
<div class="h-full flex min-w-[300px] border-e-[1px] justify-center pe-10 gap-4 items-center border-b-[1px]">
<img src="/fork-and-knife-icon-vector-18744737.jpg" class="w-[50px] rounded-[50%] object-fill" alt="">
<h2 class="text-[#313435] text-[18px] font-bold" >
    Adminator
</h2>
</div>

<div class="flex items-center text-[#72777a] ps-2  w-[calc(100%-300px)]">
    <font-awesome-icon class="text-[15px] cursor-pointer hover:text-[#252525] duration-500" :icon="['fas', 'bars']" />

    <div>
    </div>
</div>

<div class="flex gap-4 items-center pe-3 ">

<div class="flex gap-6 items-center pe-3 ">
    
  


<n-popover trigger="hover">
    <template #trigger>
        <n-badge   type="success" :value="value" :max="15">
            <font-awesome-icon  class="text-[18px] text-[#313435]":icon="['far', 'envelope']" />

</n-badge>
    </template>
    <span>Sizda {{ value }} ta xabar mavjud</span>
  </n-popover>


<n-popover trigger="hover">
    <template #trigger>
        <n-badge   type="success" :value="value" :max="15">

<font-awesome-icon class="text-[18px] text-[#313435]":icon="['far', 'bell']" />
</n-badge>
    </template>
    <span>Sizda {{ value }} ta bildirishnoma mavjud</span>
  </n-popover>
</div>
<div class="border-l-[0 px] ps-5 flex items-center justify-center ">
  <n-dropdown trigger="hover" :options="options" @select="handleSelect">
    <div class="flex flex-col w-[90px] border-transparent border-s-2 h-[38%]  mt-1 items-center justify-center gap-1 cursor-pointer">
        <img src="/adminlogin back.jpg"  class="w-[35px] rounded-[50%] object-fill h-[35px]" alt="">
        <span class="text-[11px] text-center">
            Ergashev Jamshid
        </span>
    </div>
</n-dropdown>
</div>



</div>

</div>    

<div class="w-full  bg-none h-full flex ">
<div class="min-w-[300px] shadow-sm shadow-[#c0c3c9] flex pt-10 pb-[100px] overflow-x-auto flex-col items-center border-transparent border-e-[1px] border-[#e0e6e7] h-full bg-white">

        <routerLink v-for="(i, j) in menu" :key="j" :to="i.to"  class=" w-[280px] hover:bg-slate-100 -300 rounded-md mb-3 ps-4 flex items-center justify-start gap-5 text-[15px] p-3 ">
            <font-awesome-icon class="text-[18px]" :icon="i.font" :class="i.class" />
            <span class="text-gray-500 font-semibold">
                {{i.content}}
            </span> 
        </routerLink>
</div>
<div class="w-full selection:bg-blue-300 min-w-[calc(100%-299px)] p-3 h-full min-h-full overflow-x-auto mb-10 pb-[100px]">
<router-view>

</router-view>
</div>

</div>


</div>
</template>

<script setup>
import { ref } from 'vue';
import { NAvatar, NText, useMessage } from "naive-ui";
import { onMounted, h } from "vue";
const message = useMessage();

const isLoading = ref(true);
const value = ref(10);



const menu = ref(
    [
        {to : "/admin", font : ['fas', 'house'], class : 'text-blue-600', content : 'Dashtboard'},
        {to : "/admin", font : ['fa-regular', 'fa-envelope'], class : 'text-yellow-600', content : 'Messages'},
    
    ]


);
function renderCustomHeader() {
  return h(
    "div",
    {
      style: "display: flex; align-items: center; padding: 8px 12px;"
    },
    [
      h(NAvatar, {
        round: true,
        class : "mx-auto",
        src: "https://07akioni.oss-cn-beijing.aliyuncs.com/demo1.JPG"
      }),
      h("div", null, [
        h("div", null, [
          h("span", {class:"font-bold text-[10px] ms-3"},  { default: () => "A worker at Hangzhou" })
        ]),
        h("div",
          {class : "text-[10px] text-center"}, {default : ()=>"Admin"}
        )
      ])
    ]
  );
}

const options = ref( [
        {
          key: "header",
          type: "render",
          render: renderCustomHeader,
          
        },

        {
          key: "header-divider1",
          type: "render",
          props: {
            onClick: () => {
                console.log(1)
            }
        },
        render: () => {
            return h("div", { class: "ps-4 duration-700 flex items-center hover:bg-blue-200 cursor-pointer flex border-t-[1px] border-solid" }, [
                h("span",

                    { innerHTML: `<span class="text-[20px] text-blue-800"><i class="fas fa-house"></i></span>` },
                    { class: "" }
                ),
                h("div",
                    { class: "text-red-800 ps-3" },
                    { default: () => "Bosh sahifa" }
                )
            ])
        },

        },

        {
          key: "header-divider",
          type: "render",
          props: {
            onClick: () => {
                console.log(1)
            }
        },
        render: () => {
            return h("div", { class: "ps-4 duration-700 flex items-center hover:bg-red-200 cursor-pointer flex border-t-[1px] border-solid" }, [
                h("span",

                    { innerHTML: `<span class="text-[20px] text-red-800"><i class="fas fa-arrow-right-from-bracket"></i></span>` },
                    { class: "" }
                ),
                h("div",
                    { class: "text-red-800 ps-3" },
                    { default: () => "Tizimdan chiqish" }
                )
            ])
        },

        },

        
        // {
        //   label: "lpsum1",
        //   key: "stmt1"
        // },
        // {
        //   label: "lpsum2",
        //   key: "stmt2"
        // },
        // {
        //   label: "lpsum3",
        //   key: "stmt3"
        // }
      ]);

      onMounted(()=>{


setTimeout(() => {
isLoading.value = false;
}, 500); 
});

   function   handleSelect(key) {
        message.info(String(key));
      }      


</script>

<style lang="scss" scoped>

</style>