import auto from '../assets/exercises-images/auto.png';
import cocodrilo from '../assets/exercises-images/cocodrilo.png';
import elefante from '../assets/exercises-images/elefante.png';
import escalera from '../assets/exercises-images/escalera.png';
import estrella from '../assets/exercises-images/estrella.png';
import foca from '../assets/exercises-images/foca.png';
import gato from '../assets/exercises-images/gato.png';
import leon from '../assets/exercises-images/leon.png';
import luna from '../assets/exercises-images/luna.png';
import manzana from '../assets/exercises-images/manzana.png';
import pala from '../assets/exercises-images/pala.png';
import pelota from '../assets/exercises-images/pelota.png';
import pera from '../assets/exercises-images/pera.png';
import perro from '../assets/exercises-images/perro.png';
import flor from '../assets/exercises-images/flor.png';
import tenedor from '../assets/exercises-images/tenedor.png';
import tijera from '../assets/exercises-images/tijera.png';
import dots1 from '../assets/exercises-images/dots-1.png';
import dots2 from '../assets/exercises-images/dots-2.png';
import dots3 from '../assets/exercises-images/dots-3.png';
import dots4 from '../assets/exercises-images/dots-4.png';
import dots5 from '../assets/exercises-images/dots-5.png';
import dots6 from '../assets/exercises-images/dots-6.png';

export const images = {
	auto,
	cocodrilo,
	elefante,
	escalera,
	estrella,
	foca,
	gato,
	leon,
	luna,
	manzana,
	pala,
	pelota,
	pera,
	perro,
	flor,
	tenedor,
	tijera,
	'dots-1': dots1,
	'dots-2': dots2,
	'dots-3': dots3,
	'dots-4': dots4,
	'dots-5': dots5,
	'dots-6': dots6,
};

export const getImage = word => images[word];
