'use server';

import type { FormState } from '@/types/form.types';

export async function submitForm(prevState: FormState, formData: FormData): Promise<FormState> {
  const firstName = formData.get('firstName')?.toString().trim();
  const lastName = formData.get('lastName')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const password = formData.get('password')?.toString();

  console.log('Email submitted:', email);

  if (!firstName || !lastName) {
    return {
      success: false,
      message: '',
      error: 'First Name and Last Name are required.',
    };
  }

  if (!email) {
    return {
      success: false,
      message: '',
      error: 'Email is required.',
    };
  }

  if (!password || password.length < 6) {
    return {
      success: false,
      message: '',
      error: 'Password must be at least 6 Characters.',
    };
  }

  return {
    success: true,
    message: `Hello, ${firstName} ${lastName}! Thanks for submitting!`,
    error: '',
  };
}
