import { Button } from "@/components/ui/button";

import DatePicker from "@/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import UILoader from "@/components/ui/ui-loader";
import { RegisterFormModel } from "@/models/RegisterFormModel";

import { registerFormSchema } from "@/utils/validation_schemas/RegisterFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

type Props = {
  onRegister: (values: RegisterFormModel) => void;
  isLoading: boolean;
};

const RegisterForm = ({ onRegister, isLoading }: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const navigate = useNavigate();

  const PasswordVisibiltyIcon = showPassword ? Eye : EyeOff;

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  const togglePasswordVisibility = (): void => {
    setShowPassword((prev: boolean) => !prev);
  };

  const onSubmit = (values: z.infer<typeof registerFormSchema>): void => {
    onRegister(values);
    console.log(values);
  };

  return (
    <div className="w-full mt-5 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4"
        >
          {/* <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input inputSize="md" placeholder="First name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          {/* <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input inputSize="md" placeholder="Last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input inputSize="md" placeholder="Email" {...field} />
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
                      inputSize="md"
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
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Birth date</FormLabel>
                <FormControl>
                  <DatePicker
                    date={birthDate}
                    setDate={(date) => {
                      setBirthDate(date), field.onChange(date);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <div className="flex flex-col md:flex-row gap-4 py-6">
            <Button
              size="xl"
              className="w-[100%]"
              type="button"
              variant="secondary"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button size="xl" className="w-[100%]" type="submit">
              {isLoading ? <UILoader size="small" /> : "Register"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;