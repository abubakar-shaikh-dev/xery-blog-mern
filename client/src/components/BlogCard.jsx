import React from "react";
import { Link } from "react-router-dom";

//helper
import formatDate from "../helpers/formatDate.helper";

const BlogCard = (props) => {
  return (
    <>
      <div className="p-4 max-w-full md:w-1/3 font-outfit">
        <div className="h-full border-opacity-60  overflow-hidden shadow-sm hover:shadow-2xl transition duration-300">
          <Link
            to={`/blog/${props.slug}`}
          >
          <img
            className="lg:h-48 md:h-36 w-full object-cover object-center rounded-lg"
            src={props.imageURL}
            alt="blog"
          />
          </Link>
          <div className="p-6 bg-gray-100 rounded-b-lg">
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
              {props.category.toUpperCase()}
            </h2>
            <Link 
              to={`/blog/${props.slug}`}
            className="title-font text-lg font-medium text-gray-900 mb-3">
              {props.title}
            </Link>
            <p className="leading-relaxed mb-3">
              {props.summary}
            </p>
            <div className="flex items-center flex-wrap ">
              <div className="flex items-center gap-2">
                <Link
                  itemProp="url"
                  className="text-gray-600 hover:text-gray-600 dark:text-gray-400 hover:dark:text-gray-400 text-xs no-underline"
                  to={`/blog/author/${props.username}/`}
                >
                  {props.user}
                </Link>
                <span className="w-[4px] h-[4px] rounded-full bg-gray-600 dark:bg-gray-500" />
                <span className="text-gray-600 hover:text-gray-600 dark:text-gray-400 hover:dark:text-gray-400 text-xs leading-6 no-underline">
                  {formatDate(props.date)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
