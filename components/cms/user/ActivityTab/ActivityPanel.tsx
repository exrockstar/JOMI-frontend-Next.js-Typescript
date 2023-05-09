import React from 'react'
import ActivityList from './ActivityList'

type Props = {
  userId: string,
  userAnonID: string
}
const ActivityPanel = ({ userId, userAnonID }: Props) => {
  return (
    <div>
      <ActivityList userId={userId} userAnonID={userAnonID} />
    </div>
  )
}

export default ActivityPanel
