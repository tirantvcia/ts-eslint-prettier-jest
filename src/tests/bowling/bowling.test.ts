class BowlingGame {
	puntuacion: number;
	bonusExtra: number;

	constructor() {
		this.puntuacion = 0;
		this.bonusExtra = 0;
	}

	bowling(lanzamientos: string[][]) {
		for (let i = 0; i < lanzamientos.length; i++) {
			this.sumarPuntuacionPorTurno(lanzamientos[i]);
			this.computarPorBonusExtraLanzamientoActual(lanzamientos[i]);
		}

		return this.puntuacion;
	}

	hayBonusPorTiradaAnterior(): boolean {
		return this.bonusExtra > 0;
	}

	decrementarBonusExtra(unidades: number) {
		this.bonusExtra -= unidades;
	}

	esTiradaStrike(lanzamiento: string): boolean {
		return lanzamiento === 'X';
	}

	esTiradaSpare(lanzamiento: string): boolean {
		return lanzamiento === '/';
	}

	acumularPuntosPorBonusTiradasAnteriores(primerTiro: string, segundoTiro: string): number {
		let sumaPuntosAcumulacionBonus = 0;
		if (this.hayBonusPorTiradaAnterior()) {
			sumaPuntosAcumulacionBonus += this.obtenerCorrespondenciaTiradaPuntos(primerTiro);
			this.decrementarBonusExtra(1);
		}
		if (!this.esTiradaStrike(primerTiro) && this.hayBonusPorTiradaAnterior()) {
			sumaPuntosAcumulacionBonus += this.obtenerCorrespondenciaTiradaPuntos(segundoTiro);
			this.decrementarBonusExtra(1);
		}
		return sumaPuntosAcumulacionBonus;
	}

	obtenerPuntuacionParcialLanzamiento(primerTiro: string, segundoTiro: string): number {
		if (this.esTiradaStrike(primerTiro) || this.esTiradaSpare(segundoTiro)) {
			return 10;
		} else {
			const puntuacionPrimerTiro = this.obtenerCorrespondenciaTiradaPuntos(primerTiro);
			const puntuacionSegundoTiro = this.obtenerCorrespondenciaTiradaPuntos(segundoTiro);
			return puntuacionPrimerTiro + puntuacionSegundoTiro;
		}
	}

	computarPorBonusExtraLanzamientoActual(tiro: string[]) {
		if (this.esTiradaStrike(tiro[0])) {
			this.bonusExtra += 2;
		} else if (this.esTiradaSpare(tiro[1])) {
			this.bonusExtra += 1;
		}
	}

	sumarPuntuacionPorTurno(tiro: string[]) {
		const sumaPuntosAcumulacionBonus = this.acumularPuntosPorBonusTiradasAnteriores(tiro[0], tiro[1]);
		const puntuacionParcial = this.obtenerPuntuacionParcialLanzamiento(tiro[0], tiro[1]);

		this.puntuacion += puntuacionParcial + sumaPuntosAcumulacionBonus;
		/***
	 	console.log(
			'sumarPuntuacionPorTurno: ->' +
				tiro[0] +
				',' +
				tiro[1] +
				',' +
				this.puntuacion +
				' = ' +
				puntuacionParcial +
				'+' +
				sumaPuntosAcumulacionBonus
		);
		***/
	}

	obtenerCorrespondenciaTiradaPuntos(tiro: string) {
		if (tiro === '-') {
			return 0;
		}
		if (this.esTiradaSpare(tiro) || this.esTiradaStrike(tiro)) {
			return 10;
		}

		return +tiro;
	}
}

describe('El juego de Bowling', () => {
	let juego: BowlingGame;

	beforeEach(() => {
		juego = new BowlingGame();
	});
	it('20 lanzamientos con 20 fallos seran 0 puntos', () => {
		const lanzamientos: string[][] = [
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
		];
		const result = juego.bowling(lanzamientos);
		const expected = 0;

		expect(result).toBe(expected);
	});
	it('20 lanzamientos con 10 pares de 1, seran 20 puntos', () => {
		const lanzamientos: string[][] = [
			['1', '1'],
			['1', '1'],
			['1', '1'],
			['1', '1'],
			['1', '1'],
			['1', '1'],
			['1', '1'],
			['1', '1'],
			['1', '1'],
			['1', '1'],
		];
		const result = juego.bowling(lanzamientos);
		const expected = 20;

		expect(result).toBe(expected);
	});
	it('20 lanzamientos, 1 spare, 1 acierto, 17 fallos, son 21 puntos', () => {
		const lanzamientos: string[][] = [
			['5', '/'],
			['5', '1'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
		];
		const result = juego.bowling(lanzamientos);
		const expected = 21;

		expect(result).toBe(expected);
	});

	it('19 lanzamientos, 1 strke con 2 aciertos, el resto fallos, son 20', () => {
		const lanzamientos: string[][] = [
			['X', '-'],
			['2', '3'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
			['-', '-'],
		];
		const result = juego.bowling(lanzamientos);
		const expected = 20;

		expect(result).toBe(expected);
	});

	it('12 lanzamientos, 12 strikes seran 300', () => {
		const lanzamientos: string[][] = [
			['X', '-'],
			['X', '-'],
			['X', '-'],
			['X', '-'],
			['X', '-'],
			['X', '-'],
			['X', '-'],
			['X', '-'],
			['X', '-'],
			['X', '-'],
			['X', '-'],
			['X', '-'],
		];
		const result = juego.bowling(lanzamientos);
		const expected = 300;

		expect(result).toBe(expected);
	});
});
