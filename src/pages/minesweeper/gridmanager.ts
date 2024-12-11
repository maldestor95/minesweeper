export default class GRIDMANAGER{
    private nbCols: number
    private nbRows: number
    minesFields: Array<Array<string|number>>
    
    constructor(option:{cols:number,rows:number,nbMines:number})
    {
        this.nbCols=option.cols
        this.nbRows=option.rows
        this.minesFields=Array.from(Array(this.nbRows),()=>new Array(this.nbCols))
        this.prepareMineFields(option.nbMines)
        
    }

    prepareMineFields(nbmines:number)
    {
        for (let index = 0; index < nbmines; index++) {
            const newMine= this.placeOneMine()
            this.minesFields[newMine.position.x][newMine.position.y]="M"           
        }
    
        return this.minesFields

    }
    
    private placeOneMine(){
        const randomPosition= Math.floor( Math.random()*this.nbCols*this.nbRows)
        const mineX=Math.floor(randomPosition/this.nbCols) 
        const mineY=randomPosition-mineX*this.nbCols

        return {
            position: { x: mineX, y: mineY }, 
            isPlacementValid: this.isPlacementValid({'c':mineX,'l':mineY-1})
            }
    }

    isPlacementValid(position:{l:number,c:number}){
        const MaximumSurrounding = 4

        let numberOfSurroundingMines=0


        let LsearchOffset:number[]=[-1,0,1]
        let CsearchOffset: number[] = [-1, 0, 1]
        
        if (position.l>this.nbRows-2 ) LsearchOffset=[-1,0]
        if (position.l<1) LsearchOffset=[0,1]
   
        if (position.c>this.nbCols-2) CsearchOffset=[-1,0]
        if (position.c<1) CsearchOffset=[0,1]

            

        const minesFields= this.minesFields
        CsearchOffset.forEach(y=>{
            LsearchOffset.forEach(x=>{
                try {
                    // console.log("ici", position,x,y,minesFields[position.l + x ][position.c + y ])

                    const mineFound = minesFields[position.l + x][position.c + y]=="M"
                    if (mineFound ) numberOfSurroundingMines = numberOfSurroundingMines + 1
                } catch (error) {
                    console.log("error", position, x, y, this.nbRows, this.nbCols,  LsearchOffset, CsearchOffset,)
                }
                })
            })

        return numberOfSurroundingMines
    }

    fillwithneighbours (){
        for (let rr = 0; rr < this.nbRows; rr++) {
            for (let cc = 0; cc < this.nbCols; cc++) {
                if (this.minesFields[rr][cc]!="M") 
                    this.minesFields[rr][cc]=this.isPlacementValid({l:rr,c:cc})
            }
        }

    }
}