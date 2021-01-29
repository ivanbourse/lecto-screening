import React from 'react';
import { Link } from 'react-router-dom';

const Tutorial = () => {
	return (
		<div className='tutorial-container'>
			<h1>Bienvenido a LectO Screening</h1>
			<div className='instructions-container'>
				<h2>Antes de empezar, debes saber algunas cosas:</h2>
				<ul>
					<li>
						Cuando veas este ícono, significa que debes indicar con las flechas si la respuesta del alumno fue correcta
						o incorrecta.
					</li>
					<li>
						Las preguntas no tienen un tiempo para ser respondidas, aunque almacenamos cuánto se tardó en contestarla
						para obtener estadísticas.
					</li>
					<li>
						Unos días luego de que el examen esté terminado recibirá a su correo electrónico los resultados finales.
					</li>
				</ul>
			</div>
			<Link to='/test'>Continuar</Link>
		</div>
	);
};

export default Tutorial;
