<template>
<div class="flex w-full gap-2">
    <div v-for="split in numbersplit">
                <lcdDigit :value="split" class="w-4"></lcdDigit>
    </div>
</div>
            
</template>

<script setup lang="ts">

    import { computed } from 'vue';
import lcdDigit from './lcdDigit.vue';
interface Props {
  number: number;
  nbDigits?: number
}
const props = withDefaults(defineProps<Props>(), {
  number: 1258,
  nbDigits:2
});

const numbersplit=computed(()=>{
    const arr:number[]=[]
    let d=props.number
    while (Math.floor(d/10)>0)
    {
        arr.splice(0,0,d-Math.floor(d/10)*10)
        d=Math.floor(d/10)
    }
    arr.splice(0,0,d)
    
    
    for (let missingZeros = 0; missingZeros < props.nbDigits-arr.length; missingZeros++) {
      arr.splice(0,0,0)
    }
    console.log(arr.length, props.nbDigits)

    return arr
})
</script>

<style scoped>

</style>