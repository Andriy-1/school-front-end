import React, { startTransition } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import About from './pages/About';
import News from './pages/News';
import Contacts from './pages/Contact';
import Login from './pages/Login';
import MainLayouts from './layouts/MainLayouts';
import { useAppDispatch } from './redux/app/hooks';
import { fetchMe } from './redux/auth/thunk';
import Circle from './pages/Education/Circle';
import Timetable from './pages/Education/Timetable';
import Document from './pages/Document';
import Card from './components/card/Card';
import CardNews from './components/Post/CardMore';

function App() {
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			startTransition(() => {
				dispatch(fetchMe());
			});
		}
	}, [dispatch]);

	return (
		<Routes>
			<Route path="/" element={<MainLayouts />}>
				<Route path="/" element={<Home />} />
				<Route path="about" element={<About />} />
				<Route path="news" element={<News />} />
				<Route path="news/:id" element={<CardNews />} />
				<Route path="education/timetable" element={<Timetable />} />
				<Route path="education/circle" element={<Circle />} />
				<Route path="document" element={<Document />} />
				<Route path="contacts" element={<Contacts />} />
				<Route path="login" element={<Login />} />
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
}

export default App;
