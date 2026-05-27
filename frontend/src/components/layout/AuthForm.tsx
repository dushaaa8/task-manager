import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, register } from "../../api/auth";
import Button from "../ui/Button";
import Input from "../ui/Input";
import PasswordToggleIcon from "../ui/icons/PasswordToggleIcon";
import { authFormConfig, type AuthFormMode } from "./authFormConfig";

interface Props {
  mode: AuthFormMode;
}

const initialFormData = {
  name: "",
  email: "",
  password: "",
};

export default function AuthForm({ mode }: Props) {
  const config = authFormConfig[mode];
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (mode === "register") {
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
      }

      const data = await login({
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", data.access_token);
      navigate("/tasks");
    } catch (err: any) {
      setError(err.response?.data?.message || "Auth error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={config.formClassName}>
      <h2 className={config.titleClassName}>{config.title}</h2>
      {config.subtitle && (
        <h3 className="text-primary-light-gray pb-8">{config.subtitle}</h3>
      )}

      <div className="pb-20">
        {config.fields.map((field) => (
          <Input
            key={field.name}
            className={field.className}
            label={field.label}
            name={field.name}
            type={
              field.name === "password"
                ? showPassword
                  ? "text"
                  : "password"
                : field.type
            }
            helperText={field.helperText}
            value={formData[field.name]}
            onChange={handleChange}
            iconRight={
              field.name === "password" ? <PasswordToggleIcon /> : undefined
            }
            iconRightFunc={
              field.name === "password"
                ? () => setShowPassword((prev) => !prev)
                : undefined
            }
          />
        ))}
        <Link className="underline lg:hidden" to={config.switchLink.to}>
          {config.switchLink.text}
        </Link>
      </div>

      {error && <p className="text-semantic-error-red text-sm pb-4">{error}</p>}

      <Button
        type="submit"
        size="xl"
        className={config.buttonClassName}
        disabled={isLoading}
      >
        {config.submitText}
      </Button>
    </form>
  );
}
