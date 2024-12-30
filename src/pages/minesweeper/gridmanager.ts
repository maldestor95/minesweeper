type mineCell = {
    land: "M" | " " | number
    discovery: "Hidden" | "Discovered" | "Flagged"
}

export default class GRIDMANAGER {
    private nbCols: number
    private nbRows: number
    minesFields: mineCell[][]

    constructor(option: { cols: number, rows: number, nbMines: number }) {
        this.nbCols = option.cols
        this.nbRows = option.rows
        this.minesFields = this.creatEmptyGrid()
        this.prepareMineFields(option.nbMines)

    }
    private creatEmptyGrid() {
        const grid = []
        for (let index = 0; index < this.nbRows; index++) {
            const rows = []
            for (let index = 0; index < this.nbCols; index++) {
                const emptyCell: mineCell = { land: " ", discovery: "Hidden" }
                rows.push(emptyCell)
            }
            grid.push(rows)
        }

        return grid
    }
    prepareMineFields(nbMines: number): void {

        for (let index = 0; index < nbMines; index++) {
            const newMine = this.placeOneMine()
            this.minesFields[newMine.position.x][newMine.position.y].land = "M"
        }

        for (let rr = 0; rr < this.nbRows; rr++) {
            for (let cc = 0; cc < this.nbCols; cc++) {
                if (this.minesFields[rr][cc].land != 'M') this.minesFields[rr][cc].land = this.getNumberOfneighbours({ l: rr, c: cc })
            }
        }

    }

    private placeOneMine() {
        let trialCount=0
        let isPositionValid=false
        let mineX = 0
        let mineY = 0
        do
           {
            const randomPosition = Math.floor(Math.random() * this.nbCols * this.nbRows)
            mineX = Math.floor(randomPosition / this.nbCols)
            mineY = randomPosition - mineX * this.nbCols

            if (this.minesFields[mineX][mineY].land != "M") isPositionValid=true
           }
        while (trialCount<500 && !isPositionValid )
        return {
            position: { x: mineX, y: mineY },


        }
    }

    

    getNumberOfneighbours(position: { l: number, c: number, }): number {
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

        let counter = 0
        boundaries.forEach(neighbour => {
            try {
                if (this.minesFields[position.l + neighbour[0]][position.c + neighbour[1]].land == 'M') counter += 1;
            } catch (error) {

            }

        })
        return counter
    }


}