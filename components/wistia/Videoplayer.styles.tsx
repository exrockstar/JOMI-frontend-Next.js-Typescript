import { styled } from '@mui/material/styles'

export const VideoContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  paddingTop: '56.25%'
}))

export const VideoOverlay = styled('div')({
  transition: 'width 0.5s 0.5s, height 0.5s 0.5s, opacity 0.6s;',
  position: 'absolute',
  bottom: '2.5em',
  borderRaidus: '0 2px 2px 0',
  color: '#ccc',
  backgroundColor: '#000c',
  padding: '2px 7px'
})
