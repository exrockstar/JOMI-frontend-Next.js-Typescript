import { UpdateProfileInput } from 'graphql/types'
import * as Yup from 'yup'

export const initialValues: UpdateProfileInput = {
  firstName: '',
  lastName: '',
  phone: '',
  display_name: '',
  institution_name: '',
  institutional_email: '',
  user_type: 'Other',
  specialty: 'Not Specialized',
  interests: []
}

export const profileSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  phoneNumber: Yup.string(),
  display_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  institution_name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
  institutional_email: Yup.string().email('Invalid email')
})
