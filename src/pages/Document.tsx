import React, { Suspense } from 'react';

import DocwithFileComponent from '../components/fileForm/docFile';
import Title from '../components/BlockTiitle/Title';

import { useAppSelector } from '../redux/app/hooks';
import { selectDoc } from '../redux/document/select';
import { Helmet } from 'react-helmet';
import Loader from '../components/loader/Loader';

const DocumentItem = React.lazy(() => import('../components/document'));
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
			<Suspense fallback={<Loader />}>
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
			</Suspense>
			
			<DocwithFileComponent />
		</section>
	);
};

export default Document;
