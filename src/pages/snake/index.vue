<template>
    <div>
        SNAKE
    </div>
    <div class="flex">
        <div class="debug">
            <div v-for="row in 15"  class="mx-auto ">
            <!-- column -->
                <div class="grid grid-cols-[repeat(15,1fr)] ">
                    <div v-for="col in 15"  class="">
                        <cell :body="isBody(row,col)" :food="isFood(row,col)">
                            <!-- {{ isBody(row,col)?'X':'' }} -->
                        </cell>
                    </div>
                </div>
            </div>
        </div>
        <div class="basis-1/4 debug">
            <h2>
                Score: {{ snake.length }}
            </h2>

            <div class="grid grid-cols-3 w-16 hover:cursor-pointer mx-auto bg-slate-300 rounded-xl p-2 ">
                <div></div>
                <div @click="up()" @touchstart="up()" class="-rotate-90 hoverNavigation">></div>      
                <div></div>

                <div @click="left()" class="rotate-180 mt-1 hoverNavigation">></div>      
                <div></div>
                <div @click="right()" class="hoverNavigation">></div>      

                <div></div>
                <div @click="down()" class="rotate-90 ml-2 hoverNavigation" >></div>      
                <div></div>
            </div>

            <div>Speed : {{ timerDelay }}</div>

            <div v-if="isCrashed">
                <img src="/splatSnake.svg" class="h-40 mx-auto">
                <button @click="start">
                    restart ?
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import cell from './cell.vue';
    import {useSNAKE} from "./snake"
    import  {useKeyDown} from "../../composable/keydown"
    

    const {snake,left,up,down,right,isCrashed,food,timerDelay,start}=useSNAKE()
    
    useKeyDown( [
        {'key':'ArrowUp',fn:up},
        {'key':'ArrowDown',fn:down},
        {'key':'ArrowLeft',fn:left},
        {'key':'ArrowRight',fn:right}
    ])
    
    const isBody=(row:number,col:number)=>{
        return snake.value.filter(it=>it.x==row&&it.y==col).length>0
    }
    const isFood=(row:number,col:number)=>{
        return food.value?.x==row&&food.value.y==col
    }
    
</script>

<style scoped>
.hoverNavigation {
    @apply hover:text-red-500 hover:font-extrabold
}
</style>