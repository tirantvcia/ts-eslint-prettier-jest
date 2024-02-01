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
        if(this.status === CellStatus.Alive) {
            if(numberOfNeighbors === 2 || numberOfNeighbors === 3){
                return CellStatus.Alive;
            }
        }

        return CellStatus.Dead;    
    }
}

describe('Game of Life', () => {
        it('Any live cell with fewer than two live neighbors dies,  if coused by underpopulation', ()=>{
            const numberOfNeighbors = 1;
            expect(new Cell(CellStatus.Alive).regenerate(numberOfNeighbors)).toBe(CellStatus.Dead);
        })
        it('Any live cell with two or three live neighbors lives on to the next generation', ()=>{
            let numberOfNeighbors = 2;
            expect(new Cell(CellStatus.Alive).regenerate(numberOfNeighbors)).toBe(CellStatus.Alive);
            numberOfNeighbors = 3;
            expect(new Cell(CellStatus.Alive).regenerate(numberOfNeighbors)).toBe(CellStatus.Alive);
            expect(new Cell(CellStatus.Dead).regenerate(numberOfNeighbors)).toBe(CellStatus.Dead);
        })  
});