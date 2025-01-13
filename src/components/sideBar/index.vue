<template>
  <div class="flex absolute w-full ">
    <div class="relative">
      <div class="absolute z-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 cursor-pointer hover:stroke-white"
          @click="show = !show"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
    </div>
      <div class=" h-screen hidden bg-slate-400 z-10 text-left" :class="{showMenu:show}">
        <slot>
          <ul>
            <li>A</li>
            <li>b</li>
          </ul>
        </slot>
      </div>
      <div class="grow opacity-50 bg-slate-400"></div>
  </div>
</template>

<script setup lang="ts">
    const show = defineModel();
</script>

<style scoped>
.showButton {
  @apply bg-yellow-200;
}

@keyframes showMenu {
    0% {
        transform: translateX(-100%);
        opacity: 0%;
    }
    100% {
        transform: translateX(0%);
        opacity: 100%;
    }
}

.showMenu {
  display: block;
  animation-duration: 0.5s;
  animation-name: showMenu;
  animation-direction: normal;
  @apply md:basis-1/4 basis-1/2 pt-8 pl-2;
}
.hideMenu {
  animation-duration: 0.5s;
  animation-name: showMenu;
  animation-direction: reverse;
  @apply basis-1/4;
}

@keyframes slidein {
  from {
    margin-left: 100%;
    width: 300%;
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}

</style>
