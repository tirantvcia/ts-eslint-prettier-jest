
export enum CellStatus {
    Dead = 0,
    Alive = 1
}
export class Cell {

    constructor(readonly status: CellStatus) {
    }

    regenerate(numberOfNeighbors: number) {
        if (numberOfNeighbors === 3) {
            return CellStatus.Alive;
        }

        if (this.status === CellStatus.Alive && numberOfNeighbors === 2) {
            return CellStatus.Alive;
        }

        return CellStatus.Dead;
    }
}
