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
    .typeError("field cant be empty")
    .required('field cant be empty')
    .matches(/^\d{10}$/, "mobile number is not valid"),
});

export const userLoginSchema = yup.object().shape({
  mobile: yup
    .string()
    .typeError("field cant be empty")
    .required('field cant be empty')
    .matches(/^\d{10}$/, "mobile number is not valid")
});

export const otpSchema = yup.object().shape({
  mobile: yup.number().typeError("please provide otp "),
});

export const adminSchema= yup.object().shape({
  name:yup.string().required('name is required'),
  password:yup.string().required('password is required')
})

export const serviceSchema= yup.object().shape({
  service:yup.string().required('name is required'),
  // image: yup
  // .mixed()
  // .required('Image is required'),
  installationCharge1Hour: yup
  .number()
  .typeError("field cant be empty")
  .required('field cant be empty'),
  installationChargeLatelyHours: yup
  .number()
  .typeError("field cant be empty")
  .required("field cant be empty"),
  repairCharge1Hour: yup
  .number()
  .typeError("field cant be empty")
  .required("field cant be empty"),
  repairChargeLatelyHours: yup
  .number()
  .typeError("field cant be empty")
  .required("field cant be empty"),

})