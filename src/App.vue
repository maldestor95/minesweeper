<script setup lang="ts">
import { onMounted } from "vue";
import navigationCmp from "../src/components/navigationCmp/index.vue";
import { useRouter } from "vue-router";
import { routes } from "./RouteTypes";
const router = useRouter();

onMounted(() => {
  router.push({ path: "/home" });
  
});

</script>

<template>
  <navigationCmp :routerLinks="routes"> </navigationCmp>

</template>
