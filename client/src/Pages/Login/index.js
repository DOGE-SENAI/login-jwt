import React, { useState, useEffect } from 'react';
import SignUp from '../../components/SignUp';
import SignIn from '../../components/SignIn';
import PageStructure from '../../components/PageStructure';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import './style.css';

function Login() {
	// Recebe os clicks
	const [clickTab, setClickTab] = useState(true);

	// Troca o Nome do Botão
	const [nameTab, setNameTab] = useState('Criar Conta');

	// Troca display do iconRight
	const [iconRight, setIconRight] = useState('block');

	// Troca display do iconLeft
	const [iconLeft, setIconLeft] = useState('none');

	// Troca display de registration
	const [displayReg, setDisplayReg] = useState('block');

	// Troca display de login
	const [displayLogin, setDisplayLogin] = useState('none');

	useEffect(() => {
		setNameTab((state) => clickTab ? 'Entrar' : 'Criar Conta');

		setDisplayReg((state) => clickTab ? 'block' : 'none');
		setDisplayLogin((state) => clickTab ? 'none' : 'block');

		setIconRight((state) => clickTab ? 'inline' : 'none');
		setIconLeft((state) => clickTab ? 'none' : 'inline');
	}, [clickTab]);

	return (
		<PageStructure>
			<section className="container-main-form">
				<div className="container-main-button">
					<div className="container-button">
						<button
							type="button"
							onClick={e =>
								setClickTab(state => !state)}
						>
							<span style={{
								display: iconLeft,
							}}>
								<FontAwesomeIcon icon={faArrowCircleLeft} />
							</span>
							{nameTab}
							<span style={{
								display: iconRight,
							}}>
								<FontAwesomeIcon icon={faArrowCircleRight} />
							</span>
						</button>
					</div>
				</div>

				<div className="container-form">
					<div style={{
						display: displayReg,
					}}>
						<SignUp />
					</div>

					<div style={{
						display: displayLogin,
					}}>
						<SignIn />
					</div>
				</div>
			</section>
		</PageStructure>
	);
}

export default Login;