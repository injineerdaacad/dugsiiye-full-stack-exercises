import React, { createContext, useContext, useMemo, useState, useCallback } from "react";
import * as postsService from "../../services/postsService";

const PostsContext = createContext(null);

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState(postsService.getInitialPosts());

  const addPost = useCallback((post) => {
    setPosts((prev) => postsService.add(prev, post));
  }, []);

  const getById = useCallback((id) => postsService.findById(posts, id), [posts]);

  const getAdjacentIds = useCallback((id) => postsService.getAdjacentIds(posts, id), [posts]);

  const value = useMemo(
    () => ({
      posts,
      addPost,
      getById,
      getAdjacentIds,
    }),
    [posts, addPost, getById, getAdjacentIds]
  );

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>;
};

export const usePosts = () => {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error("usePosts must be used within <PostsProvider>");
  return ctx;
};