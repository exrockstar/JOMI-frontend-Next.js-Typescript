import { Chip, Stack, StackProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import { analytics } from 'apis/analytics'

import Link from 'next/link'
import { Article } from '../types'

type Props = {
  article: Article
  type: 'regular' | 'compact'
} & StackProps

const Badges: React.FC<Props> = ({ article, type, ...stackProps }) => {
  const { categories, status } = article
  const isPreprint = status === 'preprint'
  const fontSize = type === 'compact' ? 10 : 12
  return (
    <Wrapper spacing={0.5} alignItems="flex-end" {...stackProps}>
      {categories.map((category) => {
        const label = type === 'compact' ? category.short : category.displayName

        return (
          <Link
            href={`/categories/${category.slug}`}
            passHref
            key={category._id}
            prefetch={false}
            legacyBehavior
          >
            <Badge
              sx={{
                backgroundColor: category.color,
                ':hover': {
                  backgroundColor: category.color,
                  border: '1px solid white'
                },
                fontSize
              }}
              onClick={(e) => {
                analytics.event(
                  'Click',
                  `Articles Badge - ${category.displayName}`
                )
              }}
              label={label}
              size="small"
              component="a"
            />
          </Link>
        )
      })}
      {isPreprint && (
        <Badge
          sx={{ backgroundColor: '#ec2426', fontSize }}
          label="Pre-Print"
          size="small"
        />
      )}
    </Wrapper>
  )
}

export default Badges

export const Wrapper = styled(Stack)({
  position: 'absolute',
  top: 6,
  right: 6
})

export const Badge = styled(Chip)<{ component?: any }>({
  color: '#fff',
  borderRadius: 3,
  border: '1px solid rgba(0,0,0,0)'
})
