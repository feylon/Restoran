<template>
    <div class="font-bold text-[23px] mb-4">
        <n-button @click="go_back()" title="Ortga qaytish" circle><font-awesome-icon class="text-green-500" :icon="['fas', 'arrow-left']" /></n-button>
        Qo'shish
    </div>
    <div>
        <n-radio-group v-model:value="size" name="left-size" style="margin-bottom: 12px">
            <n-radio-button value="small">
                Kichkina
            </n-radio-button>
            <n-radio-button value="medium">
                O'rta
            </n-radio-button>
            <n-radio-button value="large">
                Katta
            </n-radio-button>
        </n-radio-group>
        <n-form ref="formRef" inline :label-width="130" :model="formValue" :rules="rules" :size="size"
            class="w-full gap-2 flex flex-wrap">
            <n-form-item label="O'zbekcha nomi" path="name_uz">
                <n-input v-model:value="formValue.name_uz" placeholder="O'zbekcha nomi" />
            </n-form-item>
            <div class="flex gap-1 items-center">
                <n-form-item  label="Кириллча номи" path="name_kril">
                    <n-input v-model:value="formValue.name_kril" placeholder="Кириллча номи" />
                    <n-button title="Lotinni kiril qilish" @click="kril" type="success"><font-awesome-icon :icon="['fas', 'wand-magic-sparkles']" /></n-button>
                </n-form-item>
            </div>
            <n-form-item label="Русское название" path="name_rus">
                <n-input v-model:value="formValue.name_rus" placeholder="Русское название" />
            </n-form-item>
            <n-form-item label="English Name" path="name_en">
                <n-input v-model:value="formValue.name_en" placeholder="English name" />
            </n-form-item>
            <n-form-item label="Status" path="status">
                <n-switch v-model:value="formValue.status" />
            </n-form-item>
            <n-form-item label="Description" path="description">
                <n-input v-model:value="formValue.description" placeholder="Description of the food category"
                    type="textarea" />
            </n-form-item>
            <n-form-item>
                <n-button @click="handleValidateClick">
                    Yuborish
                </n-button>
            </n-form-item>
        </n-form>

    </div>
</template>

<script setup>
import { useMessage } from "naive-ui";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const message = useMessage();
const size = ref("medium");
const formValue = ref({
    name_uz: "",
    name_kril: "",
    name_rus: "",
    name_en: "",
    status: true,
    description: "",
});

const rules = {
    name_uz: [{ required: true, message: "Please input O'zbekcha nomi", trigger: "blur", min : 3 }],
    name_kril: [{ required: true, message: "Please input Кириллча номи", trigger: "blur" }],
    name_rus: [{ required: true, message: "Please input Русское название", trigger: "blur" }],
    name_en: [{ required: true, message: "Please input English name", trigger: "blur" }],
    description: [{ required: true, message: "Please input description", trigger: "blur" }],
};

const handleValidateClick = async () => {
    const {name_uz, name_kril, name_rus, name_en, description} = formValue.value;
    if (!name_uz || !name_kril || !name_rus || !name_en || !description) {
        message.error("Maydonlarni to'ldiring");
        return;
    }
    try {
        let res = await fetchAdmin("admin/food_category/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(formValue.value),
        }, router);
        if (res.status == 200) {
            message.success("Ma'lumotlar qo'shildi");
            formValue.value = {
                name_uz: "",
                name_kril: "",
                name_rus: "",
                name_en: "",
                status: true,
                description: "",
            };

        }
        if (res.status == 400) {
            res = await res.json();
            message.error(res.error);
            console.log(res)
            message.error("Ma'lumotlar qo'shilmadi");
        }
        if (res.status == 409) {
            res = await res.json();

            message.error("Ma'lumotlar avval qo'shilgan");
            return;
        }
    } catch (error) {
        console.log(error);
    }
};
const kril = () => {
    formValue.value.name_kril = lotinToKrill(formValue.value.name_uz);
};  
const go_back = () => {
    router.push("/admin/category");
};
</script>

<style lang="scss" scoped></style>
