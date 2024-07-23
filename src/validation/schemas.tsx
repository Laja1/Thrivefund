import { defaultValidation, emailValidation } from '@/lib/utils/validationSchema';
import * as yup from 'yup';


export const paymentSchema = yup.object().shape({
    fundraiserId: yup.string().optional(),
    fullname: defaultValidation('Fullname'),
  email: emailValidation(),
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
