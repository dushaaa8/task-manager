import React from "react";
import AuthBg from "../components/ui/AuthBg";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function Login() {
  return (
    <div className="w-full h-screen flex justify-between items-center p-2">
      <form action="submit" className="ml-[20%] w-96 h-110">
        <h2 className="font-semibold text-2xl pb-8">Welocme back.</h2>

        <div className="pb-20">
          <Input
            className="pb-6"
            label="Email Address"
            type="email"
            helperText="Example: mano@gmail.com"
          />
          <Input
            className="w-[90%]"
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
        </div>

        <Button className="w-1/2 " size="xl" onClick={() => alert("Loggined!")}>
          Log in
        </Button>
      </form>
      <div className="h-full">
        <AuthBg className="h-full w-auto" />
      </div>
    </div>
  );
}
