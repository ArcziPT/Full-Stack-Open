import { useMutation, useQuery } from '@apollo/client'  
import React, { useEffect, useState } from 'react'
import { AUTHORS_BOOKS, EDIT_AUTHOR } from '../queries'

export const EditAuthor = (props) => {
  const [ name, setName ] = useState('')
  const [ born, setBorn ] = useState('')
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {refetchQueries: [{query: AUTHORS_BOOKS}]})

  if(!props.show)
    return null

  const submit = (event) => {
    event.preventDefault()

    editAuthor({variables: {name, born: parseInt(born, 10)}})
    setBorn('')
    setName('')
  }

  return (
    <div>
      <h1>EDIT AUTHOR</h1>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>edit</button>
      </form>
    </div>
  )
}

export const Authors = (props) => {
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