import * as Yup from 'yup'

interface FormValues {
  oldPassword: string
  newPassword: string
  newPassword2: string
}

export const initialValues: FormValues = {
  oldPassword: '',
  newPassword: '',
  newPassword2: ''
}

export const noPasswordSetSchema = Yup.object({
  newPassword: Yup.string()
    .notOneOf(
      [Yup.ref('oldPassword'), null],
      'New password should not be the same'
    )
    .required('Password is required')
    .min(8, 'Password must be atleast 8 characters'),
  newPassword2: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Password confirm is required')
    .min(8, 'Password must be atleast 8 characters')
})

export const hasPasswordSetSchema = noPasswordSetSchema.shape({
  oldPassword: Yup.string().required('Password is required')
})
