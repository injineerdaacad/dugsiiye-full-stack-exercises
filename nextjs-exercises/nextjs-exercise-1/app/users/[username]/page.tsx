import React from 'react';

interface UsersProps {
  params: Promise<{
    username: string;
  }>;
}

const Users = async ({ params }: UsersProps) => {
  const { username } = await params;

  return (
    <div className='p-4 text-2xl text-center'>
      Welcome, {username} User!
    </div>
  );
};

export default Users;