import { AuthorsQuery } from 'graphql/queries/authors.generated'

export type Article = Unpacked<AuthorsQuery['authors']>
