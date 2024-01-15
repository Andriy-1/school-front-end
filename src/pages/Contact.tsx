import React from 'react';

import Title from '../components/BlockTiitle/Title';
import Card from '../components/card/Card';

import contactJpg from '../img/contacts/contact.jpg'
import contactWebp from '../img/contacts/contactWebp.webp'
import { Helmet } from 'react-helmet';

const Contacts: React.FC = () => {
	return (
		<div className='contacts'>
			<Helmet>
				<title>Контакти</title>
			</Helmet>
			<Title isAddBolean={true} />
			<Card isAddBolean={true} photoJpg={contactJpg} photoWebp={contactWebp}  />
		</div>
	);
};

export default Contacts;
