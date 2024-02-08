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
        const aliveNeighborsInPreviousRow = this.aliveNeighborsInPreviousRow(row, column);
        const aliveNeighborsInCurrentRow = this.aliveNeighborsForCurrentColumn(row, column);
        const aliveNeighborsInNextRow = this.aliveNeighborsInNextRow(row, column);
        return aliveNeighborsInPreviousRow + aliveNeighborsInCurrentRow + aliveNeighborsInNextRow;

    }

    private constructor(readonly cellMatrix: Cell[][]) {
    }

    private aliveNeighborsInNextRow(row: number, column: number) {
       
        if (row + 1 >= this.cellMatrix.length) {
            return 0;
        }
        const nextRow = row + 1;
        let aliveColumnNeighbors = 0;
        if (this.isAliveCellAt(nextRow, column)) {
            aliveColumnNeighbors++;
        }
        aliveColumnNeighbors += this.aliveNeighborsForCurrentColumn(nextRow, column);
     
        return aliveColumnNeighbors;
    }

    private aliveNeighborsInPreviousRow(row: number, column: number) {
        if (row - 1 < 0) {
            return 0;
        }
        const previousRow = row - 1;
        let aliveColumnNeighbors = this.aliveNeighborsForCurrentColumn(previousRow, column);
        if (this.isAliveCellAt(previousRow, column)) {
            aliveColumnNeighbors++;
        }

        return aliveColumnNeighbors;
    }



    private aliveNeighborsForCurrentColumn(row: number, column: number) {


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

    private isAliveCellAt(row: number, column: number) {
        return this.cellMatrix[row][column].isAlive();
    }


}
