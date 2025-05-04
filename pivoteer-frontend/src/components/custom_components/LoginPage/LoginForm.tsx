import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import UILoader from "@/components/ui/ui-loader";
import { LoginFormModel } from "@/models/LoginFormModel";
import { loginFormSchema } from "@/utils/validation_schemas/LoginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

type Props = {
  onLogin: (values: LoginFormModel) => void;
  isLoading: boolean;
};

const LoginForm = ({ onLogin, isLoading }: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const PasswordVisibiltyIcon = showPassword ? Eye : EyeOff;

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = (): void => {
    setShowPassword((prev: boolean) => !prev);
  };

  const onSubmit = (values: z.infer<typeof loginFormSchema>): void => {
    onLogin(values);
  };

  return (
    <div className="w-full mt-12">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-8"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input inputSize="lg" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="flex relative">
                    <Input
                      inputSize="lg"
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                    <PasswordVisibiltyIcon
                      size={18}
                      onClick={togglePasswordVisibility}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-secondary cursor-pointer"
                    />
                  </div>
                </FormControl>

                <FormMessage />
                <FormDescription className="text-right">
                  Forgot password?
                </FormDescription>
              </FormItem>
            )}
          />
          <div className="flex flex-col md:flex-row gap-4 pt-6">
            <Button
              size="xl"
              className="w-[100%]"
              type="button"
              variant="secondary"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
            <Button size="xl" className="w-[100%]" type="submit">
              {isLoading ? <UILoader size="small" /> : "Login"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;