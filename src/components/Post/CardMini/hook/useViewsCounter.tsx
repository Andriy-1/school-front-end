import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/store';
import { fetchUpdateNewsViews } from '../../../../redux/news/thunk';

const useViewsCounter = (id: number) => {
  const dispatch: AppDispatch = useDispatch();
  const [isViews, setIsViews] = React.useState<boolean>(false);

  React.useEffect(() => {
    const viewsPosts: number[] = JSON.parse(localStorage.getItem('viewsPosts') || '[]');
    const postIsViews: boolean = viewsPosts.includes(id);
    setIsViews(postIsViews);
  }, [id]);

  const updateViews = React.useCallback(
    (id: number, isViews: boolean): void => {
      dispatch(fetchUpdateNewsViews({ id, isViews }));
    },
    [dispatch]
  );

  const handleViewsFocus = (event: React.MouseEvent, postId: number) => {
    event.stopPropagation();
    const viewsPosts: number[] = JSON.parse(localStorage.getItem('viewsPosts') || '[]');
    const postIsViews: boolean = viewsPosts.includes(postId);

    if (postIsViews) {
      const updatedViewsPosts: number[] = viewsPosts.filter((id) => id !== postId);
      localStorage.setItem('viewsPosts', JSON.stringify(updatedViewsPosts));
    } else {
      const updatedViewsPosts: number[] = [...viewsPosts, postId];
      localStorage.setItem('viewsPosts', JSON.stringify(updatedViewsPosts));
    }
    setIsViews(!postIsViews);
    updateViews(id, !postIsViews);
  };

  return { isViews, handleViewsFocus };
};

export default useViewsCounter;
