<template>
    <div class="container mx-auto">
        <div class="md:flex flex-row gap-4 ">
            <!-- SETUP & SCORE -->
            <div class="basis-1/4">
                <section id="mineSweeperProgress" class="px-2 ">
                    <div class="sticky md:static flex flex-row gap-1">

                        <modal v-model="showMenu" >
                            <template #command>
                                <button @click="showMenu=true" class="w-8 p-0 m-0 my-2"> 
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                </button>
                            </template>
                        <section id="mineSweeperSetup" v-show="showOptions" class=" rounded-md relative">
                            <span class="cursor-pointer absolute -top-2 right-0 font-bold h-[28px]" @click="showMenu = false">&times;</span>
                            <div class="text-left">Size</div>
                            <div class="grid grid-cols-[20px,1fr] pl-4">
                                <input type="radio" name="small" id="" v-model="sizeSelector" value="small">
                                <label for="small" class="text-start ml-2 "> small (10x10-10)</label>
                                <input type="radio" name="medium" id="" v-model="sizeSelector" value="medium">
                                <label for="medium" class="text-start ml-2 "> Medium (16x16-40)</label>
                                <input type="radio" name="large" id="" v-model="sizeSelector" value="large">
                                <label for="large" class="text-start ml-2 ">large (30x16-99)</label>
                            </div>
                            <button @click="newGame();showMenu=false" class="text-black">New</button>
                        </section>
                        </modal>

                        <div class="flex flex-row w-full mx-auto py-2 gap-1 ">
                            <div>Found</div>
                            <lcdElt :number="nbflags.nbflags" class="w-16 mr-2" />
                            <div>Total</div>
                            <lcdElt :number="nbMines" :nbdigit="1" class="w-16" />
                        </div>
                        <button class="clearZone" :class="{ selectFlag: addFlag }" @click="addFlag = !addFlag"> </button>
                    </div>

                    <div class="bg-gray-400 rounded-2xl my-4">
                        <div class="bg-green-400 rounded-2xl" style="height:24px"
                            :style="`width:${Math.round(nbflags.nbflags / nbflags.nbMines * 100)}%`"></div>
                    </div>
                </section>
                
                <div v-if="kaboom" class="mx-auto w-32 h-40 py-2">
                    <img src="/mine.svg" alt="" class=" bg-red-600  rounded-2xl">
                </div>
                
                
            </div>

            <!-- MINEFIELD -->
            <div class="mineField">
                
                <div class="grid " :style="`grid-template-columns: repeat(${Mine.colsCount + 1}, 24px)`">
                    <div>-</div>
                    <div v-for="item in Mine.colsCount">
                        {{ item - 1 }}
                    </div>
                </div>

                <div v-for="(row, row_id) in Mine.minesFields" :key="row_id">

                    <div class="grid h-[24px]" :style="`grid-template-columns: repeat(${Mine.colsCount + 1}, 24px)`">
                        <div>{{ row_id }}</div>
                        <div v-for="(item, item_id) in row" key:="item_id"
                            class="cursor-pointer border-[1px] border-slate-600">

                            <div @click.left="addFlag ? setflag(row_id, item_id) : setdata(row_id, item_id)"
                                @click.right.prevent="setflag(row_id, item_id)">

                                <div v-if="item.discovery == 'Hidden'" class="w-[24px] h-[24px] hiddenCell" style="">
                                </div>
                                <div v-if="item.discovery == 'Flagged'" class="h-[24px] hiddenCell ">
                                    <img src="/flag.svg" alt="M" class="w-[24px] mx-auto p-1">
                                </div>
                                <div v-if="item.discovery == 'Discovered'">
                                    <img v-if="item.land == 'M'" src="/mine.svg" alt="M"
                                        class="w-[24px] h-[24px] mx-auto py-1">
                                    <div v-if="item.land != 0 && item.land != 'M'">{{ item.land }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    
    <timerCard v-model="reset" class="pt-8" ></timerCard>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue';
import gridmanager from './gridmanager'
import lcdElt from '../../components/lcdElt.vue'
import modal from '../../components/modal.vue'
import timerCard from '../../components/timer/timerCard.vue';
const mineFieldDimension = { rows: 50, cols: 15, nbMines: 10 }

const grid = new gridmanager({ cols: mineFieldDimension.cols, rows: mineFieldDimension.rows, nbMines: mineFieldDimension.nbMines })
console.log(grid)
const Mine = ref(grid)
const colonne = ref(0)
const ligne = ref(0)
const kaboom = ref(false)
const nbMines = ref(mineFieldDimension.nbMines)
const sizeSelector = ref("small")
const showOptions = ref(true)
const showMenu= ref(false)
const addFlag = ref(true)
const reset = ref(false)

const setdata = async (row: number, col: number) => {
    colonne.value = col
    ligne.value = row
    if (Mine.value.minesFields[row][col].discovery != 'Flagged') {
        Mine.value.minesFields[row][col].discovery = "Discovered"
        discoverNeighbours(row, col)
        if (Mine.value.minesFields[row][col].land == 'M') kaboom.value = true
    }
    await nextTick()

}
const setflag = (row: number, col: number) => {
    colonne.value = col
    ligne.value = row

    switch (Mine.value.minesFields[row][col].discovery) {
        case 'Flagged':
            Mine.value.minesFields[row][col].discovery = 'Hidden'
            break;
        case 'Hidden':
            Mine.value.minesFields[row][col].discovery = 'Flagged'
            break;
        default:
            break;
    }

}

const discoverNeighbours = (row: number, col: number) => {


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
            const currentNeighbour = Mine.value.minesFields[row + neighbour[0]][col + neighbour[1]]
            if (currentNeighbour.discovery == "Hidden") {
                if (currentNeighbour.land == 0) {
                    {
                        currentNeighbour.discovery = "Discovered"
                        discoverNeighbours(row + neighbour[0], col + neighbour[1])
                        boundaries.forEach(freeNeighbour => {
                            const visibleNeighbour = Mine.value.minesFields[row + freeNeighbour[0]][col + freeNeighbour[1]]
                            if (visibleNeighbour.land != "M") visibleNeighbour.discovery = "Discovered"
                        })
                    }
                }
            }
        } catch (error) {
            // console.log(error)
        }

    })


}

onMounted(() => {
    newGame();
    document.title = 'MineSweeper';
    const faviconLink = document.querySelector("link[rel='icon']") as HTMLLinkElement
    if (faviconLink) faviconLink.href = "/mine_flavico.svg";
})
const newGame = () => {
    switch (sizeSelector.value) {
        case "small":
            mineFieldDimension.cols = 10;
            mineFieldDimension.rows = 10;
            mineFieldDimension.nbMines = 10
            break;
        case "medium":
            mineFieldDimension.cols = 16;
            mineFieldDimension.rows = 16;
            mineFieldDimension.nbMines = 40
            break;

        case "large":
            mineFieldDimension.cols = 30;
            mineFieldDimension.rows = 16;
            mineFieldDimension.nbMines = 99
            break;

        default:
            break;
    }
    const grid = new gridmanager({ cols: mineFieldDimension.cols, rows: mineFieldDimension.rows, nbMines: mineFieldDimension.nbMines })
    nbMines.value = mineFieldDimension.nbMines
    Mine.value = grid
    kaboom.value = false
    reset.value=true

}

const nbflags = computed(() => {
    const tablesize = mineFieldDimension.cols * mineFieldDimension.rows

    const flagsCounterByRow = Mine.value.minesFields.map((row) => row.filter((cell) => cell?.discovery == "Flagged").length)
    const flagsCounteroverall = flagsCounterByRow.reduce((it, c) => it + c)

    const clearanceCounterByRow = Mine.value.minesFields.map((row) => row.filter((cell) => cell?.discovery != 'Hidden').length)
    const clearanceCounteroverall = clearanceCounterByRow.reduce((it, c) => it + c)


    return { tableSize: tablesize, nbflags: flagsCounteroverall, nbMines: nbMines.value, clearanceCounteroverall }
})
</script>

<style scoped>
.hiddenCell {
    border: outset;
    @apply bg-slate-300 border-4
}

.clearZone {
    position: sticky;

    background-image: url('/public/shovel.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 50%;
    @apply bg-slate-400 h-12 w-12 border-none;
    @apply top-1 left-1
}

.selectFlag {
    background-image: url('/public/flag.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 50%;
    @apply bg-slate-500
}
</style>