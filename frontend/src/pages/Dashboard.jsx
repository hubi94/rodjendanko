import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import client from "../../lib/client";
import List from "../components/List";
import Button from "../components/Button";
import Modal from "react-modal/lib/components/Modal";
import ListForm from "../components/ListForm";

const statement = "There is no lists yet.";

const Dashboard = () => {
  const [lists, setLists] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // ---------------------- Modal ------------------------------//

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleFinish = async () => {
    closeModal();
    const lists = await client.fetchLists();
    setLists(lists);
  };

  const style = {
    content: {
      position: "absolute",
      top: "2rem",
      left: "22rem",
      right: "22rem",
      bottom: "2rem",
      border: "3px solid #2f35aa",
      background: "#fff",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "0.75rem",
      outline: "none",
      padding: "3rem 4rem",
    },
  };
  // --------------------------------------------------------------------- //

  useEffect(() => {
    async function fetchLists() {
      const lists = await client.fetchLists();
      setLists(lists);
      console.log("Liste: ", lists);
      localStorage.setItem("listId", JSON.stringify(lists));
    }
    fetchLists();
  }, []);

  if (lists.length === 0) {
    return statement;
  }
  const handleDelete = (id) => {
    const newArray = [...lists].filter((list) => list.id !== id);
    setLists(newArray);
  };

  return (
    <Layout>
      <div className="rounded-xl  mx-96 mb-6 bg-gradient-to-r p-[6px] from-[#2f35aa] via-[#bca6b9] to-[#f15757]">
        <div className=" flex flex-col  justify-between bg-white rounded-lg">
          <div className="w-full h-10 ">
            <Button
              className="float-right mr-14 p-3 my-1 rounded-lg font-semibold hover:bg-violet-200 hover:text-slate-900 hover:border-none"
              type="button"
              buttonText="+ Create new list"
              onClick={openModal}
            />
          </div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            ariaHideApp={false}
            style={style}
          >
            <div className="w-full inline-block px-4 text-slate-700 text-xl font-medium text-center">
              <Button
                className="btn h-2 w-2 float-right inline-block  hover:font-semibold material-symbols-outlined"
                type="button"
                buttonText="close"
                onClick={closeModal}
              />
              <h2 className="pb-3 font-semibold border-b border-[#df7e7e8d]">
                Create your list
              </h2>
            </div>
            <div>
              <ListForm onFinish={handleFinish} />
            </div>
          </Modal>
          <div className="my-4 table w-full">
            <div className="table-header-group bg-violet-200 ">
              <div className="table-row text-slate-800 font-semibold text-xl">
                <div className="table-cell text-center">List name</div>
                <div className="table-cell text-center">Actions</div>
              </div>
            </div>
            {lists.map((list) => (
              <div className="table-row-group">
                <List
                  list={list}
                  key={list.id}
                  type="button"
                  onDelete={handleDelete}
                  // onArchive={handleArchive}
                  // onShare={handleShare}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
