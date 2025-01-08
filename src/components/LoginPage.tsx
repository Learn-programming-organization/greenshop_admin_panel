import { Input } from "antd";
import { FormEvent, useContext } from "react";
import { instance } from "../hooks/instance";
import { Context } from "../context/Context";

const LoginPage: React.FC = () => {
  const { token, setToken } = useContext(Context);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      usernameoremail: (e.target as HTMLFormElement).email.value,
      password: (e.target as HTMLFormElement).password.value,
    };
    instance()
      .post("/login", data)
      .then((res) => {
        setToken(res.data.access_token);
      });
    console.log("bosildi")
  }
  console.log(token);

  return (
    <div className="w-[475px] h-[550px] bg-white rounded-[20px]">
      <h2 className="">
        <span className="w-1 bg-[#F8D442]"></span>Crud Operations
      </h2>
      <h3 className="uppercase">Sign In</h3>
      <p>Enter your credentials to access your account</p>
      <form onSubmit={handleSubmit} autoComplete="off" className="flex flex-col justify-center">
        <label htmlFor="">Login</label>
        <Input
          size="large"
          allowClear
          required
          name="email"
          type="email"
          placeholder="Enter your login"
        />
        <label htmlFor="">Password</label>
        <Input.Password
          className="mt-4"
          size="large"
          allowClear
          required
          name="password"
          type="password"
          placeholder="Enter your password"
        />
        <button
          type="submit"
          className={`bg-[#FEAF00] flex items-center justify-center gap-[4px] px-3 py-[7px] rounded-[6px] text-[#FFFFFF] font-medium text-[16px] leading-[20px] my-2`}
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
