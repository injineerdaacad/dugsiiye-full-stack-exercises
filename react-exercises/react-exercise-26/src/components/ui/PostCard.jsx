import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const preview = post.content.length > 160 ? `${post.content.slice(0, 157)}…` : post.content;

  return (
    <li className="group flex h-full flex-col justify-between rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_25px_45px_-35px_rgba(15,23,42,0.4)] transition hover:-translate-y-1 hover:shadow-[0_35px_65px_-45px_rgba(15,23,42,0.55)]">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-500/70">Featured</p>
        <h3 className="text-lg font-semibold text-slate-900">
          <Link to={`/posts/${post.id}`} className="transition group-hover:text-blue-600">
            {post.title}
          </Link>
        </h3>
        <p className="text-sm leading-6 text-slate-500">{preview}</p>
      </div>
      <Link
        to={`/posts/${post.id}`}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Read
        <span aria-hidden="true">→</span>
      </Link>
    </li>
  );
};

export default PostCard;