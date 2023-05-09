import { Add } from '@mui/icons-material'
import { Button, Stack } from '@mui/material'
import React, { useState } from 'react'
import AddOrderDialog from './AddOrderDialog'
import UserOrdersList from './UserOrdersList'

type Props = {
  userId: string
}
const UserOrdersPanel = ({ userId }: Props) => {
  const [showDialog, setShowDialog] = useState(false)

  const startAddOrder = () => setShowDialog(true)
  return (
    <div>
      <Stack
        my={2}
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Add />}
          onClick={startAddOrder}
        >
          Add order
        </Button>
      </Stack>
      <UserOrdersList userId={userId} />
      {showDialog && (
        <AddOrderDialog
          user_id={userId}
          open={showDialog}
          onClose={() => setShowDialog(false)}
        />
      )}
    </div>
  )
}

export default UserOrdersPanel
