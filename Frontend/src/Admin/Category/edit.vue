<template>
    <div>
        <div class="font-bold text-[23px] mb-4">
            <n-button @click="router.push('/admin/category');" title="Ortga qaytish" circle><font-awesome-icon
                    class="text-green-500" :icon="['fas', 'arrow-left']" /></n-button>
            Tahrirlash
        </div>

        <n-card class="w-[90%] mx-auto">
            <n-form ref="formRef" inline :label-width="130" class="w-full flex flex-col" :model="formValue"
                :rules="rules" :size="size">

                <div class="w-[70%] mx-auto justify-center  gap-3 flex">
                    <div class="w-[40%] flex flex-col gap-4 mx-auto">
                        <n-form-item label="Nomi (Uz)" path="name_uz">
                            <n-input v-model:value="formValue.name_uz" placeholder="Nomi (Uz)" />
                        </n-form-item>

                        <n-form-item label="Nomi (Kril)" path="name_kril">
                            <n-input v-model:value="formValue.name_kril" placeholder="Nomi (Kril)" />
                        </n-form-item>

                        <n-form-item label="Nomi (Rus)" path="name_rus">
                            <n-input v-model:value="formValue.name_rus" placeholder="Nomi (Rus)" />
                        </n-form-item>
                        <n-form-item label="Nomi (En)" path="name_en">
                            <n-input v-model:value="formValue.name_en" placeholder="Nomi (En)" />
                        </n-form-item>
                    </div>

                    <div class="w-[40%] mx-auto">


                        <n-form-item label="Holati" path="status">
                            <n-switch v-model:value="formValue.status" />
                        </n-form-item>
                        <n-form-item label="Tavsifi" path="description">
                            <n-input v-model:value="formValue.description" placeholder="Tavsif kiriting"
                                type="textarea" />
                        </n-form-item>

                    </div>
                </div>
                <div class="w-full flex justify-end items-center block">

                    <n-form-item>
                        <n-button type="primary" @click="handleValidateClick">
                            Saqlash
                        </n-button>
                    </n-form-item>
                </div>
            </n-form>
        </n-card>

    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchAdmin } from "../../../http";
import { useMessage } from "naive-ui";

const route = useRoute();
const router = useRouter();
const message = useMessage();
const formRef = ref(null);
const UUID = route.params.id
const size = ref("large");

const formValue = ref({
    name_uz: "",
    name_kril: "",
    name_rus: "",
    name_en: "",
    status: false,
    description: "",

});

const rules = {
    name_uz: {
        required: true,
        message: "Iltimos, nomini (Uz) kiriting",
        trigger: "blur"
    },
    name_kril: {
        required: true,
        message: "Iltimos, nomini (Kril) kiriting",
        trigger: "blur"
    },
    name_rus: {
        required: true,
        message: "Iltimos, nomini (Rus) kiriting",
        trigger: "blur"
    },
    name_en: {
        required: true,
        message: "Iltimos, nomini (En) kiriting",
        trigger: "blur"
    },
    // status: {
    //     required: false,
    //     message: "Iltimos, holatini tanlang",
    //     trigger: "change"
    // },
    description: {
        required: true,
        message: "Iltimos, tavsifni kiriting",
        trigger: "blur"
    }
};

const backend = async (id) => {
    try {
        let res = await fetchAdmin(`admin/food_category/get_by_id/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        if (res.status === 200) {
            res = await res.json();
            if (!res || Object.keys(res).length === 0) {
                message.warning("URL topilmadi");
                router.push("/admin/login");
                return null;
            }
            return res[0];
        } else {
            message.warning("URL topilmadi");
            router.push("/admin/login");
            return null;
        }
    } catch (error) {
        console.error(error);
    }
};
const update = async (obj) => {
    try {
        let res = await fetchAdmin(`admin/food_category/edit/${UUID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(obj)
        }, router);

        if (res.status == 200) {
            message.success("Ma'lumot yangilandi")
            router.push('/admin/category');
            return null;
        }
        if (res.status == 400) {
            res = await res.json();
            message.error(res.error);

            message.error("Ma'lumotlar qo'shilmadi");
        }
        if (res.status == 409) {
            res = await res.json();

            message.error("Ma'lumotlar avval qo'shilgan");
            return;
        }
    } catch (error) {
        console.log(error)
    }
};
const handleValidateClick = async (e) => {
    e.preventDefault();

    formRef.value?.validate(async (errors) => {
        if (!errors) {

            await update(formValue.value);
        } else {
            message.error("Formani to'ldiring");

            return null
        }
    });
};

onMounted(async () => {
    const responseData = await backend(route.params.id);

    if (responseData) {
        formValue.value.name_uz = responseData.name_uz || "";
        formValue.value.name_kril = responseData.name_kril || "";
        formValue.value.name_rus = responseData.name_rus || "";
        formValue.value.name_en = responseData.name_en || "";
        formValue.value.status = responseData.status || false;
        formValue.value.description = responseData.description || "";

    }
});

</script>
