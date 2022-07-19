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
    <div className="table-row">
      <div className="table-cell border pl-6 py-3 text-lg ">
        <ModalEdit
          open={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          list={props.list}
        />
        {props.list.title}
      </div>
      <div className="table-cell border text-center text-slate-700">
        <Button
          className="btn px-2 pt-4 material-symbols-outlined"
          type={props.type}
          title="copy link"
          buttonText="content_copy"
          onClick={handleShare}
        />
        <Button
          className="btn px-2 pt-4 material-symbols-outlined"
          type={props.type}
          title="edit"
          buttonText="edit"
          onClick={handleEdit}
        />
        <Button
          className="btn px-2 pt-4 material-symbols-outlined "
          type={props.type}
          title="archive"
          buttonText="archive"
          onClick={handleArchive}
        />
        <Button
          className="btn px-2 pt-4 material-symbols-outlined"
          type={props.type}
          title="delete"
          buttonText="delete"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default List;
