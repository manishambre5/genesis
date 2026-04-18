"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/auth-actions";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { CircleX } from "lucide-react";

export default function AuthClientPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();


  const handleEmailAuth = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isSignIn) {
        const result = await signIn(email, password)
        if (!result.user) {
          setError("Invalid email or password!");
        }
      } else {
        const result = await signUp(email, password, name)
        if (!result.user) {
          setError("Failed to create an account!");
        }
      }
    } catch (err) {
      setError(
        `Authentication error: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
      <div className="h-full flex items-center justify-center p-4">
        <Card className="w-lg">
          <CardHeader>
            <CardTitle className="text-2xl">
              {isSignIn ? "Welcome Back!" : "Create an Account"}
            </CardTitle>
            <CardDescription>
              {isSignIn
                ? "Sign in to your account to continue"
                : "Sign up to get started"}
            </CardDescription>
          </CardHeader>

          {/** OAuth removed... */}

          {/* Email/Password Form */}
          <CardContent>
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <FieldGroup>
              {!isSignIn && (
                <Field>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required={!isSignIn}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                </Field>
              )}

              <Field>
                <FieldLabel htmlFor="email">Email address</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isSignIn ? "current-password" : "new-password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </Field>

              {/* Error Display */}
              {error && (
                <Item size="xs" className="text-red-500">
                  <ItemMedia variant="icon">
                    <CircleX />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>{error}</ItemTitle>
                  </ItemContent>
                </Item>
              )}


              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-1">
                    <Spinner />
                    {isSignIn ? "Signing in..." : "Creating account..."}
                  </span>
                ) : isSignIn ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </Button>
            </FieldGroup>
          </form>
          </CardContent>

          {/* Toggle between Sign In and Sign Up */}
          <CardFooter>
            <Button
              type="button"
              size="xs"
              variant="link"
              onClick={() => {
                setIsSignIn(!isSignIn);
                setError(""); // Clear any previous errors
                setName(""); // Clear name when switching modes
              }}
            >
              {isSignIn
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </Button>
          </CardFooter>
        </Card>
      </div>
  );
}