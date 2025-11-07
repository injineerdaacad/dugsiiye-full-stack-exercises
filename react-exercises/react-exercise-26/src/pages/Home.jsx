import React from "react";
import { usePosts } from "../contexts/posts/PostsContext";
import PostList from "../components/ui/PostList";
import SearchInput from "../components/ui/SearchInput";
import useQueryParam from "../hooks/useQueryParam";

const Home = () => {
  const { posts } = usePosts();
  const [search, setSearch] = useQueryParam("search", "");

  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((post) => post.title.toLowerCase().includes(q));
  }, [posts, search]);

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-[0_25px_45px_-35px_rgba(15,23,42,0.4)]">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Blog Posts</h2>
        <p className="mt-1 text-sm text-slate-500">Use the search to filter posts by title.</p>
        <SearchInput
          id="post-search"
          label="Search"
          placeholder="Search posts by title..."
          value={search}
          onChange={setSearch}
          resultsLabel={`${filtered.length} result${filtered.length === 1 ? "" : "s"}`}
        />
      </div>
      <PostList posts={filtered} />
    </section>
  );
};

export default Home;