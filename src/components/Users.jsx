import React from 'react'
import {getUsersPage} from '../api/axios'
import {useQuery} from 'react-query'
import {useState} from 'react'
import User from './User'

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const {
    isLoading,
    isError,
    error,
    isFetching,
    isPreviousData,
    data: users,
  } = useQuery(['users', currentPage], () => getUsersPage(currentPage), {
    keepPreviousdata: true,
  })

  if (isLoading) return <p>Loading users...</p>

  if (isError) return <p>Error: {error.message}.</p>

  const nextPage = () => setCurrentPage((prev) => prev + 1)
  const prevPage = () => setCurrentPage((prev) => prev - 1)
  const firstPage = () => setCurrentPage(1)
  const lastPage = () => setCurrentPage(users.total_pages)

  const pagesArray = Array(users.total_pages)
    .fill()
    .map((_, index) => index + 1)

  // other possible syntax
  // const pagesArray = [...new Array(users.total_pages).keys()].map(
  //   (_, index) => index + 1
  // )

  const getPagesCut = (pagesArray) => {
    if (currentPage === 1) {
      return pagesArray.slice(0, 3)
    }
    if (currentPage === users.total_pages) {
      return pagesArray.slice(users.total_pages - 3)
    }
    return pagesArray.slice(currentPage - 2, currentPage + 1)
  }

  return (
    <div>
      <h1>Users component</h1>
      <nav>
        <button
          onClick={firstPage}
          disabled={isPreviousData || currentPage === 1}
        >
          First
        </button>
        <button
          onClick={prevPage}
          disabled={isPreviousData || currentPage === 1}
        >
          &lt;&lt;
        </button>

        {/* problematic if high amount of pages / as many button than page */}
        {currentPage > 2 && <span>...</span>}
        {getPagesCut(pagesArray).map((page) => (
          <button
            key={page}
            style={{
              border: page !== currentPage && 'none',
              background: page !== currentPage && 'none',
            }}
            onClick={() => setCurrentPage(page)}
            disabled={isPreviousData}
          >
            {page}
          </button>
        ))}
        {currentPage < users.total_pages - 1 && <span>...</span>}
        <button
          onClick={nextPage}
          disabled={isPreviousData || currentPage === users.total_pages}
        >
          &gt;&gt;
        </button>
        <button
          onClick={lastPage}
          disabled={isPreviousData || currentPage === users.total_pages}
        >
          Last
        </button>
      </nav>

      {isFetching && <span>Loading...</span>}
      {users.data.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  )
}

export default Users
