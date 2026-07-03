import React from 'react'

interface BlogProps {
  params: Promise<{
    slug: string[];
  }>;
}

const Blog = async ({ params }: BlogProps) => {
  const { slug } = await params;

  return (
    <div className='p-4 text-2xl text-center'>You visited: {slug.join(' / ')}</div>
  )
}

export default Blog;