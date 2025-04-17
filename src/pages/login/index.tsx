import { Input, Button } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_KEYS, STORAGE_KEYS } from "../../utils/constants";

interface LoginFormType {
  username: string;
  password: string;
}
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormType>({
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, "token");
    localStorage.setItem(STORAGE_KEYS.USERNAME, formData.username);
    setFormData({ username: "", password: "" });
    navigate(ROUTE_KEYS.TRANSACTIONS);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }


  const isLoginDisabled = !formData.username || !formData.password;
  return (
    <div className="max-w-[400px] mx-auto p-4">
      <h2 className="text-2xl font-medium mb-10 text-center">
        Login to your account
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div>
            <label htmlFor="username" className="text-xl mb-2">
              Username
            </label>
            <Input
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full"
              type="text"
              size="large"
              id="username"
              name="username"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-xl mb-2">
              Password
            </label>
            <Input
              value={formData.password}
              onChange={handleChange}
              name="password"
              placeholder="Password"
              className="w-full"
              type="password"
              size="large"
              id="password"
            />
          </div>

          <Button
            type="primary"
            size="large"
            className="w-full"
            htmlType="submit"
            disabled={isLoginDisabled}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
