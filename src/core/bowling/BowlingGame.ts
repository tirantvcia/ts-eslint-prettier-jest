export class BowlingGame {
	puntuacion: number;
	bonusExtra: number;

	constructor() {}

	bowling(lanzamientos: string[][]) {
		this.puntuacion = 0;
		this.bonusExtra = 0;

		lanzamientos.forEach((lanzamiento) => {
			this.sumarPuntuacionPorTurno(lanzamiento);
			this.actualizarBonusExtraPorLanzamientoActual(lanzamiento);
		});
		return this.puntuacion;
	}

	lanzamientosExtra(lanzamientos: string[][]) {
		this.puntuacion = 0;
		this.bonusExtra = 0;

		lanzamientos.forEach((lanzamiento) => {
			this.sumarPuntuacionPorTurno(lanzamiento);
		});
		return this.puntuacion;
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
				puntuacionPasada +
				'+' +
				puntuacionParcial +
				'+' +
				sumaPuntosAcumulacionBonus
		);
	
		 ***/
	}

	actualizarBonusExtraPorLanzamientoActual(tiro: string[]) {
		if (this.esTiradaStrike(tiro[0])) {
			this.bonusExtra += 2;
		} else if (this.esTiradaSpare(tiro[1])) {
			this.bonusExtra += 1;
		}
	}

	acumularPuntosPorBonusTiradasAnteriores(primerTiro: string, segundoTiro: string): number {
		let sumaPuntosAcumulacionBonus = 0;

		sumaPuntosAcumulacionBonus = this.calcularPuntosPorBonus(primerTiro);
		if (this.esTiradaStrike(primerTiro)) {
			sumaPuntosAcumulacionBonus += this.calcularPuntosPorBonus(primerTiro);
		}
		if (!this.esTiradaStrike(primerTiro)) {
			sumaPuntosAcumulacionBonus += this.calcularPuntosPorBonus(segundoTiro);
		}
		return sumaPuntosAcumulacionBonus;
	}

	calcularPuntosPorBonus(tiro: string) {
		let sumaPuntosAcumulacionBonus = 0;
		if (this.hayBonusPorTiradaAnterior()) {
			sumaPuntosAcumulacionBonus = this.obtenerCorrespondenciaTiradaPuntos(tiro);
			this.decrementarBonusExtra(1);
		}
		return sumaPuntosAcumulacionBonus;
	}

	obtenerPuntuacionParcialLanzamiento(primerTiro: string, segundoTiro: string): number {
		if (this.esTiradaStrike(primerTiro) || this.esTiradaSpare(segundoTiro)) {
			return 10;
		}
		const puntuacionPrimerTiro = this.obtenerCorrespondenciaTiradaPuntos(primerTiro);
		const puntuacionSegundoTiro = this.obtenerCorrespondenciaTiradaPuntos(segundoTiro);
		return puntuacionPrimerTiro + puntuacionSegundoTiro;
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
