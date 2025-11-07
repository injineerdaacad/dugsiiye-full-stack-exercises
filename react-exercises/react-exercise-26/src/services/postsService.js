import { nextId } from "../utils/id";

export const getInitialPosts = () => [
  { id: 1, title: "Introduction to React", content: "Learn the fundamentals of components, props, and state." },
  { id: 2, title: "Understanding React Router", content: "Use routes, links, and navigation to build SPAs." },
  { id: 3, title: "React Hooks in Depth", content: "Master useState, useEffect, useMemo, and custom hooks." },
];

export const add = (posts, { title, content }) => {
  const id = nextId(posts.map(p => p.id));
  return [...posts, { id, title, content }];
};

export const findById = (posts, id) => posts.find(p => p.id === id) || null;

export const getAdjacentIds = (posts, id) => {
  if (!Array.isArray(posts) || posts.length === 0) {
    return { prevId: null, nextId: null };
  }

  const ordered = [...posts].sort((a, b) => a.id - b.id);
  const index = ordered.findIndex((post) => post.id === id);

  if (index === -1) {
    return { prevId: null, nextId: null };
  }

  const prevId = ordered[index - 1]?.id ?? null;
  const nextId = ordered[index + 1]?.id ?? null;

  return { prevId, nextId };
};