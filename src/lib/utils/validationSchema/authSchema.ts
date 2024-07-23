import {object} from 'yup'
import { defaultValidation, emailValidation, passwordValidation, phoneValidation } from '.';

export const SignUpSchema = object().shape({

    firstname: defaultValidation('First Name'),
    lastname: defaultValidation('Last Name'),
    email: emailValidation(),
    phone: phoneValidation('Phone Number'),
    password: passwordValidation()

})

export const LoginSchema = object().shape({
    email: emailValidation(),
    password:passwordValidation()
})