<template>
    <div>
Dashtboard
<font1/>
    </div>
</template>

<script setup>
  import {ref, h} from "vue";
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

 let font1 =  (h(FontAwesomeIcon, {
      class: "text-[15px] ",
      icon: ["fas", "bars"], // Pass the icon prop
    }));
</script>

<style lang="scss" scoped>

</style>