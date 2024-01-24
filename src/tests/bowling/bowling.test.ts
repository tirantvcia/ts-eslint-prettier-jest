export function obtenerCorrespondenciaTiradaPuntos(tiro: string) {
	if (tiro === '-') {
		return 0;
	}
	if (tiro === '/' || tiro === 'X') {
		return 10;
	}

	return +tiro;
}

export function sumaPuntuacionAmbosTiros(tiro: string[], bonusForSpareOrStrikesSum: number): [number, number] {
	const puntuacionPrimerTiro = obtenerCorrespondenciaTiradaPuntos(tiro[0]);
	const puntuacionSegundoTiro = obtenerCorrespondenciaTiradaPuntos(tiro[1]);
	let puntuacionParcial = 0;

	let sumaPuntosAcumulacionBonus = 0;
	if (bonusForSpareOrStrikesSum > 0) {
		sumaPuntosAcumulacionBonus += puntuacionPrimerTiro;
		bonusForSpareOrStrikesSum--;
	}
	if (puntuacionPrimerTiro != 10) {
		if (bonusForSpareOrStrikesSum > 0) {
			sumaPuntosAcumulacionBonus += puntuacionSegundoTiro;
			bonusForSpareOrStrikesSum--;
		}
	}

	if (puntuacionPrimerTiro === 10) {
		bonusForSpareOrStrikesSum += 2;
		puntuacionParcial = 10;
	} else if (puntuacionSegundoTiro === 10) {
		bonusForSpareOrStrikesSum += 1;
		puntuacionParcial = 10;
	} else {
		puntuacionParcial = puntuacionPrimerTiro + puntuacionSegundoTiro;
	}
	return [puntuacionParcial + sumaPuntosAcumulacionBonus, bonusForSpareOrStrikesSum];
}

export function bowling(lanzamientos: string[][]) {
	let puntuacionTotalPartida = 0;
	let bonusForSpareOrStrikesSum = 0;
	let puntuacionParcialTirada = 0;
	let puntuacion: [number, number] = [puntuacionParcialTirada, bonusForSpareOrStrikesSum];
	for (let i = 0; i < lanzamientos.length; i++) {
		puntuacion = sumaPuntuacionAmbosTiros(lanzamientos[i], puntuacion[1]);
		puntuacionTotalPartida = puntuacionTotalPartida + puntuacion[0];
		console.log(puntuacion[1] + '->' + puntuacion[0] + '=' + puntuacionTotalPartida);
	}

	return puntuacionTotalPartida;
}

test('20 lanzamientos con 20 fallos seran 0 puntos', () => {
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
	const result = bowling(lanzamientos);
	const expected = 0;

	expect(result).toBe(expected);
});
test('20 lanzamientos con 10 pares de 1, seran 20 puntos', () => {
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
	const result = bowling(lanzamientos);
	const expected = 20;

	expect(result).toBe(expected);
});
test('20 lanzamientos, 1 spare, 1 acierto, 17 fallos, son 21 puntos', () => {
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
	const result = bowling(lanzamientos);
	const expected = 21;

	expect(result).toBe(expected);
});

test('19 lanzamientos, 1 strke con 2 aciertos, el resto fallos, son 20', () => {
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
	const result = bowling(lanzamientos);
	const expected = 20;

	expect(result).toBe(expected);
});
/***
 ***/

test('12 lanzamientos, 12 strikes seran 300', () => {
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
	const result = bowling(lanzamientos);
	const expected = 300;

	expect(result).toBe(expected);
});
