import { Button, Input } from "antd";
import { FormEvent, useContext, useState } from "react";
import { instance } from "../hooks/instance";
import { Context } from "../context/Context";
import Logo from "../assets/logo.svg";

const Login: React.FC = () => {
  const { setToken } = useContext(Context);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleSubmitLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      password: (e.target as HTMLFormElement).password.value,
      usernameoremail: (e.target as HTMLFormElement).email.value,
    };
    instance()
      .post("/login", data)
      .then((res) => {
        setTimeout(() => {
          setToken(res.data.access_token);
          localStorage.setItem("user", JSON.stringify(res.data));
        }, 500);
      })
      .finally(() => {
        setTimeout(() => setIsLoading(false), 500);
      });
    // console.log("bosildi");
  }
  // console.log(token);

  return (
    <div className="login-bg flex items-center justify-center h-[100vh] bg-slate-300">
      <form
        onSubmit={handleSubmitLogin}
        className="w-[500px] p-5 rounded-md bg-white"
        autoComplete="off"
      >
        <img
          className="mx-auto mb-5"
          src={Logo}
          alt="Site logo"
          width={195}
          height={30}
        />
        <label className="">
          <span className="text-[14px] text-slate-500 pl-1 mb-1">
            Enter your email
          </span>
          <Input
            allowClear
            size="large"
            placeholder="Enter your email"
            name="email"
            type="email"
            required
          />
        </label>
        <label className="block mt-5">
          <span className="text-[14px] text-slate-500 pl-1 mb-1">
            Enter your password
          </span>
          <Input.Password
            allowClear
            size="large"
            placeholder="Enter your password"
            name="password"
            type="password"
            required
          />
        </label>
        <Button
          loading={isLoading}
          className="w-full mt-5"
          type="primary"
          size="large"
          htmlType="submit"
        >
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default Login;