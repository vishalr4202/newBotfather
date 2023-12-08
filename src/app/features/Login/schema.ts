import * as Yup from "yup";

export const LOGIN_YUPSCHEMA = {
  emailId: Yup.string().required("Please enter Email ID").email('Email format is incorrect'),
  password: Yup.string().required("Please enter Password").min(5)
};
