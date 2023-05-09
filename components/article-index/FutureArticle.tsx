import { ThumbUp } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Chip, CircularProgress, Tooltip } from '@mui/material'
import { styled } from '@mui/material/styles'
import {
  useAddVoteMutation,
  useAllArticleVotesQuery,
  useGetUserArticleVotesQuery,
  useRedactVoteMutation
} from 'graphql/queries/article-index.generated'
import { useUserProfileQuery } from 'graphql/queries/user-profile.generated'
import { useSession } from 'next-auth/react'
import { useSnackbar } from 'notistack'
import React from 'react'
import { Article } from './types'

type Props = {
  article: Article
}

const FutureArticle = ({ article }: Props) => {
  const { data, updateQuery, loading: loadingVotes } = useAllArticleVotesQuery()

  const { data: session } = useSession()

  const { data: userVotes, updateQuery: updateUserVotes } =
    useGetUserArticleVotesQuery({
      skip: !session
    })
  const { enqueueSnackbar } = useSnackbar()
  const [addVote, { loading: addingVote }] = useAddVoteMutation({
    variables: {
      article_title: article.title
    },
    onCompleted(result) {
      enqueueSnackbar('Added vote to article!', { variant: 'success' })
      updateQuery((query) => {
        const updated = query.allArticleVotes.map((vote) => {
          if (vote.t === result.addVote.t) {
            return result.addVote
          }
          return vote
        })

        return {
          allArticleVotes: updated
        }
      })
      updateUserVotes((current) => {
        return {
          userArticleVotes: [...current.userArticleVotes, result.addVote]
        }
      })
    },
    onError(error) {
      enqueueSnackbar(
        `Error occured when voting to article. ${error.message}`,
        { variant: 'error' }
      )
    }
  })
  const [redactVote, { loading: redactingVote }] = useRedactVoteMutation({
    variables: {
      article_title: article.title
    },
    onCompleted(result) {
      enqueueSnackbar('Redacted vote from article!', { variant: 'success' })
      updateQuery((query) => {
        const updated = query.allArticleVotes.map((vote) => {
          if (vote.t === result.redactVote.t) {
            return result.redactVote
          }
          return vote
        })

        return {
          allArticleVotes: updated
        }
      })
      updateUserVotes((current) => {
        return {
          userArticleVotes: current.userArticleVotes.filter(
            (i) => i.t !== result.redactVote.t
          )
        }
      })
    },
    onError(error) {
      enqueueSnackbar(
        `Error occured when voting to article. ${error.message}`,
        { variant: 'error' }
      )
    }
  })
  const vote = data?.allArticleVotes?.find((vote) => vote.t === article.title)

  const votes = vote?.v ?? 0
  const hasUserVoted = userVotes?.userArticleVotes.find(
    (v) => v.t === article.title
  )
  const handleClick = () => {
    if (!hasUserVoted) {
      addVote()
    } else {
      redactVote()
    }
  }
  const loading = addingVote || redactingVote
  const progressIndicator = <ProgressIndicator size={16} sx={{ ml: 1 }} />
  return (
    <Box>
      <VoteArticleButton
        size="small"
        sx={{ ml: 2, px: 2, mb: 0.5, py: 0.25 }}
        onClick={handleClick}
        loading={loading}
        startIcon={
          <ThumbUp sx={{ color: hasUserVoted ? '#71bbde' : '#999' }} />
        }
        loadingIndicator={progressIndicator}
        loadingPosition="start"
      >
        {loadingVotes ? (
          <ProgressIndicator size={16} sx={{ mr: 1 }} />
        ) : (
          <VotesChip>{votes}</VotesChip>
        )}
        {article.title}
      </VoteArticleButton>
    </Box>
  )
}

export default FutureArticle

const ProgressIndicator = styled(CircularProgress)({
  color: '#71bbde'
})
const VoteArticleButton = styled(LoadingButton)({
  backgroundColor: '#EFEFEF',
  color: '#838383',
  ':hover': {
    backgroundColor: '#E9F0FF'
  },
  '& .Mui-disabled': {
    color: '#838383'
  },
  textTransform: 'none'
})

const VotesChip = styled('div')({
  borderRadius: 4,
  backgroundColor: '#FFFFFF',
  color: '#71bbde',
  border: '1px solid #999',
  marginRight: 8,
  fontSize: 12,
  height: 20,
  width: 20,
  lineHeight: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})
