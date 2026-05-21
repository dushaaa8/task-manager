export type AuthFormMode = "login" | "register";

export const authFormConfig = {
  login: {
    formClassName: "lg:ml-[20%] lg:w-96 md:w-[70%]",
    title: "Welocme back.",
    subtitle: null as string | null,
    titleClassName: "font-semibold text-2xl pb-8",
    fields: [
      {
        name: "email",
        label: "Email Address",
        type: "email",
        helperText: "Example: mano@gmail.com",
        className: "pb-6",
      },
      {
        name: "password",
        label: "Enter your password",
        type: "password",
        helperText: "Upto 8 characters with an Uppercase, symbol and number",
        className: "lg:w-[90%] mb-4",
      },
    ],
    switchLink: { text: "Dont have an account?", to: "/register" },
    submitText: "Log in",
    buttonClassName: "w-full lg:w-auto",
  },
  register: {
    formClassName: "md:w-[70%] lg:w-96",
    title: "Create an account",
    subtitle: "It's Simple and Easy!!",
    titleClassName: "font-bold text-4xl pb-3",
    fields: [
      {
        name: "name",
        label: "Fullname",
        type: "text",
        helperText: "Example: Name Surname",
        className: "pb-6",
      },
      {
        name: "email",
        label: "Email Address",
        type: "email",
        helperText: "Example: mano@gmail.com",
        className: "pb-6",
      },
      {
        name: "password",
        label: "Enter your password",
        type: "password",
        helperText: "Upto 8 characters with an Uppercase, symbol and number",
        className: "mb-4",
      },
    ],
    switchLink: { text: "Have an account?", to: "/login" },
    submitText: "Create Account",
    buttonClassName: "w-full",
  },
} as const;
