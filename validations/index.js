import * as yup from "yup";
const invisibleCharcters = /^((?![\u0009\u00A0\u00AD\u034F\u061C\u115F\u1160\u17B4\u17B5\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u2000\u200A\u200B\u200C\u200D\u200E\u200F\u202F\u205F\u2060\u2061\u2062\u2063\u2064\u206A\u206B\u206C\u206D\u206E\u206F\u3000\u2800\u3164\uFEFF\uFFA0]).)*$/
const hasLettersRegex = /\S/;
const notValidString = /^((?!(^\s+)|[^א-תa-zA-Z0-9._ !]|\s+$).)*$/; // check if there are spaces in the beginning and in the end. also allow only letters in English and Hebrew and "!" "_" "."

const basicUserScheme = {
    email: yup.string().email("Please enter a valid email"),
    username: yup.string().min(3, "Please enter a username longer than 3").matches(hasLettersRegex, 'Input is empty!').matches(invisibleCharcters, 'Illegal charcters!').matches(notValidString, 'Not valid string!'),
    password: yup.string().matches(hasLettersRegex, 'Input is empty!').matches(invisibleCharcters, 'Illegal charcters!').matches(notValidString, 'Not valid string!'),
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

export const forgotPasswordScheme = yup.object({
    email: basicUserScheme.email.required("Email must be required!"),
});

export const resetPasswordScheme = yup.object({
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
    avatar: yup.string().url("Please enter a valid url image").nullable(true).matches(hasLettersRegex, 'Input is empty!').matches(invisibleCharcters, 'Illegal charcters!'),
    banner: yup.string().url("Please enter a valid url image").nullable(true).matches(hasLettersRegex, 'Input is empty!').matches(invisibleCharcters, 'Illegal charcters!'),
});

export const fansubScheme = yup.object({
    name: yup.string().min(2, "Please enter a fansub name longer than 2").required("Name must be required!"),
    avatar: yup.string().url("Please enter a valid url image").matches(hasLettersRegex, 'Input is empty!').matches(invisibleCharcters, 'Illegal charcters!'),
    banner: yup.string().url("Please enter a valid url banner").matches(hasLettersRegex, 'Input is empty!').matches(invisibleCharcters, 'Illegal charcters!'),
    website: yup.string().url("Please enter a valid url website").matches(hasLettersRegex, 'Input is empty!').matches(invisibleCharcters, 'Illegal charcters!'),
    description: yup.string().min(10, "Please enter a fansub name longer than 10").required("Description must be required!").matches(hasLettersRegex, 'Input is empty!').matches(invisibleCharcters, 'Illegal charcters!'),
});

export const usernameScheme = yup.object({
    username: basicUserScheme.username.required("Username must be required!"),
});

export const episodeScheme = yup.object({
    number: yup.number().min(1).required("Number must be required!"),
    name: yup.string().min(3, "Please enter a username longer than 3").required("Name must be required!").matches(hasLettersRegex, 'Input is empty!').matches(invisibleCharcters, 'Illegal charcters!'),
    link: yup.string().url("Please enter a valid url").required("Link must be required!").matches(hasLettersRegex, 'Input is empty!').matches(invisibleCharcters, 'Illegal charcters!'),
});

export const commentScheme = yup.object({
    message: yup.string().min(1).required("Message must be required!").matches(hasLettersRegex, 'Input is empty!').matches(invisibleCharcters, 'Illegal charcters!'),
});

export const animeTrackingScheme = yup.object({
    status: yup.string().matches(hasLettersRegex, 'Input is empty!').matches(invisibleCharcters, 'Illegal charcters!'),
    currentEpisode: yup.number().min(1)
});

export const animeScheme = yup.object({
    name: yup.object({
        hebrew: yup.string().min(3, "Please enter a Hebrew name longer than 3").required("Hebrew name must be required!").matches(hasLettersRegex, 'Input is empty!').matches(invisibleCharcters, 'Illegal charcters!'),
        english: yup.string().min(3, "Please enter a English name longer than 3").required("English name must be required!").matches(hasLettersRegex, 'Input is empty!').matches(invisibleCharcters, 'Illegal charcters!'),
        japanese: yup.string().min(3, "Please enter a Japanese name longer than 3").required("Japanese name must be required!").matches(hasLettersRegex, 'Input is empty!').matches(invisibleCharcters, 'Illegal charcters!'),
    }),
    genres: yup.array().min(1).required("Genres number must be required!"),
    episodesNumber: yup.number().min(1).required("Episodes number must be required!"),
    summary: yup.string().min(10, "Please enter a summary longer than 10").required("Summary must be required!").matches(hasLettersRegex, 'Input is empty!').matches(invisibleCharcters, 'Illegal charcters!'),
    image: yup.string().url("Please enter a valid url image").matches(hasLettersRegex, 'Input is empty!').matches(invisibleCharcters, 'Illegal charcters!'),
});

export const banScheme = yup.object({
    username: basicUserScheme.username.required("Username must be required!"),
    expire: yup.date().required('Date is required'),
    reason: yup.string().min(6, "Please enter a reason longer than 10").required("Reason must be required!").matches(hasLettersRegex, 'Input is empty!').matches(invisibleCharcters, 'Illegal charcters!'),
});

export const roleAndPermissionsUpdateScheme = yup.object({
    role: yup.string().min(2, "Please enter a role longer than 2").required("Role must be required!").matches(hasLettersRegex, 'Input is empty!').matches(invisibleCharcters, 'Illegal charcters!'),
    permissions: yup.array()
});