import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import client from "../../lib/client";
import List from "../components/List";
import Button from "../components/Button";
import Modal from "react-modal/lib/components/Modal";
import InputField from "../components/InputField";
import ListForm from "../components/ListForm";

const statement = "There is no lists yet.";

const Dashboard = () => {
  const [lists, setLists] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  //Modal

  const openModal = () => {
    setModalIsOpen(true);
  };

  const afterOpenModal = () => {
    console.log("Otvorio se modal");
  };

  const closeModal = () => {
    setModalIsOpen(false);
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
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          ariaHideApp={false}
          contentLabel="Example Modal"
        >
          <h2 className="w-full px-4 py-2 text-xl font-medium text-center text-violet-500">
            Create your list
          </h2>
          <div>
            <ListForm />
          </div>
        </Modal>
        <div className="my-3">
          {lists.map((list) => (
            <List list={list} key={list.id} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
