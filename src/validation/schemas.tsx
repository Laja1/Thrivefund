import * as yup from 'yup';

export const SignUpSchema = yup.object({
    firstname: yup.string()
        .required('First name is required')
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must be at most 50 characters'),
    lastname: yup.string()
        .required('Last name is required')
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name must be at most 50 characters'),
    email: yup.string()
        .required('Email is required')
        .email('Invalid email format'),
    phone: yup.string()
        .required('Phone number is required')
        .matches(/^[0-9]+$/, 'Phone number must be digits only')
        .min(10, 'Phone number must be at least 10 digits')
        .max(15, 'Phone number must be at most 15 digits'),
    password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .max(20, 'Password must be at most 20 characters')
        .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        ),
}).required();

export const LoginSchema = yup.object({
    email: yup.string()
        .required('Email is required')
        .email('Invalid email format'),
    password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .max(20, 'Password must be at most 20 characters')
        .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        ),
}).required();

export const paymentSchema = yup.object().shape({
 fundraiserId: yup.string().optional(),
  fullname: yup.string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must be at most 50 characters'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .min(1000, 'Amount must not be less than 1000')
    .required('Amount is required'),
  
  tip: yup.number()
    .transform((value, originalValue) => (originalValue.trim() === '' ? null : value))
    .nullable()
    .optional(),

  anonymity: yup.string().required('Anonymity field is required')
});
