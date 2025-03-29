import React from 'react';

const videoMp4 = require('../../img/fullscreen_2025.mp4');

const FullScreen: React.FC = () => {

	return (
		<section className="fullscreen">
				<video className="fullscreen__video video" preload="auto" autoPlay muted loop id="myVideo">
					<source src={videoMp4} />
				</video>
					<div className="video__blur"></div>
			<div className="container">
				<div className="fullscreen__block-content">
					<h1 className="fullscreen__title">
						<span>Вітаємо у світі дітей, знань</span> і можливостей в Копачинській гімназії!
					</h1>
					<p className="fullscreen__subtitle">
					<span>Ласкаво просимо </span> на сторінку нашої навчальної установи, де кожна дитина може розкрити свій потенціал та реалізувати свої найзаповітніші мрії. <span>Копачинська гімназія</span> - це не просто школа, але й особливе місце, де навчання переплітається з вихованням, а ростання здійснюється разом з друзями та вчителями.
					</p>
				</div>
			</div>
		</section>
	);
};

export default FullScreen;
