import { message } from './messages';
import Validator from 'js-object-validation';

export const validation = (objectToValidate) => {
  const validations = {
    name: {
      required: true,
      maxlength: 50,
      alpha: true,
    },
    address: {
      required: true,
    },
    email: {
      required: true,
      email: true,
      maxlength: 50,
    },
    contactNo: {
      numeric: true,

      required: true,
    },
    personCount: {
      required: true,
    },
    age: {
      numeric: true,
      required: true,
    },
    gender: {
      required: true,
    },
  };

  const messages = {
    email: {
      email: message.InvalidEmail,
      required: message.RequiredEmail,
    },
    name: {
      required: message.Requiredname,
      nameLength: message.LastnameLength,
      alpha: message.nameSpecialCharacter,
    },
    address: {
      required: message.RequiredAddress,
    },
    contactNo: {
      required: message.RequiredContactNo,
      numeric:message.MustBeNumber
    },
    personCount: {
      required: message.RequiredpersonCount,
    },
    age: {
      numeric:message.MustBeNumber,
      required: message.RequiredAge,
    },
    gender: {
      required: message.RequiredGender,
    },
  };
  const { isValid, errors } = Validator(
    objectToValidate,
    validations,
    messages
  );
  return { isValid, errors };
};
