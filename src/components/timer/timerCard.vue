<template>
    <div class="flex">
        <div class="flex flex-row justify-evenly w-52" >
            <lcdElt :nb-digits="2" :number="hour"></lcdElt>
            <div class="text-red-500 font-bold">:</div>
            <lcdElt :nb-digits="2" :number="minutes"></lcdElt>
            <div class="text-red-500 font-bold">:</div>
            <lcdElt :nb-digits="2" :number="secondes"></lcdElt>
        </div>
        <slot>
            <svg xmlns="http://www.w3.org/2000/svg" v-if="props.resetable"
            @click="reset"
            class="size-6 cursor-pointer stroke-red-600"
            fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
                >
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
        </slot>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref, watch } from 'vue';
    import lcdElt from '../lcdElt.vue';
    const start=defineModel<boolean>({default:false})
    interface Props {
      resetable?: boolean;
      mode?: "timer" | "countdown"
      alarmInSeconds?: number
    }
    const props = withDefaults(defineProps<Props>(), {
      resetable: false,
      mode:"timer",
      alarmInSeconds:0
    });

    onMounted(()=>{
        reset()
        window.setInterval(myTimer,1000)
        start.value=false
    })

    watch(start,(newX)=>{
        // console.log("start", newX)
        if (newX==true) reset()
    }
)
    let startCounter = new Date()

    const minutes=ref(0)
    const hour=ref(0)
    const secondes=ref(0)
    const diff=ref(0)


    function myTimer(){
        const d=new Date();
        diff.value=Math.floor((d.valueOf()-startCounter.valueOf())/1000)
        // diff.value=4*3600+52*60+27
        hour.value=Math.floor(diff.value/3600)
        minutes.value=Math.floor((diff.value-hour.value*3600)/60)
        secondes.value=diff.value-minutes.value*60-hour.value*3600
    }

    const reset=()=>{
        startCounter = new Date()
        start.value=false
    }

</script>

<style scoped>

</style>