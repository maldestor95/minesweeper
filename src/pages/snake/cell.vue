<template>
    <div class="border-[1px] border-white border-dotted w-8 h-8" :class="{'bg-green-700':props.body}">
  
  
        <slot>
          <appleIcon v-if="props.food" class="h-6 mx-auto pt-1"></appleIcon>
        </slot>
    </div>
</template>

<script setup lang="ts">
import appleIcon from './appleIcon.vue';
interface Props {
  body: boolean;
  food: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  body: false,
  food: false,
});
</script>

<style scoped>

</style>