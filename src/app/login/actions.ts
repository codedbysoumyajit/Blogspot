'use server';

import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (email === adminEmail && password === adminPassword) {
    redirect('/dashboard');
  }

  return {
    error: 'Invalid credentials',
    errorDescription: 'Please check your email and password.',
  };
}
