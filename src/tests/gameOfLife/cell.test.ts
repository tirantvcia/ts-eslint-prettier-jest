import { Cell } from './../../core/gameOfLife/Cell';
import { CellStatus } from './../../core/gameOfLife/Cell';


/*
    Any live cell with fewer than two live neighbors dies,  if coused by underpopulation
    Any live cell with two or three live neighbors lives on to the next generation
    Any live cell with more than three live neighbors dies, on if by overcrowding
    Any dead cell with exactly three live neighbors becomes a live cell
*/

describe('Game of Life', () => {
        it('Any live cell with fewer than two live neighbors dies, as if coused by underpopulation', ()=>{
            const numberOfNeighbors = 1;
            expect(new Cell(CellStatus.Alive).regenerate(numberOfNeighbors)).toBe(CellStatus.Dead);
            expect(new Cell(CellStatus.Alive).regenerateNew(numberOfNeighbors).isAlive()).toBe(false);
        })
        it('Any live cell with two or three live neighbors lives on to the next generation', ()=>{
            let numberOfNeighbors = 2;
            expect(new Cell(CellStatus.Alive).regenerate(numberOfNeighbors)).toBe(CellStatus.Alive);
            expect(new Cell(CellStatus.Dead).regenerate(numberOfNeighbors)).toBe(CellStatus.Dead);
            numberOfNeighbors = 3;
            expect(new Cell(CellStatus.Alive).regenerate(numberOfNeighbors)).toBe(CellStatus.Alive);

            numberOfNeighbors = 2;
            expect(new Cell(CellStatus.Alive).regenerateNew(numberOfNeighbors).isAlive()).toBe(true);
            expect(new Cell(CellStatus.Dead).regenerateNew(numberOfNeighbors).isAlive()).toBe(false);
            numberOfNeighbors = 3;
            expect(new Cell(CellStatus.Alive).regenerateNew(numberOfNeighbors).isAlive()).toBe(true);

            
        })  
        it('Any live cell with more than three live neighbors dies, as if by overcrowding', ()=>{
            let numberOfNeighbors = 4;
            expect(new Cell(CellStatus.Alive).regenerate(numberOfNeighbors)).toBe(CellStatus.Dead);
            expect(new Cell(CellStatus.Dead).regenerate(numberOfNeighbors)).toBe(CellStatus.Dead);

            expect(new Cell(CellStatus.Alive).regenerateNew(numberOfNeighbors).isAlive()).toBe(false);
            expect(new Cell(CellStatus.Dead).regenerateNew(numberOfNeighbors).isAlive()).toBe(false);
        })  
        it('Any dead cell with exactly three live neighbors becomes a live cell', ()=>{
            let numberOfNeighbors = 3;
            expect(new Cell(CellStatus.Dead).regenerate(numberOfNeighbors)).toBe(CellStatus.Alive);
            expect(new Cell(CellStatus.Dead).regenerateNew(numberOfNeighbors).isAlive()).toBe(true);
    
        })          
});