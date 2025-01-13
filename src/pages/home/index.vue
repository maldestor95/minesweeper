<template>
  <h1>Section Jeux</h1>

  <div class="container">
    <div class="md:flex justify-center gap-8">
      <div
        class="shadow-2lg bg-white my-2 h-28 md:rounded-lg hover:scale-105 cursor-pointer md:w-64 md:h-32"
        @click="
          About?.scrollIntoView({ behavior: 'smooth' });
          About?.scrollTo(50, 0);
        "
      >
        <h2>About</h2>
        <p>
          <a href="http://ldeparis.fr">retour au site principal</a>
        </p>
      </div>
      <template v-for="item in RouteTypes.routes">
        <div
          class="shadow-2lg bg-white my-2 h-28 md:rounded-lg hover:scale-105 cursor-pointer md:w-64 md:h-32"
          @click="router.push({ path: item.path })"
          v-if="item.path != '/home'"
        >
          <h2>{{ item.text }}</h2>
          <p>
            {{ item.about }}
          </p>
        </div>
      </template>
    </div>
  </div>

  <section ref="About" class="mt-96 bg-slate-300 pb-64">
    <h2>A propos</h2>
    <p>
      Etant un joueur de jeux de société acharné, j'ai souhaité créé quelques applicatifs
      web pour répondre à quelques problématiques récurrentes: A savoir, compter les
      points ! j'en ai profité pour glisser 1 ou 2 petits développements qui m'ont amusés
      pendant quelques week-end. Enfin, je garde sous la main quelques règles de jeux que
      je ne possède pas en anglais ou français.

      <br />
    </p>
    <a href="http://ldeparis.fr">retour au site principal</a>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import RouteTypes from "../../routeTypes";
import { onMounted, ref } from "vue";

const router = useRouter();

const About = ref<HTMLElement>();
onMounted(()=>{
    document.title = 'Games';
    const faviconLink = document.querySelector("link[rel='icon']") as HTMLLinkElement
    if (faviconLink) faviconLink.href = "/mine_flavico.svg";
})
</script>
<style scoped>
p {
  @apply italic text-justify px-4;
}
h2 {
  @apply py-2 font-bold;
}
</style>
