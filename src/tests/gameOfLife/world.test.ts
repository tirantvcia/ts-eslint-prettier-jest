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
    
    private constructor(readonly cellMatrix:Cell[][]) {
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
})