import { Delete } from '@mui/icons-material'
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { StyledTableRow } from 'components/common/StyledTableRow'
import dayjs from 'dayjs'
import {
  UserDetailDocument,
  UserDetailQuery
} from 'graphql/cms-queries/user-list.generated'
import { useRemoveTemporaryAccessByIdMutation } from 'graphql/mutations/temp-access.generated'
import React from 'react'
type Props = {
  user: UserDetailQuery['userById']
}
const TemporaryAccess = ({ user }: Props) => {
  const length = user.offsiteAccesses?.length
  const [removeTemporaryAccess, { client }] =
    useRemoveTemporaryAccessByIdMutation({
      onCompleted() {
        client.refetchQueries({
          include: [UserDetailDocument]
        })
      }
    })

  return (
    <div>
      <Typography variant="h4">Offsite Access</Typography>
      <Typography variant="caption" color="text.secondary">
        Institution users are granted two weeks access to JOMI from outside
        their institution premises
      </Typography>
      <Table sx={{ my: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Source IP</TableCell>
            <TableCell>Expiry Date</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {length ? (
            user.offsiteAccesses?.map((item) => {
              return (
                <StyledTableRow key={item._id}>
                  <TableCell>{item.source_ip}</TableCell>
                  <TableCell>
                    {dayjs(item.expiresAt).format('MM/DD/YYYY HH:mm:ss A')}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      title="Remove Off-site Accesses"
                      onClick={() => {
                        removeTemporaryAccess({
                          variables: { _id: item._id }
                        })
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              )
            })
          ) : (
            <StyledTableRow>
              <TableCell>
                This user has not accessed JOMI from outside their institution
                premises.
              </TableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default TemporaryAccess
