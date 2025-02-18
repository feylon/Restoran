<template>
  <div v-if="isLoading" class="fixed  w-[100vw] h-[100vh] flex items-center bg-slate-900 justify-center ">
    <img src="/infinite-spinner.svg" class="w-[200px]" alt="">
  </div>
  <div v-else class="w-[100vw] overflow-hidden bg-[#F9FAFB] h-[100vh] min-h-[100vh]">
    <div
      class="w-full items-center  h-[60px] shadow-slate-900 z-10 border-b-[1px] border-solid flex border-[#1d2b4d] shadow-sm !text-white  bg-[#0F172A]">

      <div :class="collapsed ? 'min-w-[61px]' : 'min-w-[299px]'"
        class="h-full bg-[#0F172A] flex  border-e-[1px] justify-center moving  gap-4 items-center border-[#1d2b4d] border-b-[1px]">
        <img src="/fork-and-knife-icon-vector-18744737.jpg" class="w-[35px] h-[35px] rounded-[50%] object-fill" alt="">
        <h2 class="text-[#ffffff] hidden text-[18px] font-bold">
          Admin
        </h2>
      </div>

      <div @click="collapsed = !collapsed"
        class="flex items-center text-white text-[#72777a] ps-2  w-[calc(100%-300px)]">
        <font-awesome-icon class="text-[15px] cursor-pointer hover:text-[#b5bcc0] duration-500"
          :icon="['fas', 'bars']" />

        <div>
        </div>
      </div>

      <div class="flex border-l-[1px] border-r-[1px]  border-[#1d2b4d] gap-4 items-center pe-3 ">

        <div class="flex  gap-6 items-center pe-3 ">

          <n-popover trigger="hover">
            <template #trigger>
              <div class=" w-[130px] cursor-pointer ps-5 flex items-center justify-center ">
                <div class="flex gap-2 items-center pe-3 h-[100%]">

                  <img :src="wh" class="w-[50px]" alt="">
                  <span class="font-bold select-none"> <span>{{ temp }}&deg;C</span></span>
                </div>
              </div>
            </template>
            <div class="flex select-none gap-2 items-center pe-3 h-[100%]">
              <img :src="wh" class="w-[50px]" alt="">
              <div class="flex gap-1 flex-col items-center justify-center">
                <div class="font-bold select-none"> <span>{{ temp }}&deg;C</span></div>
                <span class="capitalize ">{{ condition }}</span>
              </div>
            </div>
            <!-- <span class="font-bold">{{condition}}, {{ temp }} &deg;C</span> -->
          </n-popover>
          <n-popover trigger="hover">
            <template #trigger>
              <n-badge type="success" :value="value" :max="15">
                <font-awesome-icon class="text-[18px] text-white text-[#313435]" :icon="['far', 'envelope']" />

              </n-badge>
            </template>
            <span>Sizda {{ value }} ta xabar mavjud</span>
          </n-popover>


          <n-popover trigger="hover">
            <template #trigger>
              <n-badge type="success" :value="value" :max="15">

                <font-awesome-icon class="text-[18px] text-white text-[#313435]" :icon="['far', 'bell']" />
              </n-badge>
            </template>
            <span>Sizda {{ value }} ta bildirishnoma mavjud</span>
          </n-popover>
        </div>
        <div class="border-l-[1px] border-[#1d2b4d]
         ps-5 flex items-center justify-center ">
          <n-dropdown trigger="hover" :options="options" @select="handleSelect">
            <div
              class="flex flex-col w-[90px] border-transparent border-s-2 h-[38%]  mt-1 items-center justify-center gap-1 cursor-pointer">
              <img :src="`${url}${data.profile_url.replace('/uploads', '')}`"
                class="w-[35px] rounded-[50%] object-fill h-[35px]" alt="">
              <span class="text-[11px] text-center">
                {{ `${data.lastname} ${data.firstname}` }}
              </span>
            </div>
          </n-dropdown>
        </div>



      </div>

    </div>

    <div class="w-full min-h-full h-full">
      <!--  -->

      <n-space class="h-[800px]  min-h-full" vertical>
        <n-layout has-sider class="h-full shadow-[#c0c3c9] text-white min-h-full">
          <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="300" :collapsed="collapsed"
            show-trigger @collapse="collapsed = true" @expand="collapsed = false"
            class="h-full bg-slate-900 shadow-[#c0c3c9] text-white min-h-full">
            <!-- <n-menu
          :inverted = "inverted"
          class="h-[calc(100vh-60px)] text-red-500 min-h-full"
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
          :render-label="renderMenuLabel"
          :render-icon="renderMenuIcon"
          :expand-icon="expandIcon"
        /> -->
            <n-menu :inverted="inverted" class="h-[calc(100vh-60px)] text-red-500 min-h-full" :options="menuOptions"
              @update:value="handleUpdateValue" />

          </n-layout-sider>
          <n-layout class="overflow-auto p-3 h-[calc(100vh-60px)]">
            <span>
              <router-view >
  
</router-view>
</span>

          </n-layout>
        </n-layout>
      </n-space>
      <!--  -->
    </div>

  </div>
</template>

<script setup>
import url from "../../url";
import { NAvatar, useDialog, NText, useMessage } from "naive-ui";
import { onMounted, h } from "vue";
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";
import { Admin } from "../../Pinia";
import { fetchAdmin } from "../../http";
// import { BookmarkOutline, CaretDownOutline } from "@vicons/ionicons5";
import { ref } from "vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { watch } from "vue";
const admin = Admin();
const message = useMessage();
const wh = ref("");
const condition = ref("Loading...");
const temp = ref(25)
const router = useRouter();
const isLoading = ref(true);
const value = ref(10);
const data = ref({
  name: "Salom",
  login: "salom1409",
  lastname: "Doe",
  firstname: "John",
  birthday: "1989-12-31T18:00:00.000Z",
  admin_name: "main",
  permission_id: "1",
  email: "user@example.com",
  profile_url: "/uploads/profile_pics/f54efbfefc3bc732793e8a4c16425f40.jpg"
});

let inverted = ref(true);
let dialog = useDialog();
function renderCustomHeader() {
  return h(
    "div",
    {
      style: "display: flex; align-items: center;width:180px; padding: 8px 12px;"
    },
    [
      h(NAvatar, {
        round: true,
        class: "mx-auto",
        style: "width:40px; height:40px;",
        src: `${url}${data.value.profile_url.replace('/uploads', '')}`
      }),
      h("div", null, [
        h("div", null, [
          h("span", { class: "font-bold text-[11px] ms-3 me-3" }, { default: () => `${data.value.lastname} ${data.value.firstname}` })
        ]),
        h("div",
          { class: "text-[10px] text-center" }, { default: () => data.value.admin_name }
        )
      ])
    ]
  );
}

const options = ref([
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
        router.push('/admin/');
      }
    },
    render: () => {
      return h("div", { class: "ps-4 duration-700 flex items-center hover:bg-green-300 cursor-pointer flex border-t-[1px] border-solid" }, [
        h("span",

          { innerHTML: `<span class="text-[20px] text-[#0F172A]"><i class="fas fa-house"></i></span>` },
          { class: "" }
        ),
        h("div",
          { class: "text-[#0F1725] font-semibold ps-3" },
          { default: () => "Bosh sahifa" }
        )
      ])
    },

  },

  {
    key: "header-divider1",
    type: "render",
    props: {
      onClick: () => {
        return router.push('/admin/security');
      }
    },
    render: () => {
      return h("div", { class: "ps-4 duration-700 flex items-center hover:bg-green-300 cursor-pointer flex border-t-[1px] border-solid" }, [
        h("span",

          { innerHTML: `<span class="text-[20px] text-[#0F1725]"><i class="fas fa-lock"></i></span>` },
          { class: "" }
        ),
        h("div",
          { class: "text-[#0F1725] font-semibold ps-3 pe-3" },
          { default: () => "Maxfiylik & xavfsizlik" }
        )
      ])
    },

  },

  // Exit

  {
    key: "wye8fgujsdfn",
    type: "render",
    props: {
      onClick: () => {
        localStorage.removeItem('token');
        router.push('/admin/login');
        return message.success("Siz tizimdan chiqdingiz");
      }
    },
    render: () => {
      return h("div", { class: "ps-4 duration-700 flex items-center hover:bg-red-200 cursor-pointer flex border-t-[1px] border-solid" }, [
        h("span",

          { innerHTML: `<span class="text-[20px] text-red-800"><i class="fas fa-arrow-right-from-bracket"></i></span>` },
          { class: "" }
        ),
        h("div",
          { class: "text-red-800 font-semibold ps-3" },
          { default: () => "Tizimdan chiqish" },
        )
      ])
    },

  },

]);

onMounted(async () => {
  obhavo();
  try {
    let backend = await fetchAdmin(`admin/profile`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    }, router);
    if (backend.status == 200) {
      backend = await backend.json();
      console.log(backend);
      data.value = backend;
      console.log(admin.login)
      admin.name = backend.name;
      admin.login = backend.login;
      admin.lastname = backend.lastname;
      admin.firstname = backend.firstname;
      admin.birthday = backend.birthday;
      admin.admin_name = backend.admin_name;
      admin.permission_id = backend.permission_id;
      admin.email = backend.email;
      admin.profile_url = backend.profile_url;

    }

  } catch (error) {
    message.error(error.message);
    return router.push('/admin/login');
  }

  isLoading.value = false;




});

function handleSelect(key) {
  message.info(String(key));
}

const collapsed = ref(eval(localStorage.collapsedAdmin == null   ?  true : localStorage.getItem("collapsedAdmin")));
let bool =  Boolean(localStorage.collapsedAdmin == null   ?  true : localStorage.getItem("collapsedAdmin"));
console.log(bool)
// collapsed.value = localStorage.collapsedAdmin == null   ?  true : localStorage.getItem("collapsedAdmin");
watch(collapsed, (newval, oldval)=>{
  console.log(newval);
  localStorage.setItem("collapsedAdmin", newval)
});

const menuOptions = ref([


  {
    label: () => h(
      RouterLink,
      {
        to: "/admin"
      },
      { default: () => "Bosh sahifa" }

    ),
    key: "hear-the-wind-sing",
    icon: () => h(FontAwesomeIcon, { icon: ['fas', 'house'] })
  },

  {
    label: "Oziq ovqatlar",
    key: "Dance Dance Dance",
    icon: () => h(FontAwesomeIcon, { icon: ['fas', 'utensils'] }),
    children: [
      {
        type: "group",
        label: "Bo'limlar",
        key: "people",
        children: [
        {
    label: () => h(
      RouterLink,
      {
        to: "/admin/category"
      },
      { default: () => "Kategoriya" }

    ),
    key: "admin-food",
    icon: () => h(FontAwesomeIcon, { icon: ['fas', 'list-check'] })
  },
  {
    label: () => h(
      RouterLink,
      {
        to: "/admin/food"
      },
      { default: () => "Taomlar" }

    ),
    key: "admin-category",
    icon: () => h(FontAwesomeIcon, { icon: ['fas', 'hamburger'] })
  }
        ]
      },
     
      
      
    ]
  },
  {
    label: () => h(
      RouterLink,
      {
        to: "/"
      },
      { default: () => "Tizimdan chiqish" }
    ),
    key: "EXIT_system",
    icon: () => h(FontAwesomeIcon, { icon: ['fas', 'arrow-right-to-bracket'], class: "text-red-800  rotate-180" }),
    props: {

      onClick: () => {
        localStorage.removeItem('token');
        router.push('/admin/login');
        return message.success("Siz tizimdan chiqdingiz");
      },
      class: "hover:text-red-800"

    }

  },
]);
let handleUpdateValue = (value) => {
  console.log(value);
};

const obhavo = async function () {
  try {
    let backend = await fetchAdmin(`admin/wheather?city=samarkand`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    }, router);
    if (backend.status == 200) {
      backend = await backend.json();
      condition.value = backend.condition;
      wh.value = backend.iconUrl;
      temp.value = backend.temperature.toFixed(1);
    }

  } catch (error) {
  }

  isLoading.value = false;
}

</script>
<style scoped>
.moving {
  transition: all 0.8s ease;
  /* duration: 0.5s; */
}
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>