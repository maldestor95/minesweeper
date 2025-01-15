<template>
    <div class="border-[1px] border-white border-dotted w-8 h-8" :class="{'bg-green-700':props.body,'bg-red-400':props.food}">
        <slot>
        </slot>
    </div>
</template>

<script setup lang="ts">
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