
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
  const direction=ref('left')
  const snake = ref <Array<cellType>>([])
  const food = ref<cellType>()
  let timerDelay=ref(800); // ms
  let timerRefresh=setTimeout(left,timerDelay.value)
  snake.value.push({ x: 7, y: 9, status: 'body' })
  snake.value.push({ x: 7, y: 8, status: 'body' })
  snake.value.push({ x: 7, y: 7, status: "body" })
  food.value={x:5,y:7,status:'food'}
  

  function move(steps: { newX: number, newY: number }) {
    // check if eating itself
    if (snake.value.filter(sn => sn.x == steps.newX && sn.y == steps.newY).length > 0) isCrashed.value = true
    if (steps.newX == 0 || steps.newX == 16 || steps.newY == 0 || steps.newY == 16) isCrashed.value=true

    if (isCrashed.value) {
      console.log('tt')
      clearTimeout(timerRefresh)   
    }
      
    snake.value.push({
      x: steps.newX,
      y: steps.newY,
      status: 'body'
    })
    //check if food is eaten
    if ((steps.newX == food.value?.x && steps.newY == food.value.y)) {
      createNewFood() 
    }
    else {
      snake.value.splice(0, 1)
    }

  }
  function createNewFood(){
    food.value={
      x:      Math.ceil(Math.random() * 15),
      y:      Math.ceil(Math.random() * 15),
      status:'food'
    }
    timerDelay.value = timerDelay.value * 0.9
  }



  function left() {
    const newX=snake.value[snake.value.length-1].x
    const newY=snake.value[snake.value.length-1].y-1
    move({newX,newY})
    direction.value='left'
    clearTimeout(timerRefresh);
    timerRefresh=setTimeout(()=>{left()}, timerDelay.value);
    
  }
  function up() {
    const newX = snake.value[snake.value.length - 1].x-1
    const newY = snake.value[snake.value.length - 1].y 
    move({ newX, newY })
    direction.value = 'up'
    clearTimeout(timerRefresh);
    timerRefresh=setTimeout(()=>{up()}, timerDelay.value);
    
  }
  
  function down() { 
    const newX = snake.value[snake.value.length - 1].x+1
    const newY = snake.value[snake.value.length - 1].y 
    move({ newX, newY })
    direction.value = 'down'
    clearTimeout(timerRefresh);
    timerRefresh=setTimeout(()=>{down()}, timerDelay.value);
    
  }
  
  function right() { 
    const newX = snake.value[snake.value.length - 1].x
    const newY = snake.value[snake.value.length - 1].y + 1
    move({ newX, newY })
    direction.value = 'right'
    clearTimeout(timerRefresh);
    timerRefresh=setTimeout(()=>{right()}, timerDelay.value);

  }

  return {
    snake,
    left, up, down, right,
    isCrashed,
    food,
    direction,
    timerDelay
  }
}
