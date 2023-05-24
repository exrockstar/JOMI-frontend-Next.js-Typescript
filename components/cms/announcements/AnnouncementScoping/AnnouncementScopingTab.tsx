// import { Box, Stack, Typography } from '@mui/material'
// import {
//   useAnnouncementQuery,
//   useUpdateAnnouncementMutation
// } from 'graphql/queries/announcements.generated'
// import { useSession } from 'next-auth/react'
// import { AnnouncementFilterProvider } from './useAnnouncementFilters'
// import { LoadingButton } from '@mui/lab'
// import AddChildButton from './AddChildButton'
// import { useSnackbar } from 'notistack'
// import FilterExpressionList from './FilterExpressionList'
// import SaveFiltersButton from './SaveFiltersButton'
// type Props = {
//   announcementId: string
// }
// const AnnouncementScopingTab = ({ announcementId }: Props) => {
//   const { data: session } = useSession()
//   const { data, refetch } = useAnnouncementQuery({
//     variables: {
//       _id: announcementId
//     },
//     skip: !announcementId || !session
//   })

//   const announcement = data?.announcement
//   const filters = announcement?.filters || []

//   return (
//     <AnnouncementFilterProvider _filters={filters}>
//       <Stack>
//         <Typography variant="h4">Announcement Scoping</Typography>
//         <Typography variant="body2" color="text.secondary">
//           Announcement Scoping allows you to target which users, institutions,
//           or geography will be able to see the announcement. It can also be used
//           as a notification for a specific user.
//         </Typography>
//         <Typography variant="h5" my={2}>
//           Conditions:
//         </Typography>
//         <FilterExpressionList />
//         <Box display={'flex'} gap={2} my={2}>
//           <AddChildButton />
//           <SaveFiltersButton
//             announcement={announcement}
//             onCompleted={refetch}
//           />
//         </Box>
//       </Stack>
//     </AnnouncementFilterProvider>
//   )
// }

// export default AnnouncementScopingTab
