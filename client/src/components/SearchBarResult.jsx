import React from "react";
import {useNavigate} from "react-router-dom"

export default function SearchBarResult(props) {

  const navigate = useNavigate()

  function handleClick(){
    navigate(`/blog/${props.slug}`)
    props.onClose()
    props.resetKey()
  }

  return (
    
    <li className="flex items-center p-4 cursor-pointer hover:bg-gray-200 transition-all duration-100" onClick={handleClick}>
      <div className="flex gap-4 items-center">
        <img
          className="w-20 rounded-md"
          src={props.imageURL}
        />
        <span className="whitespace-nowrap font-semibold text-slate-900">
          {props.title}
        </span>
      </div>
    </li>
  );
}
