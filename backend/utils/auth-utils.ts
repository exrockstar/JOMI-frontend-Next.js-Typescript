import { SocialAuthInput, SocialProviderEnum } from 'graphql/types'
import { Account, Profile, User } from 'next-auth'

export function getAuthInput(
  account: Account,
  profile: Record<string, any>,
  user: User
): SocialAuthInput {
  switch (account.provider) {
    case 'google':
      return getGoogleSocialInfo(profile)
    case 'facebook':
      return getFacebookSocialInfo(profile)
    case 'linkedin':
      return getLinkedInSocialInfo(profile, user)
    // case 'apple': 
    //   return getAppleSocialInfo(profile)
  }
}

function getGoogleSocialInfo(profile: Profile): SocialAuthInput {
  const _profile = profile as any
  return {
    id: profile.sub,
    provider: SocialProviderEnum.Google,
    email: profile.email,
    displayName: profile.name,
    givenName: _profile.given_name as string,
    familyName: _profile.family_name as string
  }
}

function getFacebookSocialInfo(profile: Profile): SocialAuthInput {
  const _profile = profile as any
  return {
    id: _profile.id as string,
    provider: SocialProviderEnum.Facebook,
    email: profile.email,
    displayName: profile.name,
    givenName: _profile.first_name as string,
    familyName: _profile.last_name as string
  }
}

function getLinkedInSocialInfo(profile: Profile, user: User): SocialAuthInput {
  const _profile = profile as any
  return {
    id: _profile.id as string,
    provider: SocialProviderEnum.Linkedin,
    email: user.email,
    givenName: _profile.localizedFirstName as string,
    familyName: _profile.localizedLastName as string
  }
}

// function getAppleSocialInfo(profile: Profile): SocialAuthInput {
//   const _profile = profile as any
//   return {
//     id: profile.sub,
//     provider: SocialProviderEnum.Apple,
//     email: profile.email,
//     displayName: profile.name,
//     givenName: _profile.given_name as string,
//     familyName: _profile.family_name as string
//   }
// }
