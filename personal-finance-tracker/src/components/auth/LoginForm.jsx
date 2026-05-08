import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { loginSchema, validateForm } from "@/schemas/formSchemas";

export default function LoginForm() {
  const navigate = useNavigate();
  const { loginMutation } = useAuth();
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    const result = validateForm(loginSchema, payload);
    setErrors(result.errors);

    if (result.data) {
      loginMutation.mutate(result.data);
    }
  }

  return (
    <Card className="w-full border-border">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-center text-xl">Signin</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your finance tracker.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-0">
          {loginMutation.error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {loginMutation.error.message}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="email@example.com" />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <PasswordInput id="password" name="password" placeholder="*****" />
            {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
          </div>

          <div className="py-4">
            <Button type="submit" className="w-full cursor-pointer" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <LoaderCircle className="animate-spin" />
                  login account...
                </span>
              ) : (
                "Login Account"
              )}
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center pt-0">
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="cursor-pointer bg-transparent p-0 text-primary hover:underline"
            >
              Sign up
            </button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
