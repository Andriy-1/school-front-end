import React from 'react';

import DocumentItem from '../components/document';
import DocwithFileComponent from '../components/fileForm/docFile';
import Title from '../components/BlockTiitle/Title';

import { useAppSelector } from '../redux/app/hooks';
import { selectDoc } from '../redux/document/select';
import { Helmet } from 'react-helmet';

const Document: React.FC = () => {

	const { items, status } = useAppSelector(selectDoc);

	const [activeElement, setActiveElement] = React.useState(0);

	const handleSwitch = (id: number) => {
		setActiveElement(id);
	};

	return (
		<section className="document">
			<Helmet>
				<title>Документи</title>
			</Helmet>
			
			{items.length ? <>
				{items && items.map((item: any, index: number) => (
					<DocumentItem
						key={index}
						active={activeElement}
						handleSwitch={handleSwitch}
						index={index}
						{...item}
					/>
				))}
			</> : status === 'success' && <Title />}
			<DocwithFileComponent />
		</section>
	);
};

export default Document;
