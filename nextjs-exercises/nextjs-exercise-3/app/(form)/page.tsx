'use client';

import { useActionState } from 'react';
import { submitForm } from '@/actions/form.actions';
import type { FormState } from '@/types/form.types';

const initialState: FormState = {
  success: false,
  message: '',
  error: '',
};

export default function FormPage() {
  const [state, formAction, isPending] = useActionState(submitForm, initialState);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <form action={formAction} className="space-y-4 p-6 max-w-md w-full bg-white border rounded-lg shadow">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Exercise 3</h1>

        <input name="firstName" placeholder="First name" className="border p-2 w-full rounded" />
        <input name="lastName" placeholder="Last name" className="border p-2 w-full rounded" />
        <input name="email" type="email" placeholder="Email" className="border p-2 w-full rounded" />
        <input name="password" type="password" placeholder="Password" className="border p-2 w-full rounded" />

        <button type="submit" disabled={isPending} className="bg-blue-600 text-white px-4 py-2 rounded w-full disabled:opacity-60">
          {isPending ? 'Submitting...' : 'Submit'}
        </button>

        {state.success && <p className="text-green-600 font-medium text-center">{state.message}</p>}
        {!state.success && state.error && <p className="text-red-600 font-medium text-center">{state.error}</p>}
      </form>
    </main>
  );
}
