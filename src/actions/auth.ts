// src/actions/auth.ts
'use server';

import { z } from 'zod';

const signupSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export async function signup(values: z.infer<typeof signupSchema>) {
  const validatedFields = signupSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  
  // In a real application, you would:
  // 1. Hash the password
  // 2. Save the user to a database
  console.log("Creating user:", validatedFields.data.email);

  return { success: "Signup successful! Please log in." };
}

export async function login(values: z.infer<typeof loginSchema>) {
    const validatedFields = loginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid email or password!" };
    }

    const { email, password } = validatedFields.data;

    // In a real application, you would:
    // 1. Find the user in the database by email
    // 2. Compare the provided password with the stored hashed password
    console.log("Attempting login for:", email);

    // Simulate a successful login for demonstration
    if (email && password) {
         return { success: "Login Successful!" };
    }

    return { error: "Invalid credentials!" };
}
