<template>
    <div class="text-black">

<div class="flex">
    <section id="mineSweeperSetup" class="container shadow-2xl p-4  rounded-md">
        <button @click="newGame" class="text-black">New</button>
        <div class="flex">
            <div>number of mines</div>
            <input type="number" v-model="nbMines"/>
        </div>
            <div class="grid grid-cols-[20px,100px] ">
                <input type="radio" name="small" id="" v-model="sizeSelector" value="small" >  
                <label for="small" class="text-start ml-2 "> small</label>
                <input type="radio" name="medium" id="" v-model="sizeSelector" value="medium">
                <label for="medium" class="text-start ml-2 "> Medium</label>
                <input type="radio" name="large" id="" v-model="sizeSelector" value="large">
                <label for="large" class="text-start ml-2 ">large</label>
            </div>
    </section> 


    <section id="mineSweeperProgress" class="container shadow-2xl  basis-1/2 px-2 mt-4" >   
        <div class="flex flex-row justify-evenly w-full py-2">
            <div>Found</div>
            <lcdElt :number="nbflags.nbflags" class="w-16"/>
            <div>/ Total</div>
            <lcdElt :number="nbMines" :nbdigit="1" class="w-16"/>
        </div>
        <div class="bg-gray-400 rounded-2xl">
            <div class="bg-green-400 rounded-2xl" style="height:24px" :style="`width:${Math.round(nbflags.nbflags/nbflags.nbMines*100)}%`"></div>
        </div>
        <div class="h-40">
            <div v-if="kaboom" class="mx-auto w-32 h-40 py-2">
                <img src="mine.svg" alt="" class=" bg-red-600  rounded-2xl" >
            </div>
        </div>
        <scoreboard></scoreboard>
    </section>
</div>


<div class="w-96 mx-auto">
    <div class="grid grid-cols-11 ">
        <div >-</div>
        <div v-for="item in 10"   >
            {{ item -1}}
        </div>
    </div>

    <div v-for="(row,row_id) in Mine.minesFields" :key="row_id" >
        
        <div class="grid grid-cols-11 h-8">
            <div >{{ row_id }}</div>
            <div v-for="(item, item_id) in row" key:="item_id" class="cursor-pointer border-[1px] border-slate-600" >

       <div
        @click.left="setdata(row_id,item_id) "
        @click.right.prevent="setflag( row_id,item_id)" >
        
            <div v-if="item.discovery=='Hidden'" class="w-8 h-8 hiddenCell" style=""> </div>
            <div v-if="item.discovery=='Flagged'" class="h-8 hiddenCell "> 
                <img src="flag.svg" alt="M" class="w-4 mx-auto mt-1">
            </div>
            <div v-if="item.discovery=='Discovered'" >
                <img v-if="item.land=='M'" src="mine.svg" alt="M" class="w-4 mx-auto py-2">
                <div v-if="item.land!=0 && item.land!='M'">{{ item.land }}</div>
            </div>
            </div>
       </div>
        </div>
    </div>

</div>

 </div>


</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue';
import gridmanager from './gridmanager'
import lcdElt from '../../components/lcdElt.vue'
import lcdDigit from '../../components/lcdDigit.vue';
const mineFieldDimension={rows:20,cols:10,nbMines:10}

const tablesize=ref({x:mineFieldDimension.rows,y:mineFieldDimension.cols})
const grid=new gridmanager({cols:mineFieldDimension.cols,rows:mineFieldDimension.rows,nbMines:mineFieldDimension.nbMines})
console.log(grid)
const Mine=ref(grid)
const colonne=ref(0)
const ligne=ref(0)
const kaboom=ref(false)
const debug=ref(true)
const nbMines=ref(mineFieldDimension.nbMines)
const sizeSelector=ref("small")

const neighbours= computed(()=>{
    // return grid.isPlacementValid({c:colonne.value,l:ligne.value})
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
            [0, 0],
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
        newGame()
    })
    const newGame=()=>{
        const grid=new gridmanager({cols:mineFieldDimension.cols,rows:mineFieldDimension.rows,nbMines:nbMines.value})
        Mine.value=grid
        kaboom.value=false
    }

const nbflags = computed(()=>{
    const tablesize=mineFieldDimension.cols*mineFieldDimension.rows
    
    const flagsCounterByRow= Mine.value.minesFields.map((row)=> row.filter((cell)=>cell?.discovery=="Flagged").length)
    const flagsCounteroverall= flagsCounterByRow.reduce((it,c)=>it+c)
    
    const clearanceCounterByRow= Mine.value.minesFields.map((row)=> row.filter((cell)=>cell?.discovery!='Hidden').length)
    const clearanceCounteroverall= clearanceCounterByRow.reduce((it,c)=>it+c)
    
    
    return {tableSize:tablesize,nbflags:flagsCounteroverall,nbMines:nbMines.value,clearanceCounteroverall}
})
</script>

<style scoped>
.hiddenCell {
    border: outset;
    @apply bg-slate-300 border-4
}
</style>