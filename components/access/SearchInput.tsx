import { Search } from '@mui/icons-material'
import { Divider, IconButton, InputBase, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'

type Props = {
  onSubmit(searchTerm: string): void
  placeholder?: string
  value?: string
}

const SearchInput = ({ onSubmit, placeholder, value = '' }: Props) => {
  const [_, setFocused] = useState(false)
  const [searchTerm, setSearchTerm] = useState(value)

  useEffect(() => {
    setSearchTerm(value)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(searchTerm)
  }

  useEffect(() => {
    setSearchTerm(value)
  }, [value])
  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: { xs: '100%', md: 400 },
        height: { xs: '70%' },
        my: '10px'
      }}
      onSubmit={handleSubmit}
    >
      <InputBase
        sx={{
          ml: 1,
          flex: 1
        }}
        value={searchTerm}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={handleChange}
        placeholder={placeholder ?? 'Search'}
        inputProps={{ 'aria-label': placeholder }}
      />
      <Divider sx={{ height: 32 }} orientation="vertical" component="div" />
      <IconButton
        type="submit"
        sx={{
          p: '10px',
          borderRadius: 0,
          ':hover': {
            // backgroundColor: 'rgba(255,255,255, 0.2)'
          }
        }}
        aria-label="search"
        color="primary"
      >
        <Search />
      </IconButton>
    </Paper>
  )
}

export default SearchInput
