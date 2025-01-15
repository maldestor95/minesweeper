
// by convention, composable function names start with "use"

import { computed, ref } from "vue";
// ************************************
class cell {
  x: number;
  y: number;
  status: string;
  constructor(init: { x: number, y: number, status: string }) {
    this.x = init.x
    this.y = init.y
    this.status = init.status
  }
}
// ************************************
class LIST<T> {
  items: T[]
  constructor() {
    this.items = []
  }
  add = (item: T) => {
    this.items.push(item)
  }
  removeFirst = () => {
    this.items.slice(0, 1)
  }
  removeLast = () => {
    this.items.pop()
  }
}
//****************************************** */

export class SNAKE {
  body: LIST<cell>;
  constructor() {
    this.body = new LIST<cell>()
    this.start()
  }
  private start() {
    this.body.add({ x: 7, y: 7, status: "body" })
    this.body.add({ x: 7, y: 8, status: 'body' })
    this.body.add({ x: 7, y: 9, status: 'body' })
  }
}

type cellType ={
   x: number, y: number, status: string 
}
const test=()=>{return 4}
export const useSNAKE = () => {
  const isCrashed=ref(false)
  const snake = ref <Array<cellType>>([])
  const food = ref<cellType>()
  snake.value.push({ x: 7, y: 9, status: 'body' })
  snake.value.push({ x: 7, y: 8, status: 'body' })
  snake.value.push({ x: 7, y: 7, status: "body" })
  food.value={x:5,y:7,status:'food'}
  
  function move(steps: { newX: number, newY: number }) {
    // check if eating itself
    if (snake.value.filter(sn => sn.x == steps.newX && sn.y == steps.newY).length > 0) isCrashed.value = true

    snake.value.push({
      x: steps.newX,
      y: steps.newY,
      status: 'body'
    })
    //check if food is eaten
    if ((steps.newX == food.value?.x && steps.newY == food.value.y)) {
      // TODO createNewFood() 
      food.value = { x: 3, y: 3, status: 'food' }
    }
    else {
      snake.value.splice(0, 1)
    }


  }

  function left() {
    const newX=snake.value[snake.value.length-1].x
    const newY=snake.value[snake.value.length-1].y-1
    if (snake.value.filter(sn=>sn.x==newX&&sn.y==newY).length>0) isCrashed.value=true

    snake.value.push({ 
      x: newX, 
      y: newY,
     status: 'body' })

    if (!(newX == food.value?.x && newY == food.value.y)) snake.value.splice(0, 1)
     
  }
  function up() {
    const newX = snake.value[snake.value.length - 1].x-1
    const newY = snake.value[snake.value.length - 1].y 
    if (snake.value.filter(sn => sn.x == newX && sn.y == newY).length > 0) isCrashed.value = true

    snake.value.push({
      x: newX,
      y: newY,
      status: 'body'
    })
    if (!(newX == food.value?.x && newY == food.value.y)) snake.value.splice(0, 1)

  }
  
  function down() { 
    const newX = snake.value[snake.value.length - 1].x+1
    const newY = snake.value[snake.value.length - 1].y 
    if (snake.value.filter(sn => sn.x == newX && sn.y == newY).length > 0) isCrashed.value = true

    snake.value.push({
      x: newX,
      y: newY,
      status: 'body'
    })
    if (!(newX == food.value?.x && newY == food.value.y)) snake.value.splice(0, 1)
  }

  function right() { 
    const newX = snake.value[snake.value.length - 1].x
    const newY = snake.value[snake.value.length - 1].y + 1
    if (snake.value.filter(sn => sn.x == newX && sn.y == newY).length > 0) isCrashed.value = true
    
    snake.value.push({
      x: newX,
      y: newY,
      status: 'body'
    })

    if (!(newX==food.value?.x&&newY==food.value.y))   snake.value.splice(0, 1)

  }
  return {
    snake,
    left, up, down, right,
    isCrashed,
    food
  }
}
