import * as Yup from "yup";

export const registrationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  username: Yup.string()
    .required("Username is required"),

  password: Yup.string()
    .min(10, "Password must be at least 10 characters long")
    .matches(/[A-Z]/, "Password must contain an uppercase letter")
    .matches(/[a-z]/, "Password must contain a lowercase letter")
    .matches(/[0-9]/, "Password must contain a number")
    .matches(/[^A-Za-zäöüß0-9]/, "Password must contain a special character (ä, ö, ü, ß are not allowed)")
    .required("Password is required"),

  passwordRepeat: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Password confirmation is required")
});
