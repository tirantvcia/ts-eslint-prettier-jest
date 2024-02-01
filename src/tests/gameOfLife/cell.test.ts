/*
    Any live cell with fewer than two live neighbors dies,  if coused by underpopulation
    Any live cell with two or three live neighbors lives on to the next generation
    Any live cell with more than three live neighbors dies, on if by overcrowding
    Any dead cell with exactly three live neighbors becomes a live cell
*/
enum CellStatus {
    Dead = 0,
    Alive = 1
}
class Cell {

    constructor(readonly status: CellStatus) {
     
    }

    regenerate(numberOfNeighbors: number) {
        return CellStatus.Dead;    
    }
}

describe('Game of Life', () => {
        it('Any live cell with fewer than two live neighbors dies,  if coused by underpopulation', ()=>{
            const cell : Cell = new Cell(CellStatus.Alive);
            const numberOfNeighbors = 2;
            let nexStatus = cell.regenerate(numberOfNeighbors);
            expect(nexStatus).toBe(CellStatus.Dead);

        })
});