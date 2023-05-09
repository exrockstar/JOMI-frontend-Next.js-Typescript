import { createContext, PropsWithChildren, useContext, useState } from 'react'
const defaultValue = {
  thankYouModalShown: false,
  matchedInstitutionModalShown: false,
  verifyEmailModal: false,
  articlesViewed: [],
  videosViewed: [],
  videosBlocked: []
}

const context = {
  state: defaultValue,
  setContextState: (state: typeof defaultValue) => {},
  toggleMatchedInstModal: () => {},
  toggleVerifyEmailModal: () => {},
  showVerifyEmailModal: () => {},
  setArticlesViewed: (pub_id: String) => {},
  setVideosViewed: (pub_id: String) => {},
  setVideosBlocked: (pub_id: String) => {}
}

const AppContext = createContext<typeof context>(context)

export const AppStateProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState(context.state)

  const setContextState = (newState: typeof context['state']) => {
    setState(newState)
  }

  const toggleMatchedInstModal = () => {
    setState({
      ...state,
      matchedInstitutionModalShown: !state.matchedInstitutionModalShown
    })
  }

  const toggleVerifyEmailModal = () => {
    setState({
      ...state,
      verifyEmailModal: !state.verifyEmailModal
    })
  }
  const showVerifyEmailModal = () => {
    setState({
      ...state,
      verifyEmailModal: true
    })
  }

  const setArticlesViewed = (pub_id: String) => {
    setState({
      ...state,
      articlesViewed: [...state.articlesViewed, pub_id]
    })
  }

  const setVideosViewed = (pub_id: String) => {
    setState({
      ...state,
      videosViewed: [...state.videosViewed, pub_id]
    })
  }

  const setVideosBlocked = (pub_id: String) => {
    setState({
      ...state,
      videosBlocked: [...state.videosBlocked, pub_id]
    })
  }

  return (
    <AppContext.Provider
      value={{
        state,
        setContextState,
        toggleMatchedInstModal,
        toggleVerifyEmailModal,
        showVerifyEmailModal,
        setArticlesViewed,
        setVideosViewed,
        setVideosBlocked
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

/**
 * Houses all the common state for the application like modals, etc.
 */
export const useAppState = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('no AppStateProvider!')
  }
  return context
}
