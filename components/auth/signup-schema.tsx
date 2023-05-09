import { Regex } from 'common/regex'
import { object, string, ref } from 'yup'

export const signupSchema = object({
  email: string()
    .required('Email is required')
    .email('Please enter a valid email.'),
  firstName: string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters')
    .required('First name is required'),
  lastName: string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters')
    .required('Last name is required'),
  phoneNumber: string().optional(),
  // .matches(Regex.Phone, 'Please enter a valid phone number.'),
  password: string()
    .required('Password is required')
    .min(8, 'Your password must be at least 8 characters long'),
  confirmPassword: string()
    .oneOf([ref('password'), null], 'Passwords must match')
    .required('Please retype your password')
})
