import React from "react";
import Layout from "./Layout";
import List from "./List";

const Archive = () => {
  // const handleDelete = (id) => {
  //   const newArray = [...lists].filter((list) => list.id !== id);
  //   setLists(newArray);
  // };
  return (
    <Layout>
      <div className="rounded-xl  mx-96 mb-6 bg-gradient-to-r p-[6px] from-[#2f35aa] via-[#bca6b9] to-[#f15757]">
        <div className=" flex flex-col  justify-between bg-white rounded-lg">
          <h2 className="text-center text-xl text-slate-700 m-8">
            Coming soon!
          </h2>
          <div className="my-4 table w-full">
            <div className="table-header-group bg-violet-200 ">
              <div className="table-row text-slate-800 font-semibold text-xl">
                <div className="table-cell text-center">List name</div>
                <div className="table-cell text-center">Actions</div>
              </div>
            </div>
            {[{ title: "Moja lista 1" }].map((title, idx) => (
              <div className="table-row-group">
                <List
                  list={title}
                  key={idx}
                  type="button"
                  // onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Archive;
