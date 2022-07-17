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
      left: "15rem",
      right: "15rem",
      bottom: "2rem",
      border: "1px solid #ccc",
      background: "#fff",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "4px",
      outline: "none",
      padding: "3rem 5rem",
    },
  };
  // --------------------------------------------------------------------- //

  useEffect(() => {
    async function fetchLists() {
      const lists = await client.fetchLists();
      setLists(lists);
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
      <div>
        <h1>My lists</h1>
        <Button
          type="button"
          buttonText="+ Create a list"
          onClick={openModal}
        />
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          ariaHideApp={false}
          style={style}
        >
          <div className="w-full inline-block px-4 pb-2 text-xl font-medium text-center">
            <Button
              className="btn h-2 w-2 float-right inline-block"
              type="button"
              buttonText="X"
              onClick={closeModal}
            />
            <h2 className=" text-violet-500">Create your list</h2>
          </div>
          <div>
            <ListForm onFinish={handleFinish} />
          </div>
        </Modal>
        <div className="my-3">
          {lists.map((list) => (
            <List
              list={list}
              key={list.id}
              onDelete={handleDelete}
              // onEdit={handleEdit}
              // onArchive={handleArchive}
              // onShare={handleShare}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
