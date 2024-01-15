import React from 'react';

import Title from '../../components/BlockTiitle/Title';
import NavigateTimetable from '../../components/NavigateTimetable';

import { useAppSelector } from '../../redux/app/hooks';
import { selectDoc } from '../../redux/document/select';
import { Helmet } from 'react-helmet';

const Timetable: React.FC = () => {
	const { items, status } = useAppSelector(selectDoc);
  return (
	  <> 
		  <Helmet>
				<title>Розклад уроків</title>
			</Helmet>
		  <Title isAddBolean={true} items={items} status={status} />
      <NavigateTimetable />
    </>
  );
};

export default Timetable;
