import AuthBanner from "../components/layout/AuthBanner";
import AuthForm from "../components/layout/AuthForm";

export default function Login() {
  return (
    <div className="w-full h-screen flex lg:justify-between justify-center items-center overflow-hidden overscroll-none">
      <AuthForm mode="login" />
      <AuthBanner isLoginPage={true} />
    </div>
  );
}
