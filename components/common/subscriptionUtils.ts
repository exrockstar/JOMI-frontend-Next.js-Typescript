import { AccessTypeEnum } from 'graphql/types'

export const subscriptionColor = (access: AccessTypeEnum) => {
  switch (access) {
    case AccessTypeEnum.IndividualSubscription:
    case AccessTypeEnum.InstitutionalSubscription:
    case AccessTypeEnum.AdminAccess:
      return 'secondary'
    case AccessTypeEnum.IndividualTrial:
    case AccessTypeEnum.InstitutionalTrial:
    case AccessTypeEnum.AwaitingEmailConfirmation:
    case AccessTypeEnum.EmailConfirmationExpired:
      return 'warning'
    default:
      return 'error'
  }
}

export const subscriptionText = (access: AccessTypeEnum) => {
  switch (access) {
    case AccessTypeEnum.IndividualSubscription:
      return 'Individual'
    case AccessTypeEnum.InstitutionalSubscription:
      return 'Institution'
    case AccessTypeEnum.InstitutionalTrial:
      return 'Institution - Trial'
    case AccessTypeEnum.AwaitingEmailConfirmation:
      return 'Institution - Needs Email Confirmation'
    case AccessTypeEnum.EmailConfirmationExpired:
      return 'Institution - Email Confirmation Expired'
    case AccessTypeEnum.IndividualTrial:
      return 'Individual - Trial'
    case AccessTypeEnum.AdminAccess:
      return 'Admin Access'
    default:
      return 'No subscription'
  }
}
