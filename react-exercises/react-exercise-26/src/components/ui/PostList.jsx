import React from "react";
import PostCard from "./PostCard";

const PostList = ({ posts }) => {
  if (!posts.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-12 text-center text-slate-500">
        No posts found.
      </div>
    );
  }

  return (
    <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </ul>
  );
};

export default PostList;