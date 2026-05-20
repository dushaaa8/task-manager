import { Link, useNavigate } from "react-router-dom";
import AuthBg from "../components/ui/AuthBg";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

export default function Login() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex lg:justify-between justify-center items-center overflow-hidden overscroll-none">
      <form action="submit" className="lg:ml-[20%] lg:w-96 md:w-[70%]">
        <h2 className="font-semibold text-2xl pb-8">Welocme back.</h2>

        <div className="pb-20">
          <Input
            className="pb-6"
            label="Email Address"
            type="email"
            helperText="Example: mano@gmail.com"
          />
          <Input
            className="lg:w-[90%] mb-4"
            label="Enter your password"
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
          <Link className="underline lg:hidden" to={"/register"}>
            Dont have an account?
          </Link>
        </div>

        <Button
          className="w-full lg:w-auto"
          size="xl"
          onClick={() => alert("Loggined!")}
        >
          Log in
        </Button>
      </form>
      <div className="h-screen relative md:max-w-1/2 hidden lg:flex">
        <AuthBg className="h-full w-auto z-0 relative p-2" />
        <div className="flex flex-col absolute w-[90%] z-10 items-end top-6">
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate("/register")}
          >
            Create Account
          </Button>
          <h1 className="text-white lg:text-6xl md:text-5xl w-[90%] text-right pt-59 md:pt-79">
            Take your productivity to the next level.
          </h1>
          <h2 className="text-white text-xl w-[90%] text-right pt-59 md:pt-69">
            Copyright 2021 | All rights reserved
          </h2>
        </div>
      </div>
    </div>
  );
}
