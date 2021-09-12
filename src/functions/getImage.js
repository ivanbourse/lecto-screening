import moneda from 'assets/exercises-images/moneda.png';

export const images = {
	arbol: 3057,
	ardilla: 2257,
	auto: 2339,
	avion: 2264,
	banco: 36830,
	barco: 8714,
	bloque: 2951,
	boca: 2663,
	bote: 8714,
	camisa: 13640,
	canasta: 3012,
	cara: 2684,
	caracol: 8061,
	casa: 6964,
	cocodrilo: 2343,
	corazon: 4613,
	delfin: 2732,
	dragon: 5572,
	elefante: 2372,
	empanada: 8310,
	escalera: 2379,
	flor: 11395,
	foca: 2397,
	gato: 2406,
	leon: 25187,
	luna: 2933,
	mano: 2928,
	manzana: 2462,
	mariposa: 26200,
	masa: 32476,
	mate: 31036,
	mesa: 4944,
	moneda,
	mono: 2477,
	moño: 2946,
	moto: 2480,
	ojo: 6573,
	oreja: 2871,
	pala: 2867,
	pan: 2494,
	pantalon: 24222,
	pasta: 8652,
	pasto: 3113,
	pato: 2563,
	pelota: 3241,
	pera: 2561,
	perro: 2517,
	pierna: 8666,
	plata: 6183,
	plaza: 6184,
	postre: 35769,
	raton: 2546,
	remedio: 3006,
	remera: 2309,
	remo: 6206,
	rinoceronte: 2550,
	rosa: 3151,
	sal: 25576,
	sandia: 2557,
	sol: 7252,
	sopa: 2573,
	te: 29802,
	tenedor: 2588,
	tijera: 6664,
	tomate: 2594,
	toro: 2595,
	tostada: 2787,
	tren: 2603,
	tres: 35681,
	trompeta: 2607,
};

const removeTildes = word =>
	word
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase();

export const getImage = word => {
	const imageOrCode = images[removeTildes(word)];
	if (typeof imageOrCode === 'number') {
		return `https://static.arasaac.org/pictograms/${imageOrCode}/${imageOrCode}_300.png`;
	}
	return imageOrCode;
};
