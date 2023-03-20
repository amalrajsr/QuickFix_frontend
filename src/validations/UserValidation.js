import * as yup from "yup";

export const userSchema = yup.object().shape({
  fullname: yup
    .string()
    .trim()
    .required("Please provide fullname")
    .test(
      "no-spaces",
      "Name should not be empty spaces",
      (value) => value.trim().length > 0
    )
    .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed"),
  // email: yup.string().email().required('please provide email'),
  mobile: yup
    .string()
    .typeError("please provide mobile number")
    .required()
    .matches(/^\d{10}$/, "Phone number is not valid"),
});

export const userLoginSchema = yup.object().shape({
  mobile: yup
    .number("number cannot be empty")
    .positive()
    .integer()
    .min(10, "10 numbers needed")
    .max(10)
    .required(),
});

export const otpSchema = yup.object().shape({
  mobile: yup.number().typeError("please provide otp "),
});
