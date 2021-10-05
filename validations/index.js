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
    }).required("Confirm password must be required!"),
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

export const memberScheme = yup.object({
    username: basicUserScheme.username.required("Username must be required!"),
});

export const episodeScheme = yup.object({
    number: yup.number().min(1).required("Number must be required!"),
    name: yup.string().min(3, "Please enter a username longer than 3").required("Name must be required!"),
    link: yup.string().url("Please enter a valid url").required("Link must be required!")
});

export const animeScheme = yup.object({
    name: yup.object({
        hebrew: yup.string().min(3, "Please enter a Hebrew name longer than 3").required("Hebrew name must be required!"),
        english: yup.string().min(3, "Please enter a English name longer than 3").required("English name must be required!"),
        japanese: yup.string().min(3, "Please enter a Japanese name longer than 3").required("Japanese name must be required!"),
    }),
    genres: yup.array().min(1).required("Genres number must be required!"),
    episodesNumber: yup.number().min(1).required("Episodes number must be required!"),
    summary: yup.string().min(10, "Please enter a summary longer than 10").required("Summary must be required!"),
    image: yup.string().url("Please enter a valid url image"),
});