import React,{useState} from "react";
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid'
import {Link,useNavigate} from "react-router-dom"
import toast from "react-hot-toast";

//Components
import DeleteConfirmationModal from "./DeleteConfirmationModal.panel";

//helper
import formatDate from "../../helpers/formatDate.helper";

//Api
import * as api from "../../services/api/api";

const BlogCard = (props) => {

  const navigate = useNavigate();

  const [deleteId, setDeleteId] = useState(null);

  function handleDelete(id){
    setDeleteId(id)
  }

  function onCancel(){
    setDeleteId(null)
  }

  function onDelete(post_id){
    setDeleteId(null)

    const response = api.deletePost(post_id);

    toast.promise(response, {
      loading: "Please wait...",
      success: (data)=>data.msg,
      error: (err)=>err.msg
    },
    {
      success:{
        duration:2000
      },
      error:{
        duration:1000
      }
    });

    response.then(()=>{
      props.onPostDelete()
    })

  }


  return (
    <>
      {deleteId&&<DeleteConfirmationModal id={deleteId} onDelete={onDelete} onCancel={onCancel} />}
      
      <div className="w-full p-4 md:w-1/3">
        <div className="h-full border-opacity-60  overflow-hidden shadow-sm hover:shadow-2xl transition duration-300">
          <img
            className="lg:h-48 md:h-36 w-full object-cover object-center rounded-lg"
            src={props.image}
            alt="blog"
          />
          <div className="bg-gray-100 rounded-b-lg">
            <div className="pt-6 px-6">
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
              {props.category.toUpperCase()}
            </h2>
            <h1 className="title-font text-lg font-medium text-gray-900 mb-1">
            {props.title}
            </h1>
            

            <div className="flex items-center flex-wrap ">
              <div className="flex items-center gap-2">
                <a
                  itemProp="url"
                  className="text-gray-600 hover:text-gray-600 dark:text-gray-400 hover:dark:text-gray-400 text-xs no-underline"
                  href="#"
                >
                  {props.user_name}
                </a>
                <span className="w-[4px] h-[4px] rounded-full bg-gray-600 dark:bg-gray-500" />
                <span className="text-gray-600 hover:text-gray-600 dark:text-gray-400 hover:dark:text-gray-400 text-xs leading-6 no-underline">
                {formatDate(props.date)}
                </span>
              </div>
            </div>

            </div>

            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex  flex-1 w-0">
                  <a
                    onClick={()=>handleDelete(props.id)}
                    className=" cursor-pointer select-none relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:bg-gray-300"
                  >
                    <TrashIcon
                      className="h-5 w-5 text-red-400"
                      aria-hidden="true"
                    />
                    <span className="ml-3">Delete Post</span>
                  </a>
                </div>
                <div className="-ml-px flex  flex-1 w-0">
                  <Link
                    to={`/authorpanel/blogs/edit/${props.id}`}
                    className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:bg-gray-300"
                  >
                    <PencilSquareIcon
                      className="h-5 w-5 text-indigo-600"
                      aria-hidden="true"
                    />
                    <span className="ml-3">Edit Post</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;

