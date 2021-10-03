import * as yup from "yup";

const registerScheme = yup.object({
    username: yup.string().min(3, "Please enter a username longer than 3").required("Username must be required!");
    email: yup.string().email(3, "Please enter a vali").required("Username must be required!"),
    password: yup.string().required(),
    confirmPassword: yup.string().when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: yup.string().oneOf([yup.ref("password")], "Password does not match")
    }),
})

module.exports = registerScheme