import React, { memo, useState } from 'react'
import {
  Paper,
  IconButton,
  InputBase,
  Divider,
  PaperProps
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useRouter } from 'next/router'
import { analytics } from 'apis/analytics'
import { amplitudeTrackSearch } from 'apis/amplitude'

function SearchBar(props: PaperProps) {
  const router = useRouter()
  const [focused, setFocused] = useState(false)
  const { q } = router.query

  const [searchTerm, setSearchTerm] = useState(q ?? '')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!!searchTerm) {
      router.push(`/search?q=${searchTerm}`)
      analytics.trackSearch(searchTerm as string)
      amplitudeTrackSearch({
        search_term: searchTerm as string
      })
    } else {
      router.push('/articles')
    }
  }

  return (
    <Paper
      component="form"
      sx={{
        pl: 2.5,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 0.5,
        backgroundColor: 'grey.700',
        color: 'grey.50',
        ...props.sx
      }}
      elevation={0}
      onSubmit={handleSubmit}
    >
      <InputBase
        sx={{
          flex: 1
        }}
        value={searchTerm}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={handleChange}
        placeholder="Search Articles"
        inputProps={{ 'aria-label': 'search articles' }}
      />

      <IconButton
        type="submit"
        sx={{
          p: '10px',
          borderRadius: 0,
          color: 'grey.400',
          '&:hover': {
            backgroundColor: 'none'
          }
        }}
        aria-label="search"
      >
        <SearchIcon color="inherit" />
      </IconButton>
    </Paper>
  )
}

export default memo(SearchBar)
