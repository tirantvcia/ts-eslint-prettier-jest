export class BowlingGame {
	puntuacion: number;
	bonusExtra: number;

	constructor() {}

	bowling(turnos: string[][]) {
		this.puntuacion = 0;
		this.bonusExtra = 0;

		turnos.forEach((turno) => {
			this.actualizarPuntuacionPorTurno(turno);
			this.actualizarBonusExtraPorTurno(turno);
		});
		return this.puntuacion;
	}

	lanzamientosExtra(lanzamientos: string[][]) {
		this.puntuacion = 0;
		this.bonusExtra = 0;

		lanzamientos.forEach((lanzamiento) => {
			this.actualizarPuntuacionPorTurno(lanzamiento);
		});
		return this.puntuacion;
	}

	actualizarPuntuacionPorTurno(tiros: string[]) {
		const sumaPuntosAcumulacionBonus = this.acumularPuntosPorBonusTiradasAnteriores(tiros[0], tiros[1]);
		const puntuacionParcial = this.obtenerPuntuacionParcialLanzamiento(tiros[0], tiros[1]);

		this.puntuacion += puntuacionParcial + sumaPuntosAcumulacionBonus;
		/***
		console.log(
			'actualizarPuntuacionPorTurno: ->' +
				tiros[0] +
				',' +
				tiros[1] +
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

	actualizarBonusExtraPorTurno(tiros: string[]) {
		if (this.esTiradaStrike(tiros[0])) {
			this.bonusExtra += 2;
		} else if (this.esTiradaSpare(tiros[1])) {
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
