import { MINIMUM_PASSWORD_LENGTH } from '@/lib/constants';
import { string } from 'yup'


export const defaultValidation = (name: string) => string().required(`${name} is required`)

export const phoneValidation = (phoneNumber:string) => string()
    .matches(/^(\+?234)?(\d{3})\s?\d{3}\s?\d{4}$/, 'Enter valid phone number')
    .required(`${phoneNumber} is required`);

export const emailValidation = () => string().email('Invalid email address').required('Email address is required')

export const passwordValidation  = () => string()
        .required('Password is required')
        .min(MINIMUM_PASSWORD_LENGTH, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        )