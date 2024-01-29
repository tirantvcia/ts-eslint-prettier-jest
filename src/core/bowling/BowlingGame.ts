export class BowlingGame {
	private score: number;
	private extraBonus: number;

	constructor() {}

	bowling(frames: string[][]) {
		this.score = 0;
		this.extraBonus = 0;

		frames.forEach((frame) => {
			this.updateScorePerFrame(frame);
			this.updateExtraBonusPerFrame(frame);
		});
		return this.score;
	}

	extraShots(shots: string[][]) {
		this.score = 0;
		this.extraBonus = 0;

		shots.forEach((shot) => {
			this.updateScorePerFrame(shot);
		});
		return this.score;
	}

	private updateScorePerFrame(shots: string[]) {
		const accumulatedPointsForPreviousBonus = this.sumPointsForPreviousBonusShots(shots[0], shots[1]);
		const partialScore = this.getPartialScoreForShot(shots[0], shots[1]);

		this.score += partialScore + accumulatedPointsForPreviousBonus;
		/***
		console.log(
			'updateScorePerFrame: ->' +
				shots[0] +
				',' +
				shots[1] +
				',' +
				this.score +
				' = ' +
				puntuacionPasada +
				'+' +
				partialScore +
				'+' +
				accumulatedPointsForPreviousBonus
		);
	
		 ***/
	}

	private updateExtraBonusPerFrame(shots: string[]) {
		if (this.isStrikeShot(shots[0])) {
			this.extraBonus += 2;
		} else if (this.isSpareShot(shots[1])) {
			this.extraBonus += 1;
		}
	}

	private sumPointsForPreviousBonusShots(firstShot: string, secondShot: string): number {
		let accumulatedPointsForPreviousBonus = 0;

		accumulatedPointsForPreviousBonus = this.calculatePointsByBonus(firstShot);
		if (this.isStrikeShot(firstShot)) {
			accumulatedPointsForPreviousBonus += this.calculatePointsByBonus(firstShot);
		}
		if (!this.isStrikeShot(firstShot)) {
			accumulatedPointsForPreviousBonus += this.calculatePointsByBonus(secondShot);
		}
		return accumulatedPointsForPreviousBonus;
	}

	private calculatePointsByBonus(shot: string) {
		let accumulatedPointsForPreviousBonus = 0;
		if (this.isThereAccumulatedBonus()) {
			accumulatedPointsForPreviousBonus = this.mappingShotToPoints(shot);
			this.decreaseExtraBonus(1);
		}
		return accumulatedPointsForPreviousBonus;
	}

	private getPartialScoreForShot(firstShot: string, secondShot: string): number {
		if (this.isStrikeShot(firstShot) || this.isSpareShot(secondShot)) {
			return 10;
		}
		const firstShotScore = this.mappingShotToPoints(firstShot);
		const secongShotScore = this.mappingShotToPoints(secondShot);
		return firstShotScore + secongShotScore;
	}

	private isThereAccumulatedBonus(): boolean {
		return this.extraBonus > 0;
	}

	private decreaseExtraBonus(unidades: number) {
		this.extraBonus -= unidades;
	}

	private isStrikeShot(shot: string): boolean {
		return shot === 'X';
	}

	private isSpareShot(shot: string): boolean {
		return shot === '/';
	}

	private mappingShotToPoints(shot: string) {
		if (shot === '-') {
			return 0;
		}
		if (this.isSpareShot(shot) || this.isStrikeShot(shot)) {
			return 10;
		}

		return +shot;
	}
}
