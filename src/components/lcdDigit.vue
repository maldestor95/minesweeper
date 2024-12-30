<template>
    
        <svg class=" fill-none" xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 500 1000" 
        >
        
            <defs>
                <polygon id="segment" points="5,0 495,0 445,50 55,45 5,0"  />
            </defs>

            <!-- <polygon points="5,0 495,0 400,50 100,50 5,0" style="fill:red" /> -->
            <!-- <use xlink:href="#segment" x="0" y="100"/> -->
            
            <use xlink:href="#segment" x="0" y="0" transform="translate(0 0) rotate(0)" 
        
            :class="{'segment':[0,2,3,5,7,8,9].includes(value)}"/>
            
            <use xlink:href="#segment" x="0" y="0" transform="translate(500 0) rotate(90)" 
            :class="{'segment':[0,1,2,3,4,7,8,9].includes(value)}"/>
            <use xlink:href="#segment" x="0" y="0" transform="translate(0 500) rotate(-90)" 

            :class="{'segment':[0,4,5,6,8,9].includes(value)}"/>
            
            <polygon  points="10,0 45,-25 445,-25 490,0 445,25 55,25 10,0"  transform="translate(0,500)" 
            :class="{'segment':[2,3,4,5,6,8,9].includes(value)}"/>
            
            <use xlink:href="#segment" x="0" y="0" transform="translate(500 500) rotate(90)" 
            :class="{'segment':[0,1,3,4,5,6,7,8,9].includes(value)}"/>
            <use xlink:href="#segment" x="0" y="0" transform="translate(0 1000) rotate(-90)" 
            :class="{'segment':[0,2,6,8].includes(value)}"/>

            <use xlink:href="#segment" x="0" y="0" transform="translate(500 1000) rotate(180)" 
            :class="{'segment':[0,2,3,5,6,8].includes(value)}"/>


            <text x="0" y="0" class="small">Not a Digit</text>
            <g transform="translate(120,850)" v-if="[-1].includes(value)">
                <text x="0" y="0" class="Rrrrr" transform="scale(4.5) rotate(-65)">Not a Digit</text>
            </g>
        </svg>

    
</template>

<script setup lang="ts">
import { computed } from 'vue';


interface Props {
    value: number;
}
const props = withDefaults(defineProps<Props>(), {
    value: 0,
});

const value=computed(()=>{
    return props.value >= 0 && props.value < 10 ? props.value : -1;
})

</script>
<style scoped>

    .small {
      font: italic 13px sans-serif;
    }
    .heavy {
      font: bold 30px sans-serif;
    }

    /* Note that the color of the text is set with the    *
     * fill property, the color property is for HTML only */
    .Rrrrr {
      font: italic 40px serif;
      fill: red;
    }
    .segment {
        @apply fill-red-600
    }
    
</style>
