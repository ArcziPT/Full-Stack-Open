import { useQuery } from '@apollo/client'  
import React, { useEffect } from 'react'
import { AUTHORS_BOOKS } from '../queries'

const Authors = (props) => {
  const authors = useQuery(AUTHORS_BOOKS)
  
  if (!props.show) {
    return null
  }

  if(authors.loading)
    return (
      <div>
        <p>LOADING...</p>
      </div>
    )

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default Authors
