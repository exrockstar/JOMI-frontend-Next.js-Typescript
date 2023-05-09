import { ArticlesQuery } from 'graphql/queries/articles.generated'

export type Article = Unpacked<ArticlesQuery['articleOutput']['articles']>
