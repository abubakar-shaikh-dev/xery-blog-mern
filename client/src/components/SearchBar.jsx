import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBarNotFound from "./SearchBarNotFound";
import SearchBarResult from "./SearchBarResult";
import { useNavigate } from 'react-router-dom';

//Api
import * as api from "../services/api/api";

export default function SearchBar(props) {
  const navigate = useNavigate();
  const [key, setKey] = useState("");
  const [searchData, setSearchData] = useState([]);
  
  function resetKey(){
    setKey("")
  }

  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
      resetKey()
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  useEffect(() => {
    try {
      if (!key.trim()) {
        setSearchData([]);
        return;
      }

      api.getPostsBySearch(key, 5).then((response) => {
        setSearchData(response);
      });
    } catch (error) {
      console.log(error);
    }
  }, [key]);

  function handleClick(){
    props.onClose()
    resetKey()
  }

  function handleSubmit(event){
    event.preventDefault();
    
    if(!!key){
      navigate(`/search/${encodeURIComponent(key)}`);
      props.onClose()
      resetKey()
    }

  }

  return (
    <>
      <AnimatePresence>
        {props.show && (
          <motion.div
            id="searchbar"
            onClick={handleClick}
            className="fixed top-0 bottom-0 left-0 right-0 z-[100] h-screen w-full backdrop-blur-[8px] bg-black/25 flex items-start justify-center pt-16 sm:pt-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg transform px-4 transition-all opacity-100 scale-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
            >
              <div className="overflow-hidden rounded-lg bg-white shadow-md">
                <form className="relative shadow-sm" onSubmit={handleSubmit}>
                  
                  <input
                    className="block text-black w-full border-transparent focus:border-transparent focus:ring-0 appearance-none bg-transparent py-4 pl-4 pr-12 text-base text-slate-900 placeholder:text-slate-600 focus:outline-none sm:text-sm sm:leading-6"
                    placeholder="Find anything..."
                    type="text"
                    value={key}
                    onChange={(e) => {
                      setKey(e.target.value);
                    }}
                    name="searchKey"
                    autoComplete="off"
                    autoFocus
                  />
                  <button 
                  type="submit"
                  className="cursor-pointer absolute right-4 top-4 fill-gray-400 hover:fill-gray-800 tranition duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
                      <path d="M20.47 21.53a.75.75 0 1 0 1.06-1.06l-1.06 1.06Zm-9.97-4.28a6.75 6.75 0 0 1-6.75-6.75h-1.5a8.25 8.25 0 0 0 8.25 8.25v-1.5ZM3.75 10.5a6.75 6.75 0 0 1 6.75-6.75v-1.5a8.25 8.25 0 0 0-8.25 8.25h1.5Zm6.75-6.75a6.75 6.75 0 0 1 6.75 6.75h1.5a8.25 8.25 0 0 0-8.25-8.25v1.5Zm11.03 16.72-5.196-5.197-1.061 1.06 5.197 5.197 1.06-1.06Zm-4.28-9.97c0 1.864-.755 3.55-1.977 4.773l1.06 1.06A8.226 8.226 0 0 0 18.75 10.5h-1.5Zm-1.977 4.773A6.727 6.727 0 0 1 10.5 17.25v1.5a8.226 8.226 0 0 0 5.834-2.416l-1.061-1.061Z" />
                    </svg>
                  </button>

                </form>

                {searchData.length === 0 ? (
                  <SearchBarNotFound />
                ) : (
                  <ul className="text-black max-h-[18.375rem] divide-y divide-slate-200 overflow-y-auto rounded-b-lg border-t border-slate-200 text-sm leading-6">
                    {searchData.map((data) => (
                      <SearchBarResult
                        key={data._id}
                        title={data.title}
                        slug={data.slug}
                        imageURL={data.imageURL}
                        onClose={props.onClose}
                        resetKey={resetKey}
                      />
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
