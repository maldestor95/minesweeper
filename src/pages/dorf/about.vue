<template>
  <div v-if="show" class="absolute top-0 left-0 w-full bg-[#7d8846] flex justify-center ">
    <div class="container flex flex-col gap-4 px-2 ">
      <h1 class="flex flex-row justify-around align-center py-10">
        <div>Maldestor95</div>
        <div>2023</div>
      </h1>

      <p class="text-justify">
        DorfRomantik a gagné le Spiel Des Jahres 2023. Ici, on vous aide juste à compter
        les points si comme moi vous avez acheté une version allemande.<br />
        Si vous voulez en savoir plus sur le jeux, je vous invite à aller sur le site du
        distributeur français :
        <a
          href="https://www.gigamic.com/jeux-de-plateau/1035-dorfromantik-le-jeu-de-societe-3421272385010.html"
          >GIGAMIC</a
        >
      </p>

      <div class="flex justify-center flex-col">
        <div
          class="text-white border-2 border-solid border-white rounded-2xl max-w-sm w-80 h-40 text-center my-2 py-16 mx-auto cursor-pointer"
          @click="show = !show"
        >
          Retour vers la feuille de score
        </div>
        <div
          class="text-white border-2 border-solid border-white rounded-2xl max-w-sm w-80 h-40 text-center my-2 py-12 mx-auto align-center"
        >
          <pdfVue></pdfVue>
        </div>
        <div
          class="text-white border-2 border-solid border-white rounded-2xl max-w-sm w-80 h-40 text-center my-2 py-16 mx-auto cursor-pointer"
          @click="redirectToMainSite"
        >
          Retour vers le site pricincipal
        </div>
      </div>
    </div>
  </div>

  <div v-if="!show" class="flex justify-center align-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="3"
      stroke="white"
      class="w-8 h-40"
      @click="show = !show"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import pdfVue from "../../components/pdf.vue";
const redirectToMainSite = () => {
  window.location.href = "https://maldestor95.github.io";
};
const show = ref(false);
</script>

<style scoped>
h1 {
  font-size: x-large;
}
</style>
