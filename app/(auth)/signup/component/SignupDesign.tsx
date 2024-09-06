"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { createClient } from "@/utils/supabase/client";

export const description =
  "A sign-up form with first name, last name, email, and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account";

export function SignupDesign() {
  const supabase = createClient();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const passwordRequirements = {
    length: /.{8,}/,
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    number: /[0-9]/,
    specialChar: /[!@#$%^&*(),.?":{}|<>]/,
  };

  const validatePassword = (pwd: string) => {
    return {
      length: passwordRequirements.length.test(pwd),
      uppercase: passwordRequirements.uppercase.test(pwd),
      lowercase: passwordRequirements.lowercase.test(pwd),
      number: passwordRequirements.number.test(pwd),
      specialChar: passwordRequirements.specialChar.test(pwd),
    };
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const { data: existingUser, error: checkError } = await supabase
        .from("profiles")
        .select("email")
        .eq("email", email)
        .single();

      if (checkError && checkError.code !== "PGRST116") {
        throw new Error("Error checking email");
      }

      if (existingUser) {
        setError("Email already exists");
        setLoading(false);
        return;
      }

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: `${firstName} ${lastName}`,
            email: email,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message || "An error occurred during sign-up.");
        setLoading(false);
        return;
      }

      router.push("/checkEmail");
    } catch (error: any) {
      setError(error.message || "An error occurred during sign-up.");
      setLoading(false);
    }
  };

  const passwordValidation = validatePassword(password);

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  name="first-name"
                  id="first-name"
                  placeholder="First name"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  name="last-name"
                  id="last-name"
                  placeholder="Last name"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-describedby="password-requirements"
                required
              />
              {password && (
                <div
                  id="password-requirements"
                  className="password-requirements"
                >
                  <ul>
                    <li
                      style={{
                        color: passwordValidation.length ? "green" : "red",
                      }}
                    >
                      {passwordValidation.length ? "✔️" : "❌"} Minimum 8
                      characters
                    </li>
                    <li
                      style={{
                        color: passwordValidation.uppercase ? "green" : "red",
                      }}
                    >
                      {passwordValidation.uppercase ? "✔️" : "❌"} At least one
                      uppercase letter
                    </li>
                    <li
                      style={{
                        color: passwordValidation.lowercase ? "green" : "red",
                      }}
                    >
                      {passwordValidation.lowercase ? "✔️" : "❌"} At least one
                      lowercase letter
                    </li>
                    <li
                      style={{
                        color: passwordValidation.number ? "green" : "red",
                      }}
                    >
                      {passwordValidation.number ? "✔️" : "❌"} At least one
                      number
                    </li>
                    <li
                      style={{
                        color: passwordValidation.specialChar ? "green" : "red",
                      }}
                    >
                      {passwordValidation.specialChar ? "✔️" : "❌"} At least
                      one special character
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <span>
                  Signing Up..
                  <FontAwesomeIcon icon={faSpinner} spin aria-label="Loading" />
                </span>
              ) : (
                "Create an account"
              )}
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="#" className="underline">
            Sign in
          </Link>
          <br />
          You don't need to sign up if you want to sign in to your Google
          account.
          <br />
        </div>
      </CardContent>
    </Card>
  );
}
