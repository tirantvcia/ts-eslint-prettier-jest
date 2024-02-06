import { Cell, CellStatus } from "./Cell";


export class WorldGame {
    static createFrom(initialStatus: CellStatus[][]) {
        const cellMatrix = initialStatus.map(row => row.map(status => Cell.create(status)));
        return new WorldGame(cellMatrix);
    }

    nextGenerarion() {
        const cellMatrix = this.cellMatrix.map(
            (row, rowIndex) => row.map((cell, columnIndex) => cell.regenerate(this.aliveNeighbors(rowIndex, columnIndex))));
        return new WorldGame(cellMatrix);
    }
    aliveNeighbors(row: number, column: number): any {

        return this.aliveNeighborsInPreviousRow(row, column) + this.aliveColumnNeighbors(row, column) + this.aliveNeighborsInNextRow(row, column);

    }

    private constructor(readonly cellMatrix: Cell[][]) {
    }

    private aliveNeighborsInNextRow(row: number, column: number) {
        const nextRow = row + 1;
        if (nextRow >= this.cellMatrix.length) {
            return 0;
        }
        return this.aliveRowNeighbors(nextRow, column);
    }

    private aliveNeighborsInPreviousRow(row: number, column: number) {
        if (row - 1 < 0) {
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


}
