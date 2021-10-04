import * as yup from "yup";

export const loginScheme = yup.object({
    email: yup.string().email("Please enter a valid email").required("Email must be required!"),
    password: yup.string().required(),
});

export const registerScheme = yup.object({
    email: yup.string().email("Please enter a valid email").required("Email must be required!"),
    username: yup.string().min(3, "Please enter a username longer than 3").required("Username must be required!"),
    password: yup.string().required(),
    confirmPassword: yup.string().when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: yup.string().oneOf([yup.ref("password")], "Password does not match"),
    }),
});

export const fansubScheme = yup.object({
    name: yup.string().min(2, "Please enter a fansub name longer than 2").required("Name must be required!"),
    avatar: yup.string().url("Please enter a valid url image").required("Avatar must be required!"),
});