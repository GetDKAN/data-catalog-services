export const buildPageArray = (
  currentPage,
  numberPagesShown,
  totalPages
) => {
  const pageButtons = [];

  let startPage = currentPage - numberPagesShown;
  let endPage = currentPage + numberPagesShown;
  let totalButtons = numberPagesShown * 2 + 1
  if (startPage < 0) {
    startPage = 0;
  }

  if (endPage > totalPages) {
    endPage = totalPages
  }

  for(let i = 0; i < totalButtons; i++) {
    if (i + startPage < totalPages) {
      pageButtons.push(i + startPage)
    }
  }

  if (endPage <= totalPages - numberPagesShown - 1) {
    pageButtons.push("filler")
  }
  if (endPage <= totalPages - numberPagesShown) {
    pageButtons.push('end')
  }

  if (currentPage > numberPagesShown + 1) {
    pageButtons.unshift("filler")
  }
  if (currentPage > numberPagesShown) {
    pageButtons.unshift('start')
  }

  return pageButtons;
}