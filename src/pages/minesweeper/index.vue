<template>
    <div>
minesweeper
<p> table Size{{ tablesize }}</p>
<button @click="newGame">New</button>

<div class="container shadow-xl py-4 my-4 ">
    <div class="text-black grid grid-cols-4 ">
        <div>Columns</div>
        <input type="number" name="col" v-model="colonne" min="0" :max="grid.minesFields[0].length">
        <div>Row</div>
        <input type="number" name="row" v-model="ligne" min="0" :max="grid.minesFields.length">
    </div>
    <div class="flex gap-4 flex-row">
    <div>Surroundings</div>
    <div>{{ neighbours }}</div>
    </div>
</div>


<div class="w-80 mx-auto">

    <div class="grid grid-cols-11">
        <div class="w-8">-</div>
        <div v-for="item in 10" class="  w-8"  >
            {{ item -1}}
        </div>
    </div>

    <div v-for="(row,row_id) in Mine" :key="row_id" class="grid grid-cols-11 h-8">
        <div>{{ row_id }}</div>
        <div v-for="(item, item_id) in row" key:="item_id" class="border-green-400 border-[1px] border-solid w-8" @click="setdata(row_id,item_id)" >
            {{ item==0?"":item }}
        </div>   
    </div>

</div>

 </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import gridmanager from './gridmanager'

const tablesize=ref({x:10,y:20})
const grid=new gridmanager({cols:tablesize.value.x,rows:tablesize.value.y,nbMines:30})
const Mine=ref()
const colonne=ref(0)
const ligne=ref(0)

const neighbours= computed(()=>{
    return grid.isPlacementValid({c:colonne.value,l:ligne.value})
})
const setdata=(row:number,col:number)=>{
    colonne.value=col
    ligne.value=row
}
onMounted(()=>{
    grid.fillwithneighbours()
    Mine.value=grid.minesFields
})
const newGame=()=>{
    const grid=new gridmanager({cols:tablesize.value.x,rows:tablesize.value.y,nbMines:30})
    Mine.value=grid.minesFields
    grid.fillwithneighbours()
    Mine.value=grid.minesFields
}
</script>

<style scoped>

</style>