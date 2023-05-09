import {
  Card,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material'
import { AnnouncementsQuery } from 'graphql/queries/announcements.generated'
import React from 'react'

import AnnouncementRow from './AnnouncementRow'
type Props = {
  announcements: AnnouncementsQuery['announcements']
}

const AnnouncementsList: React.FC<Props> = ({ announcements }) => {
  return (
    <Card>
      <Box sx={{ minWidth: 1050 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Preview</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Enabled</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Last edited by</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Updated at</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {announcements.map((announcement) => {
              return (
                <AnnouncementRow
                  announcement={announcement}
                  key={announcement._id}
                />
              )
            })}
          </TableBody>
        </Table>
      </Box>
    </Card>
  )
}

export default AnnouncementsList
