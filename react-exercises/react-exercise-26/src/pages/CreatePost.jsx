import React from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../contexts/posts/PostsContext";

const CreatePost = () => {
  const { addPost } = usePosts();
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const navigate = useNavigate();

  const fieldClass =
    "mt-2 w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30";

  const onSubmit = React.useCallback((e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    addPost({ title: title.trim(), content: content.trim() });
    navigate("/", { replace: true });
    setTitle("");
    setContent("");
  }, [addPost, content, navigate, title]);

  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-[0_25px_45px_-35px_rgba(15,23,42,0.4)]">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Create a New Post</h2>
      <p className="mt-1 text-sm text-slate-500">Share your story with the community.</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-6">
        <div>
          <label htmlFor="title" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Title
          </label>
          <input
            id="title"
            className={fieldClass}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Content
          </label>
          <textarea
            id="content"
            rows={8}
            className={`${fieldClass} resize-none`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            className="rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            type="submit"
          >
            Create Post
          </button>
          <button
            className="rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;