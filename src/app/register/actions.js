"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function registerUser(prevState, formData) {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!name || !email || !password) {
    return "Bütün sahələri doldur.";
  }
  if (password.length < 6) {
    return "Parol ən azı 6 simvol olmalıdır.";
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return "Bu email artıq qeydiyyatdan keçib.";
  }

  const hashed = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { name, email, password: hashed } });

  redirect("/login?registered=1");
}