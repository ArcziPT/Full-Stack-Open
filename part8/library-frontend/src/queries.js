import {gql} from '@apollo/client'

export const AUTHORS_BOOKS = gql`query {
    allAuthors{
        name
        bookCount
    }
}`

export const ALL_BOOKS = gql`query {
    allBooks{
        title
        author
        published
    }
}`