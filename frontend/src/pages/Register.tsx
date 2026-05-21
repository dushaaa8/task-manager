import AuthBanner from "../components/layout/AuthBanner";
import AuthForm from "../components/layout/AuthForm";

export default function Register() {
  return (
    <div className="w-full h-screen flex lg:justify-between justify-center items-center overflow-hidden overscroll-none">
      <AuthBanner isLoginPage={false} />
      <div className="flex-1 flex items-center justify-center">
        <AuthForm mode="register" />
      </div>
    </div>
  );
}
