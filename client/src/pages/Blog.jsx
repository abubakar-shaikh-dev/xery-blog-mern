import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./css/BlogStyles.css";
import Loader from "../components/Loader";

//helper
import formatDate from "../helpers/formatDate.helper";

//Api
import * as api from "../services/api/api";

export default function Blog() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    api.getPost(slug).then((response) => {
      setBlogData(response.post);
      setLoading(false);
    });
  }, [blogData]);

  return (
    <>
    {loading ? (
              <Loader />
            ) : (
              <>
    <article
      className="container max-w-3xl p-2 mx-auto space-y-6 sm:space-y-12 font-outfit"
      itemProp="blogPost"
      itemScope=""
      itemType="http://schema.org/BlogPosting"
    >
      <meta itemProp="image" content={blogData?.imageURL} />
      <div className="flex justify-between items-center sm:px-6">
        <button
          className="!text-gray-500 text-sm no-underline"
          onClick={() => navigate(-1)}
        >
          ← Back to Previous Page
        </button>
        {/* <div className="flex items-center space-x-2 px-2 py-1">
          <span className="text-gray-500 text-sm">Share on</span>
          <button
            aria-label="twitter"
            className="react-share__ShareButton flex"
            style={{
              backgroundColor: "transparent",
              border: "none",
              padding: 0,
              font: "inherit",
              color: "inherit",
              cursor: "pointer",
            }}
          >
            <svg viewBox="0 0 64 64" width={26} height={26}>
              <circle cx={32} cy={32} r={31} fill="#00aced" />
              <path
                d="M48,22.1c-1.2,0.5-2.4,0.9-3.8,1c1.4-0.8,2.4-2.1,2.9-3.6c-1.3,0.8-2.7,1.3-4.2,1.6 C41.7,19.8,40,19,38.2,19c-3.6,0-6.6,2.9-6.6,6.6c0,0.5,0.1,1,0.2,1.5c-5.5-0.3-10.3-2.9-13.5-6.9c-0.6,1-0.9,2.1-0.9,3.3 c0,2.3,1.2,4.3,2.9,5.5c-1.1,0-2.1-0.3-3-0.8c0,0,0,0.1,0,0.1c0,3.2,2.3,5.8,5.3,6.4c-0.6,0.1-1.1,0.2-1.7,0.2c-0.4,0-0.8,0-1.2-0.1 c0.8,2.6,3.3,4.5,6.1,4.6c-2.2,1.8-5.1,2.8-8.2,2.8c-0.5,0-1.1,0-1.6-0.1c2.9,1.9,6.4,2.9,10.1,2.9c12.1,0,18.7-10,18.7-18.7 c0-0.3,0-0.6,0-0.8C46,24.5,47.1,23.4,48,22.1z"
                fill="white"
              />
            </svg>
          </button>
          <button
            aria-label="reddit"
            className="react-share__ShareButton flex"
            style={{
              backgroundColor: "transparent",
              border: "none",
              padding: 0,
              font: "inherit",
              color: "inherit",
              cursor: "pointer",
            }}
          >
            <svg viewBox="0 0 64 64" width={26} height={26}>
              <circle cx={32} cy={32} r={31} fill="#ff4500" />
              <path
                d="m 52.8165,31.942362 c 0,-2.4803 -2.0264,-4.4965 -4.5169,-4.4965 -1.2155,0 -2.3171,0.4862 -3.128,1.2682 -3.077,-2.0247 -7.2403,-3.3133 -11.8507,-3.4782 l 2.5211,-7.9373 6.8272,1.5997 -0.0102,0.0986 c 0,2.0281 1.6575,3.6771 3.6958,3.6771 2.0366,0 3.6924,-1.649 3.6924,-3.6771 0,-2.0281 -1.6575,-3.6788 -3.6924,-3.6788 -1.564,0 -2.8968,0.9758 -3.4357,2.3443 l -7.3593,-1.7255 c -0.3213,-0.0782 -0.6477,0.1071 -0.748,0.4233 L 32,25.212062 c -4.8246,0.0578 -9.1953,1.3566 -12.41,3.4425 -0.8058,-0.7446 -1.8751,-1.2104 -3.0583,-1.2104 -2.4905,0 -4.5152,2.0179 -4.5152,4.4982 0,1.649 0.9061,3.0787 2.2389,3.8607 -0.0884,0.4794 -0.1462,0.9639 -0.1462,1.4569 0,6.6487 8.1736,12.0581 18.2223,12.0581 10.0487,0 18.224,-5.4094 18.224,-12.0581 0,-0.4658 -0.0493,-0.9248 -0.1275,-1.377 1.4144,-0.7599 2.3885,-2.2304 2.3885,-3.9406 z m -29.2808,3.0872 c 0,-1.4756 1.207,-2.6775 2.6894,-2.6775 1.4824,0 2.6877,1.2019 2.6877,2.6775 0,1.4756 -1.2053,2.6758 -2.6877,2.6758 -1.4824,0 -2.6894,-1.2002 -2.6894,-2.6758 z m 15.4037,7.9373 c -1.3549,1.3481 -3.4816,2.0043 -6.5008,2.0043 l -0.0221,-0.0051 -0.0221,0.0051 c -3.0209,0 -5.1476,-0.6562 -6.5008,-2.0043 -0.2465,-0.2448 -0.2465,-0.6443 0,-0.8891 0.2465,-0.2465 0.6477,-0.2465 0.8942,0 1.105,1.0999 2.9393,1.6337 5.6066,1.6337 l 0.0221,0.0051 0.0221,-0.0051 c 2.6673,0 4.5016,-0.5355 5.6066,-1.6354 0.2465,-0.2465 0.6477,-0.2448 0.8942,0 0.2465,0.2465 0.2465,0.6443 0,0.8908 z m -0.3213,-5.2615 c -1.4824,0 -2.6877,-1.2002 -2.6877,-2.6758 0,-1.4756 1.2053,-2.6775 2.6877,-2.6775 1.4824,0 2.6877,1.2019 2.6877,2.6775 0,1.4756 -1.2053,2.6758 -2.6877,2.6758 z"
                fill="white"
              />
            </svg>
          </button>
          <button
            aria-label="linkedin"
            className="react-share__ShareButton flex"
            style={{
              backgroundColor: "transparent",
              border: "none",
              padding: 0,
              font: "inherit",
              color: "inherit",
              cursor: "pointer",
            }}
          >
            <svg viewBox="0 0 64 64" width={26} height={26}>
              <circle cx={32} cy={32} r={31} fill="#007fb1" />
              <path
                d="M20.4,44h5.4V26.6h-5.4V44z M23.1,18c-1.7,0-3.1,1.4-3.1,3.1c0,1.7,1.4,3.1,3.1,3.1 c1.7,0,3.1-1.4,3.1-3.1C26.2,19.4,24.8,18,23.1,18z M39.5,26.2c-2.6,0-4.4,1.4-5.1,2.8h-0.1v-2.4h-5.2V44h5.4v-8.6 c0-2.3,0.4-4.5,3.2-4.5c2.8,0,2.8,2.6,2.8,4.6V44H46v-9.5C46,29.8,45,26.2,39.5,26.2z"
                fill="white"
              />
            </svg>
          </button>
        </div> */}
      </div>
      <div>
        <img
          className="mb-2 w-full rounded-xl"
          src={blogData?.imageURL}
          alt="How to use Zustand"
        />
      </div>
      <div className="sm:px-6">
        <div className="mb-6 text-sm">
          <div className="flex justify-between sm:flex-row flex-col gap-4">
            <div className="flex justify-center items-center gap-2">
              <Link itemProp="url" to={`/blog/author/${blogData?.user.username}/`}>
                <img
                  src={blogData?.user.profileImageURL}
                  alt={blogData?.user.name}
                  loading="lazy"
                  className="flex h-[32px] w-[32px] rounded-full object-cover"
                />
              </Link>
              <Link
                itemProp="url"
                className="flex-1 text-gray-900 dark:text-gray-200 text-sm no-underline hover:no-underline"
                to={`/blog/author/${blogData?.user.username}/`}
              >
                {blogData?.user.name}
              </Link>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 ">
              <time
                dateTime="2023-05-18T00:00:00.000Z"
                itemProp="datePublished"
              >
                {blogData && formatDate(blogData.date)}
              </time>
            </div>
          </div>
        </div>
        <h1
          className="text-xl text-black mt-10 mb-2 family-poppins font-bold md:text-4xl"
          itemProp="headline"
        >
          {blogData?.title}
        </h1>
        {blogData && (
          <div
            id="post-content"
            className="markdown text-black"
            itemProp="articleBody"
            dangerouslySetInnerHTML={{ __html: blogData.description }}
          ></div>
        )}
      </div>
    </article>
    </>
            )}
    </>
  );
}
