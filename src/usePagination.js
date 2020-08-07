import React from "react";

function usePagination(data, itemsPerPage) {
  const [currentPage, setCurrentPage] = React.useState(1);

  let maxPage = 0;
  function currentData() {
    maxPage = Math.ceil(data.length / itemsPerPage);
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  }

  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  return { next, prev, currentData, currentPage, maxPage };
}

export default usePagination;
