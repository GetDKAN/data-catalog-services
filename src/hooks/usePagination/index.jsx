import {useState, useEffect} from 'react';

const usePagination = (currentPage, totalItems, itemsPerPage, options) => {
  const [pageIndex, setPageIndex] = useState(currentPage);
  const [pages, setPages] = useState(0)
  const [total, setTotalItems] = useState(totalItems);
  const [perPage, setItemsPerPage] = useState(itemsPerPage);
  const [canGoToNext, setCanGoToNext] = useState(false);
  const [canGoToPrevious, setCanGoToPrevious] = useState(false);

  useEffect(() => {
    setPages(Math.ceil(total / perPage))
    setPageIndex(0)
  }, [total, perPage])
  
  useEffect(() => {
    if (pageIndex <= 0) {
      setCanGoToPrevious(false)
    } else {
      setCanGoToPrevious(true)
    }

    if (pageIndex >= pages) {
      setCanGoToNext(false)
    } else {
      setCanGoToNext(true)
    }
  }, [pageIndex, pages])

  function goToNext() {
    let newPage = pageIndex;
    newPage += 1;
    if (newPage < pages){
      setPageIndex(newPage)
    }
  }

  function goToPrevious() {
    let newPage = pageIndex;
    newPage -= 1;
    if (newPage >= 0) {
      setPageIndex(newPage)
    }
  }

  return {
    pageIndex,
    pages,
    canGoToNext,
    canGoToPrevious,
    setPageIndex,
    goToNext,
    goToPrevious,
    setTotalItems,
    setItemsPerPage
  };
};

export default usePagination;
