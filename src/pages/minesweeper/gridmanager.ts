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
        // this.minesFields[5][5].land = "M"
        // this.minesFields[9][2].land = "M"
        // this.minesFields[0][1].land = "M"
        // this.setNumberOfneighbours({ l: 4, c: 4 })

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
        const randomPosition = Math.floor(Math.random() * this.nbCols * this.nbRows)
        const mineX = Math.floor(randomPosition / this.nbCols)
        const mineY = randomPosition - mineX * this.nbCols

        return {
            position: { x: mineX, y: mineY },
            // isPlacementValid: this.isPlacementValid({'c':mineX,'l':mineY-1})
        }
    }

    isPlacementValid(position: { l: number, c: number }) {
        const MaximumSurrounding = 4

        let numberOfSurroundingMines = 0


        let LsearchOffset: number[] = [-1, 0, 1]
        let CsearchOffset: number[] = [-1, 0, 1]

        if (position.l > this.nbRows - 2) LsearchOffset = [-1, 0]
        if (position.l < 1) LsearchOffset = [0, 1]

        if (position.c > this.nbCols - 2) CsearchOffset = [-1, 0]
        if (position.c < 1) CsearchOffset = [0, 1]



        const minesFields = this.minesFields
        CsearchOffset.forEach(y => {
            LsearchOffset.forEach(x => {
                try {
                    // console.log("ici", position,x,y,minesFields[position.l + x ][position.c + y ])

                    // const mineFound = minesFields[position.l + x][position.c + y]=="M"
                    // if (mineFound ) numberOfSurroundingMines = numberOfSurroundingMines + 1
                } catch (error) {
                    console.log("error", position, x, y, this.nbRows, this.nbCols, LsearchOffset, CsearchOffset,)
                }
            })
        })

        return numberOfSurroundingMines
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