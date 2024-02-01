
export enum CellStatus {
    Dead = 0,
    Alive = 1
}
export class Cell {

    constructor(readonly status: CellStatus) {
    }

    regenerate(numberOfNeighbors: number) {
        return this.isAlive()? 
        this.statusForAliveCell(numberOfNeighbors):
        this.statusForDeadCell(numberOfNeighbors);
    }

    regenerateNew(numberOfNeighbors: number): Cell {
        let nextStatus = this.isAlive()? 
        this.statusForAliveCell(numberOfNeighbors):
        this.statusForDeadCell(numberOfNeighbors);
        return new Cell(nextStatus);
    }

    private statusForAliveCell(numberOfNeighbors: number) {
        let isStablaPolulation = (numberOfNeighbors === 3 || numberOfNeighbors === 2) ;
        return isStablaPolulation?CellStatus.Alive:CellStatus.Dead;

    }
    private statusForDeadCell(numberOfNeighbors: number) {
        return (numberOfNeighbors === 3)? CellStatus.Alive: CellStatus.Dead;
    }

    public isAlive() {
        return this.status === CellStatus.Alive;
    }
}
