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

	actualizarPuntuacionPorTurno(lanzamientos: string[]) {
		const sumaPuntosAcumulacionBonus = this.acumularPuntosPorBonusTiradasAnteriores(lanzamientos[0], lanzamientos[1]);
		const puntuacionParcial = this.obtenerPuntuacionParcialLanzamiento(lanzamientos[0], lanzamientos[1]);

		this.puntuacion += puntuacionParcial + sumaPuntosAcumulacionBonus;
		/***
		console.log(
			'actualizarPuntuacionPorTurno: ->' +
				lanzamientos[0] +
				',' +
				lanzamientos[1] +
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

	actualizarBonusExtraPorTurno(lanzamientos: string[]) {
		if (this.esTiradaStrike(lanzamientos[0])) {
			this.bonusExtra += 2;
		} else if (this.esTiradaSpare(lanzamientos[1])) {
			this.bonusExtra += 1;
		}
	}

	acumularPuntosPorBonusTiradasAnteriores(primerLanzamiento: string, segundoLanzamiento: string): number {
		let sumaPuntosAcumulacionBonus = 0;

		sumaPuntosAcumulacionBonus = this.calcularPuntosPorBonus(primerLanzamiento);
		if (this.esTiradaStrike(primerLanzamiento)) {
			sumaPuntosAcumulacionBonus += this.calcularPuntosPorBonus(primerLanzamiento);
		}
		if (!this.esTiradaStrike(primerLanzamiento)) {
			sumaPuntosAcumulacionBonus += this.calcularPuntosPorBonus(segundoLanzamiento);
		}
		return sumaPuntosAcumulacionBonus;
	}

	calcularPuntosPorBonus(lanzamiento: string) {
		let sumaPuntosAcumulacionBonus = 0;
		if (this.hayBonusPorTiradaAnterior()) {
			sumaPuntosAcumulacionBonus = this.obtenerCorrespondenciaTiradaPuntos(lanzamiento);
			this.decrementarBonusExtra(1);
		}
		return sumaPuntosAcumulacionBonus;
	}

	obtenerPuntuacionParcialLanzamiento(primerLanzamiento: string, segundoLanzamiento: string): number {
		if (this.esTiradaStrike(primerLanzamiento) || this.esTiradaSpare(segundoLanzamiento)) {
			return 10;
		}
		const puntuacionPrimerLanzamiento = this.obtenerCorrespondenciaTiradaPuntos(primerLanzamiento);
		const puntuacionSegundoLanzamiento = this.obtenerCorrespondenciaTiradaPuntos(segundoLanzamiento);
		return puntuacionPrimerLanzamiento + puntuacionSegundoLanzamiento;
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

	obtenerCorrespondenciaTiradaPuntos(lanzamiento: string) {
		if (lanzamiento === '-') {
			return 0;
		}
		if (this.esTiradaSpare(lanzamiento) || this.esTiradaStrike(lanzamiento)) {
			return 10;
		}

		return +lanzamiento;
	}
}
