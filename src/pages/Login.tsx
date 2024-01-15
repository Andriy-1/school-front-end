import React from 'react';

import Title from '../components/BlockTiitle/Title';
import FormLogin from '../components/login/form/FormLogin';
import { Helmet } from 'react-helmet';

const Login: React.FC = () => {

	return (
		<section className="auth">
			<Helmet>
				<title>Логін</title>
			</Helmet>
			<Title isAddBolean={true} />
			<FormLogin />
		</section>
	);
};

export default Login;
