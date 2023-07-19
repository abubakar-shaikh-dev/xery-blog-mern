import React, { useEffect, useState } from "react";
import PanelWrapper from "../partials/PanelWrapper.panel";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";

// Components
import EmptyPostState from "../components/EmptyPostState.panel";
import BlogCard from "../components/BlogCard.panel";
import EndDivider from "../components/EndDivider.panel";

// Api
import * as api from "../../services/api/api.jsx";

export default function Blogs() {
  const [emptyPostState, setEmptyPostState] = useState(true);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    await api.getUserPosts().then((data) => {
      setPosts(data.posts);
      if (data.posts.length === 0) {
        setEmptyPostState(true);
      } else {
        setEmptyPostState(false);
      }
      setLoading(false);
    });
  }

  function onPostDelete() {
    getPosts();
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <PanelWrapper>
            <main className="flex-1">
              <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 flex items-end justify-between">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    Blog Posts
                  </h1>

                  <div className="mt-3 sm:mt-0 sm:ml-4">
                    <Link
                      to="/authorpanel/blogs/new"
                      className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      New Post
                      <PlusIcon
                        className="ml-2 -mr-1 h-5 w-5"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                  {/* Replace with your content */}

                  {emptyPostState ? (
                    <EmptyPostState />
                  ) : (
                    <>
                      <div className="container max-w-6xl py-6 mx-auto space-y-6 sm:space-y-12">
                        <div className="flex flex-wrap -m-4">
                          {posts?.map((post) => {
                            return (
                              <BlogCard
                                key={post._id}
                                id={post._id}
                                title={post.title}
                                image={post.imageURL}
                                category={post.category}
                                user_name={post.user.name}
                                date={post.date}
                                onPostDelete={onPostDelete}
                              />
                            );
                          })}
                        </div>
                      </div>
                      <EndDivider />
                    </>
                  )}

                  {/* /End replace */}
                </div>
              </div>
            </main>
          </PanelWrapper>
        </>
      )}
    </>
  );
}
