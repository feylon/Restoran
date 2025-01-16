<template>
    <div class="text-[20px]">
        <b>Hamma taomlar</b>
        <div class="mt-3 mb-3">
            <n-table :bordered="false" :single-line="false">
                <thead>
                    <tr>
                        <th class="w-[150px]">
                            <div class="w-full text-center">
                                <n-select  v-model:value="lang" :options="options"
                                    :render-label="renderLabel" />

                            </div>
                        </th>
                        <th>
                            <div class=" w-[230px] flex gap-2 text-center"><n-input v-model:value="search" placeholder="Izlash">

                                </n-input>
                                <n-button @click="callbackend()" strong secondary circle type="success">
                                    <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                                </n-button>
                            </div>
                        </th>

                    </tr>
                </thead>

            </n-table>
        </div>
        <div class="text-[10px]">
            <n-data-table :bordered="false" class="select-none" :columns="columns" :data="data" :max-height="600"
                :scroll-x="1800" virtual-scroll />
        </div>
        <div class="w-full mt-3 flex justify-center">
            <n-pagination v-model:page="page" :page-count="all" show-quick-jumper>
      <template #goto>
       <FONTA class="text-[green]" :icon="['fas', 'arrow-right']"/>
      </template>
    </n-pagination>

        </div>
    </div>
</template>

<script setup>
import { ref, h, render, watch } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { NInput, NButton, NPopover, NTag } from "naive-ui"
const router = useRouter();
const data = ref([{}]);
const page = ref(1);
const size = ref(10);
const lang = ref('uz');
const order = ref("az");
const search = ref("");
const all = ref(10)
const callbackend = async () => {
    let searchval = "";
    if(search.value === "") searchval = "*";
    else searchval = search.value;
    const params = (new URLSearchParams({
        page: page.value,
        size: size.value,
        order: order.value,
        lang: lang.value,
        search: searchval
    })).toString();

    try {
        let res = await fetchAdmin(`admin/food/get?${params}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }

        }, router);

        if (res.status == 400) {
            res = await res.json();

            return null;
        }

        if (res.status == 200) {
            res = await res.json();
            data.value = [];

            data.value = res;
         
            if(data.value.length > 0){
                all.value = eval((Math.ceil((data.value[0].all) / size.value) ).toFixed(0))
           
            }
            data.value.forEach((item, index) => {
                data.value[index].number = (index + size.value * (page.value - 1)) + 1;
            })
            return null;
        }


    }
    catch (error) {
        console.log(error)
    }

}
// http://localhost:4100/admin/food/get?page=1&size=10&lang=uz&order=az&search=Balyk
// page=0&size=0&order=az&lang=uz&search=a
callbackend();

const columns = [

    {
        title: "№",
        key: "number",
        width: 70,
        fixed: "left",
        render(row) {
            const name = JSON.stringify(row.number, null, 2);

            return h("span", { class: "font-bold", }, [row.number])
        }
    },
    {
        title: "Name",
        key: "name",
        width: 130,
        fixed: "left",
        render(row) {
            const name = JSON.stringify(row.name, null, 2);
            return h("span", { class: "font-bold", }, [row.name])
        }
    },
    {
        title: "Narxi",
        key: "price",
        width: 80,
        // fixed: "left",
        render(row) {
            const price = JSON.stringify(row.price, null, 2);

            return h("span", { class: "font-bold", }, [row.price])
        }
    },
    {
        title: "Miqdori",
        key: "amount",
        width: 100,

        render(row, amount, name) {
            return h("span", [` ${row.amount} ${row.format}`]);
        }
    },
    {
        title: "Holati",
        key: "status",
        width: 100,
        render(row) {
            let status = row.status;
            return h(
                NTag,
                {
                    type: status ? "success" : "error",
                    innerHTML: status ? "Aktiv" : "Aktiv emas"
                },
            );
        }
    },

    {
        title: "Chegirma",
        key: "discount",
        width: 100,
        render(row) {
            let discount = row.discount;
            return h(
                NTag,
                {
                    type: discount ? "success" : "error",
                    innerHTML: discount ? "Aktiv" : "Aktiv emas"
                },
            );
        }
    },

    {
        title: "Chegir. miqdori",
        key: "discount_value",
        width: 90,
        render(row) {
            let discount_value = JSON.stringify(row.discount_value, null, 2);
            let discount = row.discount;
            let bool = discount ? "min-w-full flex justify-center  items-center" : "min-w-full  line-through flex justify-center text-red-500 items-center"
            return h("div", {
                class: bool ,
            },
                [row.discount_value]
            )
        }
    },
    {
        title: "Kategory nomi",
        key: "food_category_name",
        width: 130,
        render(row) {
            return ("div", {
                class: "min-w-full flex justify-center items-center",
            },
                [row.food_category_name]
            )
        }
    },
    {
        title: "Yaratuvchi",
        key: "created_by",
        width: 130,

    },
    {
        title: "Tasnif",
        key: "description",
        width: 60,

        render(row) {
            const rowJson = JSON.stringify(row.description, null, 2);
            return h(
                NPopover,
                {
                    trigger: "click",
                    placement: "top",
                },
                {
                    trigger: () =>
                        h(
                            NButton,
                            { type: "primary" },
                            {
                                default: () => [
                                    h(FontAwesomeIcon, {
                                        icon: ["fas", "info"],
                                    }),
                                    "",
                                ],
                            }
                        ),
                    default: () =>
                        h("pre", null, rowJson),
                }
            );
        }


    },
    {
        title: "Tahrirlash",
        key: "key",
        width: 60,
        fixed: "right",
        render(row) {
            let rowJson = JSON.stringify(row.key, null, 2);
            return h(NButton, {
                color : "#0F1728",
                onClick:()=>router.push(`/admin/food/edit/${rowJson}` )
                
            },
                {
                    default: () => [
                        h(FontAwesomeIcon, {
                            icon: ["fas", "pen"],
                        }),
                        "",
                    ],
                })
        }
    },
];

const data1 = ref(Array.from({ length: 30 }).map((_, index) => ({
    "id": "f93ccce5-8621-4582-a692-5c6a6f2b3965",
    "name": "Balyk",
    "creted_at": "2025-01-03T16:59:28.344Z",
    "description": "Grilled or fried fish served with vegetables.",
    "price": new Intl.NumberFormat('en-US').format(200000).replace(/,/g, ' '),
    "amount": "45.00",
    "image_url": null,
    "param": null,
    "status": true,
    "discount": true,
    "discount_value": "2.50",
    "format": "kg",
    "all": "11",
    "created_by": "Ergashev\n Jamshid",
    "food_category_id": "0c3a0d13-24d9-4b16-9c66-9d952d166dd6",
    "food_category_name": "qwert",
    key: "index",
})));


const options = [
    {
        label: "Lotincha",
        value: "uz"
    },
    {
        label: "Krillcha",
        value: "kril"
    },
    {
        label: "Ruscha",
        value: "rus"
    },
    {
        label: "Inglizcha",
        value: "en"
    },
];
const renderLabel = (option) => {

    if (option.type === "group") {
        return `${option.label}(Cool!)`;
    }
    return option.label;
};

watch(lang, (e, v) => {callbackend() });
watch(page, (e, v) => {callbackend() });

</script>

<style lang="scss" scoped></style>