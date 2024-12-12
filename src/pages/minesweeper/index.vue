<template>
    <div>
minesweeper
<p> table Size{{ tablesize }}</p>
<p>{{ Mine.minesFields[ligne][colonne] }}</p>
<p>{{ ligne}}/{{colonne }}</p>
<p>{{ kaboom }}</p>
<button @click="newGame" class="text-black">New</button>

<div v-if="kaboom">
    <img src="mine.svg" alt="" class="absolute w-28 bg-red-600" >
</div>

<div class="w-80 mx-auto">

    <div class="grid grid-cols-11">
        <div class="w-8">-</div>
        <div v-for="item in 10" class="  w-8"  >
            {{ item -1}}
        </div>
    </div>

    <div v-for="(row,row_id) in Mine.minesFields" :key="row_id" class="grid grid-cols-11 h-8">
        <div>{{ row_id }}</div>
        <div v-for="(item, item_id) in row" key:="item_id" class="border-green-400 border-[1px] border-solid w-8 cursor-pointer" 
        @click.left="setdata(row_id,item_id) "
        @click.right.prevent="setflag( row_id,item_id)" 
        >
            <div v-if="item.discovery=='Hidden'" class="bg-slate-300 w-8 h-8"> </div>
            <div v-if="item.discovery=='Flagged'" class="w-8 h-8"> 
                <img src="flag.svg" alt="M" class="w-4 mx-auto py-2">
            </div>
            <div v-if="item.discovery=='Discovered'" >
                <img v-if="item.land=='M'" src="mine.svg" alt="M" class="w-4 mx-auto py-2">
                <div v-if="item.land!=0 && item.land!='M'">{{ item.land }}</div>
            </div>
        </div>   
    </div>

</div>

 </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue';
import gridmanager from './gridmanager'


const tablesize=ref({x:10,y:20})
const grid=new gridmanager({cols:tablesize.value.x,rows:tablesize.value.y,nbMines:10})
const Mine=ref(grid)
const colonne=ref(0)
const ligne=ref(0)
const kaboom=ref(false)

const neighbours= computed(()=>{
    return grid.isPlacementValid({c:colonne.value,l:ligne.value})
})
const setdata=async(row:number,col:number)=>{
    colonne.value=col
    ligne.value=row
    if (Mine.value.minesFields[row][col].discovery!='Flagged') 
    {
        Mine.value.minesFields[row][col].discovery="Discovered"
        discoverNeighbours(row,col)
        if (Mine.value.minesFields[row][col].land=='M') kaboom.value=true
    }
    await nextTick()

}
const setflag= (row:number,col:number)=>{
    colonne.value=col
    ligne.value=row
    
    switch (Mine.value.minesFields[row][col].discovery) {
        case 'Flagged':
            Mine.value.minesFields[row][col].discovery='Hidden'
            break;
        case 'Hidden':
            Mine.value.minesFields[row][col].discovery='Flagged'
            break;               
        default:
            break;
    }
    
}

const discoverNeighbours=(row:number,col:number)=>{
    
        
        // look at 8 surroundings,  if value is 0,  perform setdata function on the cell to carry on the discovery
        const boundaries = [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, -1],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1],
        ]
        
        boundaries.forEach(neighbour => {
            try {
                const currentNeighbour= Mine.value.minesFields[row+neighbour[0]][col+neighbour[1]]
                if (currentNeighbour.discovery=="Hidden") 
                {
                    if (currentNeighbour.land==0){
                        {               
                            currentNeighbour.discovery="Discovered"
                            discoverNeighbours(row + neighbour[0],col + neighbour[1])
                            boundaries.forEach(freeNeighbour=>{
                                const visibleNeighbour= Mine.value.minesFields[row+freeNeighbour[0]][col+freeNeighbour[1]]
                                if (visibleNeighbour.land!="M") visibleNeighbour.discovery="Discovered"
                            })
                        }            
                    }
                }
            } catch (error) {
                // console.log(error)
            }
            
        })
    
        
    }
    
    onMounted(()=>{
        // grid.fillwithneighbours()
        newGame()
    })
    const newGame=()=>{
        const grid=new gridmanager({cols:tablesize.value.x,rows:tablesize.value.y,nbMines:30})
        Mine.value=grid
        kaboom.value=false
        // grid.fillwithneighbours()
        // Mine.value=grid
    }
</script>

<style scoped>

</style>