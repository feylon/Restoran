<template>
  <b>Kategoriyalar</b>
  <div class="mt-3"></div>
  <div class="w-[90%] mx-auto">
    <n-table :single-line="false">
      <thead>
        <tr>
          <th class="flex justify-center">№</th>
          <th><span class="text-center block min-w-full">O'zbek</span></th>
          <th><span class="text-center block min-w-full">Крилл</span></th>

          <th><span class="text-center block min-w-full">Русский</span></th>

          <th><span class="text-center block min-w-full">English</span></th>
          <th><span class="text-center block min-w-full">Holati</span></th>

          <th>
            <span class="text-center block min-w-full">Tahrir</span>

          </th>
        </tr>
      </thead>
      <tbody v-if="data.length > 0">
        <tr v-for="(item, index) in data" :key="item.id">
          <td class="text-center min-w-full font">{{ (++index) + (page - 1) * 10 }}</td>
          <td class="text-center min-w-full font">{{ item.name_uz }}</td>
          <td class="text-center min-w-full font">{{ item.name_kril }}</td>
          <td class="text-center min-w-full  font">{{ item.name_rus }}</td>
          <td class="text-center min-w-full font">{{ item.name_en }}</td>
          <td class="text-center min-w-full font"> <n-switch disabled v-model:value="item.status">
              <template #checked>
                Aktiv
              </template>
              <template #unchecked>
                Aktiv emas
              </template>
            </n-switch></td>

          <td class="flex items-center justify-between gap-3 min-w-full">
            <router-link :to="`/admin/category/edit/${item.id}`">

              <n-popover trigger="hover">
                <template #trigger>
                  <n-button strong secondary circle type="success">

                    <template #icon>
                      <font-awesome-icon :icon="['fas', 'pen']" />
                    </template>
                  </n-button>

                </template>
                <span>Tahrirlash</span>
              </n-popover></router-link>
            <n-popover trigger="hover">
              <template #trigger>
                <n-button @click=upload(item.id) strong secondary circle type="info">
                  <template #icon>
                    <font-awesome-icon :icon="['fas', 'cloud-arrow-up']" />

                  </template>
                </n-button></template>
              <span>Rasmni o'zgartirish</span>
            </n-popover>


            <n-popover trigger="hover">
              <template #trigger>
                <n-button
                  @click="showpic = true; item.image_url ? modalpic = url + item.image_url : modalpic = './404.webp'"
                  strong secondary circle :type="item.image_url ? 'success' : 'error'">

                  <template #icon>
                    <font-awesome-icon v-if="item.image_url" :icon="['fas', 'magnifying-glass-plus']" />
                    <font-awesome-icon v-else :icon="['fas', 'triangle-exclamation']" />
                  </template>
                </n-button>

              </template>

              <span v-if="item.image_url">Rasmni ko'rish</span>
              <div class=" h-full w-full text-red-800 font-bold" v-else> Rasm yuklanmagan</div>
            </n-popover>
          </td>
        </tr>

      </tbody>
      <tbody v-else>
        <tr>
          <th colspan="7">
            <div disabled
              class="items-center gap-5 h-[50px] select-none cursor-not-allowed w-full opacity-90 flex justify-center">
              <font-awesome-icon class="text-[20px]" :icon="['fas', 'triangle-exclamation']"></font-awesome-icon>
              <i>Ma'lumot mavjud emas</i>

            </div>

          </th>
        </tr>
      </tbody>
    </n-table>
    <div class="mx-auto mt-5 min-w-full flex justify-center">
      <n-pagination v-model:page="page" :page-count="count" />
    </div>
    <div class="w-[100] flex justify-end">
      <n-button @click="router.push('/admin/category/add')" type="success">Kategoriya qo'shish</n-button>
    </div>
  </div>

  <!-- modal -->
  <!-- Show Pictures -->
  <n-modal v-model:show="showpic" class="custom-card" :style="{ width: '600px' }" :bordered="false" size="huge"
    :segmented="{ content: 'soft', footer: 'soft' }">
    <img :src="modalpic" class="w-[400px] rounded-lg object-fill mx-auto h-[400px]" :alt="modalpic">
  </n-modal>
  <!-- Upload pictures -->
  <n-modal title="Rasmni yuklash" v-model:show="uploadpic" class="custom-card" :style="{ width: '600px' }" preset="card"
    :bordered="false" size="huge" :segmented="{ content: 'soft', footer: 'soft' }">
    <template #header-extra>

    </template>
    <input @change="uploadfile" type="file" id="category_pic"
      class="w-[300px] h-[50px] border-2 border-gray-300 rounded-lg hidden" />
    <div v-if="!uploaded" class="flex w-full justify-center items-center">
      <label @click="file = null; uploadpicbase = ''" for="category_pic" class=" inline-block cursor-pointer">
        <div
          class="flex flex-col items-center text-green-700 select-none justify-center w-[300px] h-[300px] border-2 border-dashed border-gray-300 rounded-lg">
          <font-awesome-icon class="text-[70px]  animate-bounce" :icon="['fas', 'cloud-arrow-up']" />
          Yuklash uchun bosing
        </div>
      </label>
    </div>
    <div v-else class="flex w-full justify-center items-center">
      <img :src="uploadpicbase" class="w-[300px] h-[300px] rounded-lg shadow-lg shadow-[#696767]" alt="">
    </div>
    <template #footer>
      <div class="w-full justify-end flex gap-3">
        <n-button @click="uploadpic = false" type="error">Bekor qilish</n-button>
        <n-button @click="uploadfileSend(file, category_id)" type="success">Yuklash</n-button>

      </div>
    </template>
  </n-modal>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router';
import { useMessage } from 'naive-ui';
import url from '../../../url';
const router = useRouter();
const message = useMessage();
const data = ref([]);
const page = ref(localStorage.getItem("page_kategoriyalar") ? parseInt(localStorage.getItem("page_kategoriyalar")) : 1);
const showpic = ref(false);
const modalpic = ref("");
const count = ref(0);
const uploadpic = ref(false);
let backend = async function () {
  data.value = data.value.slice(0, data.value.length);
  try {
    let res = await fetchAdmin(`admin/food_category/get?page=${page.value}&size=10&order_type=name_uz&order=az`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }

    }, router);

    if (res.status == 200) {
      let backend = await res.json();
      data.value = backend;
      if (!(backend.length === 0))
        count.value = Number(((backend[0].all / 10) + 1).toFixed(0));
    }
  } catch (error) {
    console.log(error)
  }
}
onMounted(async () => {

  backend()
});

watch(page, async () => {
  backend()
});

const upload = async (id) => {

  category_id.value = id;
  uploadpic.value = true;
};


// Upload file
const uploaded = ref(false);
const category_id = ref("")
let file = ref(null);
const uploadpicbase = ref("")
const uploadfile = (e) => {
  if (e.target.files[0]) {
    if (e.target.files[0].size > 4000000) {
      message.error("Rasm hajmi 4mb dan oshmasligi kerak");
      return;
    }
    if (e.target.files[0].type !== "image/jpeg" && e.target.files[0].type !== "image/png") {
      message.error("Rasm formati faqatgina jpg yoki png bo'lishi kerak");
      return;
    }
    // file.value = e.target.files[0];
    uploaded.value = true;
    file.value = e.target.files[0];
    if (file.value) {
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadpicbase.value = e.target.result;

      };
      reader.readAsDataURL(file.value);

    }
  }
}
const uploadfileSend = async function (file, id) {
  const formData = new FormData();
  formData.append("photo", file);
  // return;
  let res = await fetchAdmin(`admin/food_category/upload_pic/${id}`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    },
    body: formData


  });
  if (res.status === 200) {
    message.success("Rasm muvaffaqiyatli yuklandi");
    uploadpic.value = false;
    uploaded.value = false;
    backend();
    return;
  }
  if (res.status === 400) {
    res = await res.json();
  }
  else {
    uploadpic.value = false;
    message.error("Rasm yuklanmadi");
  }

}
watch(uploadpic, () => {
  if (!uploadpic) {
    uploaded.value = false;
    uploadpicbase.value = "";
    file.value = null;
    category_id.value = "";
  }
});
watch(page, (newval, oldval) => {
  localStorage.setItem("page_kategoriyalar", `${newval}`)
})
</script>
