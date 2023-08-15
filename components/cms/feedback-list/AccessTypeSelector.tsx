import { Checkbox, FormControlLabel, Typography } from '@mui/material'
import { useField, useFormikContext } from 'formik'
import { AccessTypeEnum } from 'graphql/types'
import { camelCase, uniq } from 'lodash'

type Props = {
  name: string
}
const AccessTypeSelector = ({ name }: Props) => {
  const [field] = useField<string[]>(name)
  const { setFieldValue } = useFormikContext()
  const accessTypes = field.value

  const individualAccessTypes = [
    AccessTypeEnum.IndividualSubscription,
    AccessTypeEnum.IndividualTrial,
    AccessTypeEnum.ArticleRent,
    AccessTypeEnum.ArticlePurchase,
    AccessTypeEnum.Evaluation
  ]
  const institutionalAccessTypes = [
    AccessTypeEnum.InstitutionalSubscription,
    AccessTypeEnum.InstitutionalTrial
  ]
  const otherAccessTypes = [
    AccessTypeEnum.FreeAccess,
    AccessTypeEnum.AdminAccess
  ]
  const fn = (accessType: string) => {
    const checked = accessTypes.includes(accessType)
    const label = accessType.replace(/([A-Z])/g, ' $1')
    return (
      <FormControlLabel
        key={accessType}
        control={
          <Checkbox
            checked={checked}
            onChange={(e) => {
              if (e.target.checked) {
                setFieldValue(name, uniq([...accessTypes, accessType]))
              } else {
                setFieldValue(
                  name,
                  field.value.filter((i) => i !== accessType)
                )
              }
            }}
          />
        }
        label={label}
      />
    )
  }
  return (
    <div>
      <Typography variant="body2" fontWeight={700}>
        Access Types
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Feedback modal will be displayed to users with the selected access
        types.
      </Typography>
      <Typography variant="body2" color="text.secondary" mt={2}>
        Individual Access Types
      </Typography>
      {individualAccessTypes.map(fn)}
      <Typography variant="body2" color="text.secondary" mt={2}>
        Institutional Access Types
      </Typography>
      {institutionalAccessTypes.map(fn)}
      <Typography variant="body2" color="text.secondary" mt={2}>
        Other Access Types
      </Typography>
      {otherAccessTypes.map(fn)}
    </div>
  )
}
export default AccessTypeSelector
