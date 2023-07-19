import React from 'react';

export default function Loader() {
  return (
    <section className='fixed top-0 h-screen bg-white w-full text-black flex justify-center items-center z-50'>
       <span className="loading loading-bars loading-lg"></span>
    </section>
  )
}
