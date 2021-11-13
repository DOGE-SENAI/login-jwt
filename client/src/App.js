import React, { useState, useEffect } from 'react';
import PageStructure from './components/PageStructure';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import './App.css';


function App() {

	// Recebe os clicks
	const [clickTab, setClickTab] = useState(true);

	// Troca o Nome do Botão
	const [nameTab, setNameTab] = useState('Criar Conta');

	// Troca display de registration
	const [displayReg, setDisplayReg] = useState("block");

	// Troca display de login
	const [displayLogin, setDisplayLogin] = useState("none");


	useEffect(() => {
	  	setNameTab((state) => clickTab ? 'Entrar' : 'Criar Conta');
	  	setDisplayReg((state) => clickTab ? 'block' : 'none');
	  	setDisplayLogin((state) => clickTab ? 'none' : 'block');
	}, [clickTab]);

	

	return (
		<PageStructure>
			
			<div className="container-button">
				<button
					type="button"
					onClick={e => 
						setClickTab(state => !state)}
				>
					{nameTab}
				</button>
			</div>

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

		</PageStructure>
	);
}

export default App;
