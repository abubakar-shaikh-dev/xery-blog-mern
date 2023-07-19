import React from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/authSlice";
import { userActions } from "../../redux/slices/userSlice";

//Validation
import { LoginSchema } from "../../validations/auth/Login.validation";

//Api
import * as AuthApi from "../../services/api/auth/api.auth";
import * as api from "../../services/api/api";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema()),
  });

  function onSubmit(data) {
    const response = AuthApi.LoginUser(data);
    toast.promise(
      response,
      {
        loading: "Please wait...",
        success: (data) => data.msg,
        error: (err) => err.msg,
      },
      {
        success: {
          duration: 2000,
        },
        error: {
          duration: 1000,
        },
      }
    );

    response
      .then((data) => {
        const token = data.token;
        const refreshToken = data.refreshToken;
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);

        //isLoggedIn => TRUE
        dispatch(authActions.login());
      })
      .then(() => {
        api
          .getUser()
          .then((data) => {
            //USER DATA IS SET IN USER SLICE
            dispatch(userActions.setUser(data));

            //NAVIGATE AFTER PERFORMING TASKS
            navigate("/authorpanel/dashboard");
          })
          .catch((err) => err);
      })
      .catch((err) => err);
  }

  return (
    <section
      className="flex flex-col gap-4 justify-center items-center h-screen"
      style={{
        backgroundImage: `url(hero-bg.jpg)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full px-8 flex text-right">
        <Link className="!text-gray-500 no-underline " to="/">
          <svg
            fill="#9e9e9e"
            width={15}
            height={15}
            viewBox="0 0 15 15"
            xmlns="http://www.w3.org/2000/svg"
            id="arrow"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            transform="matrix(-1,1.2246467991473532e-16,-1.2246467991473532e-16,-1,0,0)"
            className="inline-block mr-2"
          >
            <path d="M8.29289 2.29289C8.68342 1.90237 9.31658 1.90237 9.70711 2.29289L14.2071 6.79289C14.5976 7.18342 14.5976 7.81658 14.2071 8.20711L9.70711 12.7071C9.31658 13.0976 8.68342 13.0976 8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929L11 8.5H1.5C0.947715 8.5 0.5 8.05228 0.5 7.5C0.5 6.94772 0.947715 6.5 1.5 6.5H11L8.29289 3.70711C7.90237 3.31658 7.90237 2.68342 8.29289 2.29289Z" />
          </svg>
          Back to Home
        </Link>
      </div>

      <Card color="white" shadow={false} className="p-5 shadow-2xl">
        <Typography variant="h4" color="blue-gray">
          Welcome Back
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to Login.
        </Typography>
        <form
          className="mt-5 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Input
                className="bg-white text-black"
                autoComplete="off"
                size="lg"
                label="Email"
                {...register("email")}
                error={errors.email ? true : false}
              />
              {errors.email && (
                <span className="text-red-500 px-1 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Input
                type="password"
                size="lg"
                label="Password"
                autoComplete="off"
                {...register("password")}
                error={errors.password ? true : false}
              />
              {errors.password && (
                <span className="text-red-500 px-1 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Button
              className="py-4 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
              type="submit"
              fullWidth
            >
              LOGIN
            </Button>
            {/* <Button
              size="lg"
              variant="outlined"
              color="blue-gray"
              className="flex items-center justify-center gap-3"
              fullWidth
            >
              <img
                src="https://www.material-tailwind.com/icons/google.svg"
                alt="metamask"
                className="h-6 w-6"
              />
              Continue with Google
            </Button> */}
          </div>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Register
            </Link>
          </Typography>
        </form>
      </Card>
    </section>
  );
}
