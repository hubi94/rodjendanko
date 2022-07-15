import React from "react";
import client from "../../lib/client";
import Button from "./Button";

const List = (props) => {
  const handleShare = () => {};

  const handleEdit = () => {};

  const handleArchive = () => {};

  const handleDelete = async () => {
    await client.deleteList(props.list);
    if (props.onDelete) {
      props.onDelete(props.list.id);
    }
  };

  return (
    <div>
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
