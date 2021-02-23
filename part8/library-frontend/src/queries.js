import {gql} from '@apollo/client'

export const AUTHORS_BOOKS = gql`query {
    allAuthors{
        name
        bookCount
    }
}`