import { Link, useNavigate } from "react-router-dom";
import AuthBg from "../components/ui/AuthBg";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

export default function Register() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex justify-center items-center overflow-hidden overscroll-none">
      <div className="h-screen relative md:max-w-1/2 hidden lg:flex">
        <AuthBg className="h-full w-auto z-0 relative p-2 rotate-180" />
        <div className="flex flex-col absolute w-[90%] z-10 pl-15 top-6">
          <Button
            className="w-45"
            size="lg"
            variant="secondary"
            onClick={() => navigate("/login")}
          >
            Log in
          </Button>
          <h1 className="text-white lg:text-6xl md:text-5xl w-[90%] pt-59 md:pt-79">
            Take your productivity to the next level.
          </h1>
          <h2 className="text-white text-xl w-[90%] pt-59 md:pt-69">
            Copyright 2021 | All rights reserved
          </h2>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <form action="submit" className="md:w-[70%] lg:w-96">
          <h2 className="font-bold text-4xl pb-3">Create an account</h2>
          <h3 className="text-primary-light-gray pb-8">
            It's Simple and Easy!!
          </h3>

          <div className="pb-20">
            <Input
              className="pb-6"
              label="Fullname"
              type="text"
              helperText="Example: Name Surname"
            />
            <Input
              className="pb-6"
              label="Email Address"
              type="email"
              helperText="Example: mano@gmail.com"
            />
            <Input
              className="mb-4"
              label="Enter a password"
              type="password"
              helperText="Upto 8 characters with an Uppercase, symbol and number"
              iconRight={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                    stroke="black"
                    stroke-width="1.3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                    stroke="black"
                    stroke-width="1.3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              }
            />
            <Link className="underline lg:hidden" to={"/login"}>
              Have an account?
            </Link>
          </div>

          <Button
            size="xl"
            className="w-full"
            onClick={() => alert("Account created")}
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}
