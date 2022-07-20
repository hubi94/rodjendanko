import React, { useState } from "react";
import { Link } from "react-router-dom";
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
      <div className="table-cell border pl-6 py-3 text-lg hover:text-[#2f35aa] hover:font-semibold hover:shadow-inner hover:shadow-violet-300">
        <ModalEdit
          open={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          list={props.list}
        />
        <Link to={"/my-list"}>{props.list.title}</Link>
      </div>
      <div className="table-cell border text-center text-slate-600">
        <Button
          className="btn px-2 pt-4 material-symbols-outlined hover:font-semibold hover:text-[#f15757]"
          type={props.type}
          title="copy link"
          buttonText="content_copy"
          onClick={handleShare}
        />
        <Button
          className="btn px-2 pt-4 material-symbols-outlined hover:font-semibold hover:text-[#f15757]"
          type={props.type}
          title="edit"
          buttonText="edit"
          onClick={handleEdit}
        />
        <Button
          className="btn px-2 pt-4 material-symbols-outlined hover:font-semibold hover:text-[#f15757]"
          type={props.type}
          title="archive"
          buttonText="archive"
          onClick={handleArchive}
        />
        <Button
          className="btn px-2 pt-4 material-symbols-outlined hover:font-semibold hover:text-[#f15757]"
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
