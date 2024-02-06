import { Cell, CellStatus } from "../../core/gameOfLife/Cell"

/*
Creation method
next generation
number of neighbors for a some coordinate
[[Dead]] in coordinates (0,0) => 0
[[Alive, Dead]] in coordinates (0,1) => 1
[[Dead, Dead]] in coordinates (0,1) => 0
[[Alive, Dead, Alive]] in coordinates (0,0) => 2
[[Alive, Dead, Alive]] 
[[Alive, Alive, Alive]]  in coordinates (0,0) => 5
[[Alive, Alive, Alive]] 
[[Alive, Dead, Alive]] 
[[Alive, Alive, Alive]]  in coordinates (1,1) => 8
*/
class WorldGame {
    aliveNeighbors(row: number, column: number): any {

        return this.aliveNeighborsInPreviousRow(row, column) + this.aliveColumnNeighbors(row, column) + this.aliveNeighborsInNextRow(row, column);

    }
    
    private constructor(readonly cellMatrix:Cell[][]) {
    }

    private aliveNeighborsInNextRow(row: number, column: number) {
        const nextRow = row + 1
        if(nextRow >= this.cellMatrix.length) {
            return 0;
        }
        return this.aliveRowNeighbors(nextRow, column);
    }

    private aliveNeighborsInPreviousRow(row: number, column: number) {
        if(row - 1 < 0) {
            return 0;
        }
        return this.aliveColumnNeighbors(row - 1, column);
    }

    private aliveRowNeighbors(nextRow: number, column: number) {
        let aliveNeigbors = 0;
        if (nextRow < this.cellMatrix.length) {
            aliveNeigbors += this.aliveColumnNeighbors(nextRow, column);
        }
        return aliveNeigbors;
    }

    private aliveColumnNeighbors(row: number, column: number) {


        let aliveNeighbors = 0;
        
        const previousColumn = column - 1;
        if (previousColumn >= 0 && this.isAliveCellAt(row, previousColumn)) {
            aliveNeighbors++;
        }
        if (this.isAliveCellAt(row, column)) {
            aliveNeighbors++;
        }
        const nextColumn = column + 1;
        const rowLength = this.cellMatrix[row].length;
        if (nextColumn < rowLength && this.isAliveCellAt(row, nextColumn)) {
            aliveNeighbors++;
        }
        return aliveNeighbors;
    }

    private isThereCellAt(row: number, nextColumn: number) {
        return this.cellMatrix[row][nextColumn] !== undefined;
    }

    private isAliveCellAt(row: number, column: number) {
        return this.cellMatrix[row][column].isAlive();
    }

    static createFrom(initialStatus:CellStatus[][]) {
        const cellMatrix = initialStatus.map(row => row.map(status => Cell.create(status)) );
        return new WorldGame(cellMatrix);
    }

}
const {Alive, Dead} = CellStatus;

describe('The world', ()=> {
    it('create a cell matrix for a given cell status', ()=> {
        let initialStatus = [
            [Dead, Dead , Dead],
            [Dead, Dead , Dead],
            [Dead, Dead , Dead]
        ];
        const world = WorldGame.createFrom(initialStatus);
        expect(world.cellMatrix).toEqual([
            [Cell.create(CellStatus.Dead),  Cell.create(CellStatus.Dead), Cell.create(CellStatus.Dead)],
            [Cell.create(CellStatus.Dead),  Cell.create(CellStatus.Dead), Cell.create(CellStatus.Dead)],
            [Cell.create(CellStatus.Dead),  Cell.create(CellStatus.Dead), Cell.create(CellStatus.Dead)]
        ])
    })
    it('gets alive neighbors for a given coordinates', ()=> {
        expect(WorldGame.createFrom([[Dead]]).aliveNeighbors(0,0)).toBe(0);
 
        expect(WorldGame.createFrom([[Alive, Dead]]).aliveNeighbors(0,1)).toBe(1);
        expect(WorldGame.createFrom([[Dead, Dead]]).aliveNeighbors(0,1)).toBe(0);
        expect(WorldGame.createFrom([[Alive, Dead, Alive]]).aliveNeighbors(0,1)).toBe(2);
        expect(WorldGame.createFrom([[Dead, Dead, Dead]]).aliveNeighbors(0,1)).toBe(0);
        expect(WorldGame.createFrom([
            [Alive, Dead, Alive],
            [Alive, Dead, Alive]]).aliveNeighbors(0,1)).toBe(4);
        expect(WorldGame.createFrom([
                [Alive, Dead, Alive],
                [Alive, Alive, Alive]]).aliveNeighbors(0,1)).toBe(5);

        expect(WorldGame.createFrom([
                [Alive, Dead, Alive],
                [Alive, Dead, Alive],
                [Alive, Dead, Alive]]).aliveNeighbors(1,1)).toBe(6);
    })
})