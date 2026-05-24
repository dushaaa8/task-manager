import { useNavigate } from "react-router-dom";
import AuthBg from "../ui/AuthBg";
import Button from "../ui/Button";

interface Props {
  isLoginPage: boolean;
}

const bannerConfig = {
  login: {
    bgClass: "h-full w-auto z-0 relative p-2",
    contentClass: "flex flex-col absolute w-[90%] z-10 items-end top-6",
    titleClass:
      "text-white lg:text-6xl md:text-5xl w-[90%] text-right pt-59 md:pt-79",
    footerClass: "text-white text-xl w-[90%] text-right pt-59 md:pt-69",
    buttonText: "Create Account",
    buttonClass: undefined as string | undefined,
    to: "/register",
  },
  register: {
    bgClass: "h-full w-auto z-0 relative p-2 rotate-180",
    contentClass: "flex flex-col absolute w-[90%] z-10 pl-15 top-6",
    titleClass: "text-white lg:text-6xl md:text-5xl w-[90%] pt-59 md:pt-79",
    footerClass: "text-white text-xl w-[90%] pt-59 md:pt-69",
    buttonText: "Log in",
    buttonClass: "w-45",
    to: "/login",
  },
} as const;

export default function AuthBanner({ isLoginPage }: Props) {
  const navigate = useNavigate();
  const config = isLoginPage ? bannerConfig.login : bannerConfig.register;

  return (
    <div className="h-screen relative md:max-w-1/2 hidden lg:flex">
      <AuthBg className={config.bgClass} />
      <div className={config.contentClass}>
        <Button
          className={config.buttonClass}
          size="lg"
          variant="secondary"
          onClick={() => navigate(config.to)}
        >
          {config.buttonText}
        </Button>
        <h1 className={config.titleClass}>
          Take your productivity to the next level.
        </h1>
        <h2 className={config.footerClass}>
          Copyright 2021 | All rights reserved
        </h2>
      </div>
    </div>
  );
}
