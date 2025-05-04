import myPivoteerLogo from "../assets/logo.svg";
import background_image from "../assets/logo.svg";
import RegisterForm from "@/components/custom_components/RegisterPage/RegisterForm";
import { usePost } from "@/hooks/usePost";
import { RegisterFormModel } from "@/models/RegisterFormModel";
import { useNavigate } from "react-router-dom";
import { useErrorToast, useToast } from "@/hooks/use-toast";

import {JSX} from "react"

const Register = (): JSX.Element => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { showErrorToast } = useErrorToast();

    const { postData, loading: onRegisterLoading } = usePost(
      "/auth/register"
    );

  const onRegister = async (values: RegisterFormModel): Promise<void> => {

    const userData = {
      email: values.email,
      password: values.password
    };

    try {
      await postData(userData);
      navigate("/login");
      toast({
        variant: "success",
        title: "Registration Successful!",
        description: "You have successfully registered a My Pivoteer account.",
      });
    } catch (err: any) {
      showErrorToast(err?.response);
    }
  };
  return (
    <div className="flex flex-col md:flex-row h-[100vh]">
      <div className="w-full h-[100%] md:w-2/5 xl:w-1/3 bg-midnightBlue flex flex-col items-start justify-between px-5 lg:px-10 pt-6 pb-4 overflow-y-auto">
        <div>
          {/* Register logo & title */}
          <div className="flex flex-col items-start gap-10">
            <img className="h-[62px]" alt="logo" src={myPivoteerLogo} />
            <div className="flex flex-col gap-3">
              <p className="text-xl lg:text-3xl">
                Create <span className="font-semibold">My Pivoteer</span> account
              </p>
              <p className="text-sm text-secondary">
                Create a My Pivoteer account to manage macros, pivot tables, and visualisations.
              </p>
            </div>
          </div>
          {/* Register form */}
          <RegisterForm onRegister={onRegister} isLoading={onRegisterLoading} />
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

export default Register;