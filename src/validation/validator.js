import { message } from './messages';
import Validator from 'js-object-validation';

export const validation = (objectToValidate) => {
  const validations = {
    email: {
      email: true,
      required: true,
    },

    firstName: {
      required: true,
      maxlength: 30,
    },
    lastName: {
      required: true,
      maxlength: 30,
    },
    gender: {
      required: true,
    },
    dateOfBirth:{
      required: true,
    }
  };

  const messages = {
    email: {
      email: message.InvalidEmail,
      required: message.RequiredEmail,
    },
    firstName: {
      required: message.RequiredFirstName,
      nameLength: message.LastnameLength,
      alpha: message.nameSpecialCharacter,
    },
    lastName:{
      required: message.RequiredLastName,
      nameLength: message.LastnameLength,
      alpha: message.nameSpecialCharacter,
    },
    gender: {
      required: message.RequiredGender,
    },
    dateOfBirth: {
      required: message.RequiredDateOfBirth,
    },
  };
  const { isValid, errors } = Validator(
    objectToValidate,
    validations,
    messages
  );
  return { isValid, errors };
};
