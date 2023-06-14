import { Box, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { PreviouslyStatedInst } from 'graphql/types'

type Props = {
  institutions?: PreviouslyStatedInst[]
  statedInstitution: string
}
const PreviouslyStatedInstitutions = ({
  institutions,
  statedInstitution
}: Props) => {
  const filtered = institutions.filter((i) => i.name?.trim() !== 'N/A')
  filtered.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  return (
    <Box maxHeight={400}>
      <Typography variant="h5" mt={2}>
        Stated Institutions
      </Typography>
      {institutions.length ? (
        <Box py={2}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderBottomStyle: 'solid',
              borderBottomColor: 'neutral.200',
              py: 0.5
            }}
          >
            <Typography variant="body2" title={statedInstitution}>
              {statedInstitution}
            </Typography>
            <Typography variant="body2" color="text.secondary" flexShrink={0}>
              Current
            </Typography>
          </Box>
          {filtered?.map((inst, i) => {
            return (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                  borderBottomStyle: 'solid',
                  borderBottomColor: 'neutral.200',
                  py: 0.5
                }}
              >
                <Typography variant="body2" title={inst.name}>
                  {inst.name}
                </Typography>
                <Typography
                  key={i}
                  variant="body2"
                  color="text.secondary"
                  flexShrink={0}
                >
                  {dayjs(inst.date).format('L')}
                </Typography>
              </Box>
            )
          })}
        </Box>
      ) : (
        <Typography variant="body2" color="text.secondary">
          None previously stated
        </Typography>
      )}
    </Box>
  )
}

export default PreviouslyStatedInstitutions
