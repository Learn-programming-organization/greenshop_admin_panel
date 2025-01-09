import { Button, Input } from "antd";
import { FormEvent, useContext, useState } from "react";
import { instance } from "../hooks/instance";
import { Context } from "../context/Context";

const Login: React.FC = () => {
  const { setToken } = useContext(Context);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
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
        }, 1000);
      })
      .finally(() => {
        setTimeout(() => setIsLoading(false), 1000);
      });
    console.log("bosildi");
  }
  // console.log(token);

  return (
    <div className="flex items-center justify-center h-[100vh] bg-slate-300">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="w-[500px] p-5 rounded-md bg-white"
      >
        <h1 className="text-[25px] text-center">Logo</h1>
        <label htmlFor="">
          <span className="text-[14px] text-slate-500 pl-1 mb-1">
            Enter your email
          </span>
          <Input
            size="large"
            allowClear
            required
            name="email"
            type="email"
            placeholder="Enter your email"
          />
        </label>
        <label htmlFor="" className="block mt-5">
          <span className="text-[14px] text-slate-500 pl-1 mb-1">
            Enter your password
          </span>
          <Input.Password
            size="large"
            allowClear
            required
            name="password"
            type="password"
            placeholder="Enter your password"
          />
        </label>
        <Button
          loading={isLoading}
          iconPosition="end"
          className="!w-full mt-5"
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
