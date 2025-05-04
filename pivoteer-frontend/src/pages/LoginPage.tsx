import { usePost } from "@/hooks/usePost";
import background_image from "../assets/logo.svg";
import myPivoteerLogo from "../assets/logo.svg";
import LoginForm from "@/components/custom_components/LoginPage/LoginForm";
import { LoginFormModel } from "@/models/LoginFormModel";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useErrorToast, useToast } from "@/hooks/use-toast";
import UILoader from "@/components/ui/ui-loader";
import {JSX} from "react";

const Login = (): JSX.Element => {
  const { user, loading, isAuthenticated, refetchUser } = useAuth();
  const { toast } = useToast();
  const { postData, loading: onLoginLoading } = usePost("/auth/login", true);
  const { showErrorToast } = useErrorToast();

  const onLogin = async (values: LoginFormModel): Promise<void> => {
    const userData = {
      email: values.email,
      password: values.password,
    };

    try {
      await postData(userData);
      await refetchUser();
      toast({
        variant: "success",
        title: "Login Successful!",
        description: "Welcome! You’re now logged in and ready to go.",
      });
    } catch (err: any) {
      showErrorToast(err?.response);
    }
    console.log("Auth ADo Auth")
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <UILoader size="large" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex flex-col md:flex-row h-[100vh]">
      <div className="w-full h-[100%] md:w-2/5 xl:w-1/3 bg-midnightBlue flex flex-col items-start justify-between px-5 lg:px-10 pt-6 pb-4">
        <div>
          {/* Login logo & title */}
          <div className="flex flex-col items-start gap-10">
            <img className="h-[62px]" alt="logo" src={myPivoteerLogo} />
            <div className="flex flex-col gap-3">
              <p className="text-xl lg:text-3xl">
                Login to <span className="font-semibold">My Pivoteer</span>
              </p>
              <p className="text-sm text-secondary">
                Multi-Module Software for easy creation of pivot tables and other table visualisations
              </p>
            </div>
          </div>

          {/* Login form */}
          <LoginForm onLogin={onLogin} isLoading={onLoginLoading} />
        </div>
        <div className="flex justify-center w-[100%]">
          <p className="text-sm text-secondary">
            © 2025 My Pivoteer. All rights reserved.
          </p>
        </div>
      </div>
      {/* Image box */}
      <div className="hidden md:flex justify-center items-center md:w-[60%] xl:w-[70%]">
        <img
          className="lg:max-w-[75%] lg:max-h-[75%]"
          alt="background_image"
          src={background_image}
        />
      </div>
    </div>
  );
};

export default Login;