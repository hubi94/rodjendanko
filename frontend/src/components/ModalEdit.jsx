import React, { useEffect, useState } from "react";
import Modal from "react-modal/lib/components/Modal";
import client from "../../lib/client";
import Button from "./Button";
import ListForm from "./ListForm";

const ModalEdit = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getItems() {
      const items = await client.fetchItems(props.list.id);
      setItems(items);
    }

    if (props.open) {
      getItems();
    }
  }, [props.open]);

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

  return (
    <Modal
      isOpen={props.open}
      onRequestClose={props.onClose}
      ariaHideApp={false}
    >
      <h1>Should edit list id: {props.list.id}</h1>
      <pre>{JSON.stringify(props.list, null, 2)}</pre>
      <pre>{JSON.stringify(items, null, 2)}</pre>

      <div className="w-full inline-block px-4 pb-2 text-xl font-medium text-center">
        <Button
          className="btn h-2 w-2 float-right inline-block"
          type="button"
          buttonText="X"
          onClick={props.onClose}
        />
        <h2 className=" text-violet-500">Edit your list</h2>
      </div>
      <div>
        <ListForm />
      </div>
    </Modal>
  );
};

export default ModalEdit;
