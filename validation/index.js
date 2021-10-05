import * as yup from "yup";

const basicUserScheme = {
    email: yup.string().email("Please enter a valid email"),
    username: yup.string().min(3, "Please enter a username longer than 3"),
    password: yup.string(),
}

export const loginScheme = yup.object({
    email: basicUserScheme.email.required("Email must be required!"),
    password: basicUserScheme.password.required("Password must be required!"),
});

export const registerScheme = yup.object({
    email: basicUserScheme.email.required("Email must be required!"),
    username: basicUserScheme.username.required("Username must be required!"),
    password: basicUserScheme.password.required("Password must be required!"),
    confirmPassword: yup.string().when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: yup.string().oneOf([yup.ref("password")], "Password does not match"),
    }),
});

export const userUpdateScheme = yup.object({
    email: basicUserScheme.email.required("Email must be required!"),
    username: basicUserScheme.username.required("Username must be required!"),
    password: basicUserScheme.password,
});

export const profileUpdateScheme = yup.object({
    avatar: yup.string().url("Please enter a valid url image"),
    banner: yup.string().url("Please enter a valid url image")
});

export const fansubScheme = yup.object({
    name: yup.string().min(2, "Please enter a fansub name longer than 2").required("Name must be required!"),
    avatar: yup.string().url("Please enter a valid url image"),
    banner: yup.string().url("Please enter a valid url image"),
});