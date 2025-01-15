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
                Score
            </h2>
            <div> {{ isBody(0,0)?'X':'Y' }}        </div>
            <div> {{ isBody(7,7)?'X':'Y' }}        </div>
            <button @click="left()">Left</button>      
            <button @click="up()">Up</button>      
            <button @click="right()">Right</button>      
            <button @click="down()">Down</button>      

            <div>Crashed?{{isCrashed}}</div>
            <div>{{ direction }}</div>
            <div>{{ food }}</div>
            <div>{{ timerDelay }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {  computed, onMounted } from 'vue';
    import cell from './cell.vue';
    import {useSNAKE} from "./snake"
    import  {useKeyDown} from "../../composable/keydown"
    
    const rowCount=15
    const colCount=15
    const {snake,left,up,down,right,isCrashed,food,direction,timerDelay}=useSNAKE()
    
    useKeyDown( [
        {'key':'ArrowUp',fn:up},
        {'key':'ArrowDown',fn:down},
        {'key':'ArrowLeft',fn:left},
        {'key':'ArrowRight',fn:right}
    ])
    
    onMounted(()=>{

    })

    const updatedSnake=computed(()=>snake.value)
    const isBody=(row:number,col:number)=>{
        return updatedSnake.value.filter(it=>it.x==row&&it.y==col).length>0
    }
    const isFood=(row:number,col:number)=>{
        return food.value?.x==row&&food.value.y==col
    }
    
</script>

<style scoped>

</style>