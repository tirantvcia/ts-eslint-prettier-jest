import { Cell, CellStatus } from "../../core/gameOfLife/Cell"
import { WorldGame } from "../../core/gameOfLife/WorldGame";

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
    it('generate the next state of the game', ()=> {
        const world = WorldGame.createFrom([
            [Dead, Alive, Dead],
            [Dead, Alive, Dead],
            [Dead, Alive, Dead]]);

            const nextState = world.nextGenerarion().cellMatrix;

            expect(nextState).toEqual([
                [Cell.create(CellStatus.Dead),  Cell.create(CellStatus.Dead), Cell.create(CellStatus.Dead)],
                [Cell.create(CellStatus.Alive),  Cell.create(CellStatus.Alive), Cell.create(CellStatus.Alive)],
                [Cell.create(CellStatus.Dead),  Cell.create(CellStatus.Dead), Cell.create(CellStatus.Dead)]
            ]);
    })
})