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
        return this.aliveColumnNeigbors(column, row);
    }
    
    private constructor(readonly cellMatrix:Cell[][]) {
    }

    private aliveColumnNeigbors(column: number, row: number) {
        let aliveNeighbors = 0;
        const previousColumn = column - 1;

        if (previousColumn >= 0 && this.isAliveCellAt(row, previousColumn)) {
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
    it('gets alive neighbors for a fiven coordinates', ()=> {
        expect(WorldGame.createFrom([[Dead]]).aliveNeighbors(0,0)).toBe(0);
        expect(WorldGame.createFrom([[Alive, Dead]]).aliveNeighbors(0,1)).toBe(1);
        expect(WorldGame.createFrom([[Dead, Dead]]).aliveNeighbors(0,1)).toBe(0);
        expect(WorldGame.createFrom([[Alive, Dead, Alive]]).aliveNeighbors(0,1)).toBe(2);
        expect(WorldGame.createFrom([[Dead, Dead, Dead]]).aliveNeighbors(0,1)).toBe(0);
    })
})