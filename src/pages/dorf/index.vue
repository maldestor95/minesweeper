<template>
  <div class="bg-[#7E8848] ">
  <!-- <div class="bg-red-400 h-2 w-full"></div> -->
  <!-- HEADER -->
  <div class="flex my-2 ">
    <div class="basis-1/6 flex items-center justify-center" @click="reset">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="3"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
    </div>
    <div class="basis-3/6">
      <svg viewBox="0 0 150 82" width="140" class="mx-auto">
        <image xlink:href="/dorftitle.svg" />
      </svg>
    </div>
    <div class="basis-2/6 flex items-center justify-center">
      <h1 class="text-white font-bold">{{ total }}</h1>
    </div>
  </div>

  <!-- Objectives & Flags -->
  <div :class="{ blurry: cardToDisplay != 'HIDE' }" class="relative">
    <div
      class="grid grid-cols-[minmax(90px,1fr)_repeat(5,minmax(0,1fr))] items-center scoregrid text-white"
    >
      <toprow></toprow>

      <div class="flex flex-row px-1">
        <div class="my-auto hidden md:block">Objectifs</div>
        <svg viewBox="300 0 50 50" class="mx-auto">
          <image xlink:href="/scoreicons.svg" />
        </svg>
      </div>
      <input v-model="score.Woods" type="number" />
      <input v-model="score.Grain" type="number" />
      <input v-model="score.Village" type="number" />
      <input v-model="score.Track" type="number" />
      <input v-model="score.Stream" type="number" />

      <div class="flex flex-row px-1">
        <div class="my-auto hidden md:block">Drapeaux</div>
        <svg viewBox="250 0 50 50" class="mx-auto">
          <image xlink:href="/scoreicons.svg" />
        </svg>
      </div>
      <input v-model="score.WoodsFlag" type="number" />
      <input v-model="score.GrainFlag" type="number" />
      <input v-model="score.VillageFlag" type="number" />
      <input v-model="score.LongestTrack" type="number" />
      <input v-model="score.LongestStream" type="number" />
    </div>

    <!-- unlocks -->
    <div class="border-white border-solid border-2 border-t-0">
      <unlock v-model="score.Cabane">
        <cardhelp @click="showCard(TileE.ForestCabin)">Cabane dans le bois</cardhelp>
        <dorficon icontype="wood" :size="20"></dorficon>
      </unlock>

      <unlock v-model="score.Moisson">
        <cardhelp @click="showCard(TileE.HarvestFestival)">fête des moissons</cardhelp>
        <dorficon icontype="field" :size="20"></dorficon>
      </unlock>

      <unlock v-model="score.TourDeGuet">
        <cardhelp @click="showCard(TileE.WatchTower)">Tour de guet</cardhelp>
        <dorficon icontype="village" :size="20"></dorficon>
      </unlock>

      <unlock v-model="score.Locomotive">
        <cardhelp @click="showCard(TileE.Locomotive)">Locomotive</cardhelp>
        <dorficon icontype="railway" :size="20"></dorficon>
      </unlock>

      <unlock v-model="score.Bateaux">
        <cardhelp @click="showCard(TileE.Ship)">Bateaux de plaisance</cardhelp>
        <dorficon icontype="stream" :size="20"></dorficon>
      </unlock>

      <unlock v-model="score.Hearts">
        <cardhelp @click="showCard(TileE.RedHearts)">Coeurs rouge</cardhelp>
        <dorficon icontype="hearts" :size="20"></dorficon>
      </unlock>

      <unlock v-model="score.Circus">
        <cardhelp @click="showCard(TileE.Circus)">Cirque</cardhelp>
        <dorficon icontype="circus" :size="20"></dorficon>
      </unlock>

      <unlock v-model="score.Aiguilleur"
        ><cardhelp @click="showCard(TileE.SignalMan)"
          >Aiguilleurs (2/passage à niveau)</cardhelp
        >
        <dorficon icontype="" :size="20"></dorficon>
      </unlock>

      <unlock v-model="score.Bergere"
        ><cardhelp @click="showCard(TileE.Sheperdess)">Bergère (1/Mouton)</cardhelp>
      </unlock>

      <unlock v-model="score.Colline"
        ><cardhelp @click="showCard(TileE.Hill)"
          >Colline(à dist.2*2/tuile Objectif)</cardhelp
        ></unlock
      >

      <unlock v-model="score.Chantier"
        >Chantier de Construction (territoire de 7+=7)</unlock
      >

      <unlock v-model="score.Decollage">Site de décollage (2/tuile parcourue)</unlock>

      <unlock v-model="score.GoldHearts">Coeur doré (2/bords correspondant)</unlock>

      <unlock v-model="score.Gare">Gare ferroviare (si fermée = 1/tuile)</unlock>

      <unlock v-model="score.Port">Port de plaisance (si fermé = 1/tuile)</unlock>

      <unlock v-model="score.Cloud" noscore
        ><cardhelp @click="showCard(TileE.Cloud)">Nuage</cardhelp></unlock
      >
      <unlock v-model="score.WareHouse" noscore
        ><cardhelp @click="showCard(TileE.WareHouse)">Entrepôt</cardhelp></unlock
      >
    </div>
  </div>
  <div
    class="absolute top-20 container flex align-center justify-center blurry w-full h-full "
    v-if="cardToDisplay != 'HIDE'"
  >
    <card :Tile="cardToDisplay" size="200" @hide="cardToDisplay = 'HIDE'"></card>
  </div>
  <about></about>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import toprow from "./toprow.vue";
import unlock from "./unlock.vue";
import dorficon from "./dorficon.vue";
import card from "../../components/card.vue";
import { tileNameEnum as TileE } from "./tilename";
import cardhelp from "./cardhelp.vue";
import about from "./about.vue";

const cardToDisplay = ref("HIDE");

const resetScore = {
  Woods: 0,
  Grain: 0,
  Village: 0,
  Stream: 0,
  Track: 0,
  WoodsFlag: 0,
  GrainFlag: 0,
  VillageFlag: 0,
  LongestStream: 0,
  LongestTrack: 0,
  Hearts: 0,
  Circus: 0,
  Aiguilleur: 0,
  Bergere: 0,
  Colline: 0,
  Chantier: 0,
  Decollage: 0,
  GoldHearts: 0,
  Cabane: 0,
  Moisson: 0,
  TourDeGuet: 0,
  Locomotive: 0,
  Bateaux: 0,
  Gare: 0,
  Port: 0,
  Cloud: 0,
  WareHouse: 0,
};
let score = reactive({ ...resetScore });

function reset() {
  Object.assign(score, resetScore);
}
const total = computed(() => {
  let totalTemp = 0;
  // return Object.values(score).reduce(
  //   (a, c) => a + (c.length > 0 ? parseInt(c) : 0),
  //   initialValue
  // );
  // Object.keys(score).forEach((element:string) => {
  // console.log(`${score[element]}`)
  totalTemp = Object.values(score).reduce((a, c) => {
    if (typeof c == "number") return a + c;
    if (c == "") return a;
    return a + parseInt(c);
  });
  // });
  return totalTemp;
});

const showCard = (card: TileE): void => {
  cardToDisplay.value = card.toString();
};

onMounted(()=>{
      document.title = 'Dorf';
      const faviconLink = document.querySelector("link[rel='icon']") as HTMLLinkElement
      if (faviconLink) faviconLink.href = "/flavico.svg";
})
</script>

<style scoped>
input {
  text-align: center;
  color: white;
  background-color: #7e8848;
}
#unlock {
  color: #000;
}

.blurry {
  backdrop-filter: blur(1px);
  transition: width 0.5s, height 0.5s, blur 2s;
}


</style>
