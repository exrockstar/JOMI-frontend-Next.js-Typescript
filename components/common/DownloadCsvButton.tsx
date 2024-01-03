import React from 'react'
import { LoadingButton } from '@mui/lab'
import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'

const DownloadCsvButton = ({ csvProgress, ...btnProps }) => {
  return (
    <>
      <LoadingButton
        {...btnProps}
        startIcon={<DownloadIcon />}
        variant="outlined"
        loadingIndicator={
          <Stack direction={'row'} sx={{ display: 'inline-flex' }}>
            <CircularProgress
              size={36}
              thickness={2}
              // value={csvProgress}
              // variant="determinate"
              // sx={{ color: 'gray' }}
            />
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                right: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography variant="body2" sx={{ fontSize: 12 }}>
                {csvProgress + '%'}
              </Typography>
            </Box>
          </Stack>
        }
      >
        Download Table as CSV
      </LoadingButton>
    </>
  )
}

export default DownloadCsvButton
