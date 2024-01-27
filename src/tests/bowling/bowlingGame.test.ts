import { BowlingGame } from './../../core/bowling/BowlingGame';

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
		];
		const extraBonus: string[][] = [
			['X', '-'],
			['X', '-'],

			//bonus por los ultimos strike
		];
		const result = juego.bowling(lanzamientos) + juego.lanzamientosExtra(extraBonus);
		const expected = 300;

		expect(result).toBe(expected);
	});

	it('20 lanzamientos, 10 spare -> 5-5', () => {
		const lanzamientos: string[][] = [
			['5', '/'],
			['5', '/'],
			['5', '/'],
			['5', '/'],
			['5', '/'],
			['5', '/'],
			['5', '/'],
			['5', '/'],
			['5', '/'],
			['5', '/'],
		];
		const extraBonus: string[][] = [
			['5', '-'], //bonus por el ultimo spare
		];
		const result = juego.bowling(lanzamientos) + juego.lanzamientosExtra(extraBonus);
		const expected = 150;

		expect(result).toBe(expected);
	});

	it('20 lanzamientos, 10 spare -> 8-2', () => {
		const lanzamientos: string[][] = [
			['8', '/'],
			['8', '/'],
			['8', '/'],
			['8', '/'],
			['8', '/'],
			['8', '/'],
			['8', '/'],
			['8', '/'],
			['8', '/'],
			['8', '/'],
		];
		const extraBonus: string[][] = [
			['8', '-'], //bonus por el ultimo spare
		];
		const result = juego.bowling(lanzamientos) + juego.lanzamientosExtra(extraBonus);
		const expected = 180;

		expect(result).toBe(expected);
	});
});
