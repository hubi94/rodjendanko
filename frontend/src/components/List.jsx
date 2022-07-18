import React, { useState } from "react";
import client from "../../lib/client";
import Button from "./Button";
import ModalEdit from "./ModalEdit";

const List = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleShare = () => {};

  const handleEdit = () => {
    setModalIsOpen(true);
  };

  const handleArchive = () => {};

  const handleDelete = async () => {
    await client.deleteList(props.list);
    if (props.onDelete) {
      props.onDelete(props.list.id);
    }
  };

  return (
    <div>
      <ModalEdit
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        list={props.list}
      />
      {props.list.title}
      <div>
        <Button
          className="btn m-2"
          type="button"
          buttonText="Share"
          onClick={handleShare}
        />
        <Button
          className="btn m-2"
          type="button"
          buttonText="Edit"
          onClick={handleEdit}
        />
        <Button
          className="btn m-2"
          type="button"
          buttonText="Archive"
          onClick={handleArchive}
        />
        <Button
          className="btn m-2"
          type="button"
          buttonText="Delete"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default List;
