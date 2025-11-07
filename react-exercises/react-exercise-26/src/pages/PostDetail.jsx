import React from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { usePosts } from "../contexts/posts/PostsContext";

const PostDetail = () => {
  const { postId } = useParams();
  const id = Number(postId);
  const navigate = useNavigate();
  const location = useLocation();
  const { getById, getAdjacentIds } = usePosts();
  const post = getById(id);

  const { prevId, nextId } = React.useMemo(() => getAdjacentIds(id), [getAdjacentIds, id]);

  if (!post) {
    return (
      <div className="rounded-3xl border border-rose-100 bg-rose-50 p-8 text-rose-900 shadow-sm">
        <h2 className="text-2xl font-semibold">Post not found</h2>
        <p className="mt-2 text-sm text-rose-700">This post does not exist or may have been removed.</p>
        <Link
          to="/"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-rose-600 px-6 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-rose-500"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const handleNavigate = (targetId) => {
    if (!targetId) return;
    navigate(`/posts/${targetId}`, { state: { fromPostId: id } });
  };

  return (
    <article className="rounded-3xl border border-slate-200/70 bg-white p-10 shadow-[0_25px_45px_-35px_rgba(15,23,42,0.4)]">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-500/70">Blog post</p>
      <h2 className="mt-2 text-3xl font-semibold leading-tight text-slate-900">{post.title}</h2>
      <p className="mt-6 whitespace-pre-line text-base leading-7 text-slate-600">{post.content}</p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={!prevId}
          onClick={() => handleNavigate(prevId)}
        >
          Previous
        </button>
        <button
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={!nextId}
          onClick={() => handleNavigate(nextId)}
        >
          Next
        </button>
      </div>
      {location.state?.fromPostId != null && (
        <p className="mt-4 text-sm text-slate-500">
          You navigated here from post ID: {location.state.fromPostId}
        </p>
      )}
    </article>
  );
};

export default PostDetail;