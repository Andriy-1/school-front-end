import React from 'react';
import { Outlet } from 'react-router-dom';


import Footer from '../components/footer/Footer';
import Header from '../components/header/header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const MainLayouts: React.FC = () => {
	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<Outlet />
			<ToastContainer
				  className="toast-container"
				  position="top-right"
				  autoClose={2000}
				  hideProgressBar={false}
				  newestOnTop={false}
				  closeOnClick
				  rtl={false}
				  pauseOnFocusLoss
				  draggable
				  pauseOnHover={false}
				  theme='light'/>
			</div>
			<Footer />
		</div>
	);
};
export default MainLayouts;
