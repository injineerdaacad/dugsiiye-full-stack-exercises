import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { registerSchema, validateForm } from "@/schemas/formSchemas";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { registerMutation } = useAuth();
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    const result = validateForm(registerSchema, payload);
    setErrors(result.errors);

    if (result.data) {
      registerMutation.mutate(result.data);
    }
  }

  return (
    <Card className="w-full border-border">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-center text-xl">Create account</CardTitle>
        <CardDescription className="text-center">
          Enter your details to start tracking your finance activity.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-0">
          {registerMutation.error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {registerMutation.error.message}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Personal Finance User" />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

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
            <Button type="submit" className="w-full cursor-pointer" disabled={registerMutation.isPending}>
              {registerMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <LoaderCircle className="animate-spin" />
                  creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center pt-0">
          <div className="text-center text-sm">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="cursor-pointer bg-transparent p-0 text-primary hover:underline"
            >
              Sign in
            </button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
