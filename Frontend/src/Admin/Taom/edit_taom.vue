<template>
    <div>
{{ params }}
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';
const route = useRoute();
const params = ref(null)
params.value = (route.params.id.replaceAll(`"`, ''))
</script>

<style lang="scss" scoped>

</style>