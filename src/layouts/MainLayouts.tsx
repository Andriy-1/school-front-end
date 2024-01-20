import React from 'react';
import { Outlet } from 'react-router-dom';


import Footer from '../components/footer/Footer';
import Header from '../components/header/header';

export const MainLayouts: React.FC = () => {
	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};
export default MainLayouts;
