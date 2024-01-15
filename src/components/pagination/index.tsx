import React from 'react';
import ReactPaginate from 'react-paginate';

type PaginationProps = {
  handlePageClick: (event: any) => void;
  pageCount: number;
};
const Pagination: React.FC<PaginationProps> = ({ handlePageClick, pageCount }) => {


  return (
    <ReactPaginate
      className="paginator"
      activeClassName={'paginator__active'}
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={9}
      pageCount={pageCount}
      previousLabel="<"
    />
  );
};
export default Pagination;
