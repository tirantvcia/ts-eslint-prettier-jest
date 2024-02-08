import { Cell, CellStatus } from "../../core/gameOfLife/Cell"
import { WorldGame } from "../../core/gameOfLife/WorldGame";



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