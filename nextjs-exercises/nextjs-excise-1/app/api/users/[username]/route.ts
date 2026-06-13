import { NextResponse } from 'next/server';

export async function GET(request: Request, context: { params: Promise<{ username: string }> }) {
  const { username } = await context.params;

  if (!username) {
    return NextResponse.json(
      { message: 'Username is required' },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      message: `Hello, ${username}! Welcome to our API!`,
      data: {
        username,
      },
    },
    { status: 200 }
  );
}