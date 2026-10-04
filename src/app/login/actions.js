"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export async function loginUser(prevState, formData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/flights",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return "Email və ya parol səhvdir.";
    }
    throw error;
  }
}