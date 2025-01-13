<template>
  <sideBar v-model="showMenu" >
    <ul>
      <template v-for="rLink in props.routerLinks">
        <li>
          <RouterLink :to="rLink.path" @click="showMenu=false">{{ rLink.text }}</RouterLink>
        </li>
      </template>
    </ul>
  </sideBar>
  <RouterView />
</template>

<script setup lang="ts">
import { ref } from "vue";
import sideBar from "../sideBar/index.vue";

interface Props {
  routerLinks: { path: string; text: string }[];
}
const props = withDefaults(defineProps<Props>(), {
  routerLinks: () => [{ path: "/", text: "Home" }],
});

const showMenu = ref(false);
</script>

<style scoped></style>
