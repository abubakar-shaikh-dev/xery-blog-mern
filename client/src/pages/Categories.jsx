import React, { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import categories from "../services/api/categories.json"
import Loader from "../components/Loader";

export default function Categories() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>

      {loading ? (
        <Loader />
      ) : (
        <>
          <section className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
            <div className="grid grid-cols-2 grid-rows-2 gap-5 sm:grid-cols-3 sm:grid-rows-3">
              {categories.map(category=>{
                return <CategoryCard 
                key={category.id}
                name={category.name}
                imageURL={category.imageURL}
                link={`/categories/${category.name}`}
              />
              })}
            </div>
          </section>
        </>
      )}

      
    </>
  );
}
