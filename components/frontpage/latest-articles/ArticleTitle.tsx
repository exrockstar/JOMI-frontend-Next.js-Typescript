import { Link } from '@mui/material'
import { styled } from '@mui/material/styles'

const ArticleTitle = styled(Link)(({ theme }) => ({
  fontWeight: 700,
  marginTop: 16,
  marginBottom: 16,
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  display: '-webkit-box',
  [theme.breakpoints.up('sm')]: {
    height: 69
  }
}))

export default ArticleTitle

ArticleTitle.defaultProps = {
  underline: 'hover'
}
