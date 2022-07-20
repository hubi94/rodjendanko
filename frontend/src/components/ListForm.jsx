import React, { useState } from "react";
import Modal from "react-modal/lib/components/Modal";
import client from "../../lib/client";
import Button from "./Button";
import ErrorHelper from "./ErrorHelper";
import InputField from "./InputField";

const ListForm = (props) => {
  const [data, setData] = useState({ listName: "" });
  const [items, setItems] = useState([
    { itemName: "", itemURL: "", itemImgURL: "" },
  ]);
  const [errors, setErrors] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleList = async (ev) => {
    ev.preventDefault();
    const errors = [];

    if (data.listName.trim().length === 0) {
      errors.push("You must have name for your list");
    }

    items.forEach((item, idx) => {
      if (item.itemName.trim().length === 0) {
        errors.push(`Item name is required for item: ${idx + 1}`);
      }
    });

    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    const listId = await client.createList({ title: data.listName });
    const promises = items.map((item) =>
      client.createItem(listId, {
        name: item.itemName,
        gift: {
          link: item.itemURL,
          img: item.itemImgURL,
        },
        checked: false,
      })
    );

    await Promise.all(promises);

    openModal();
  };

  const handleListFormChange = (name, value) => {
    setData((data) => ({ ...data, [name]: value }));
  };

  //object.assign() stvara novi objekat sa novom referencom
  const handleItemFormChange = (idx, name, value) => {
    // const arr = [...items.map((item) => Object.assign({}, item))];    Object.assign({}, obj) === {...obj}
    // console.log(arr);
    // arr[idx][name] = value;
    // setItems(arr);

    //pravimo novi objekat samo onog itema koga menjamo i nalazimo ga pomocu indexa
    setItems((items) =>
      items.map((item, itemIdx) => {
        if (idx === itemIdx) {
          return { ...item, [name]: value };
        }
        return item;
      })
    );
  };
  // --------------------- Modal ---------------------- //
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    props.onFinish();
  };

  const style = {
    content: {
      position: "absolute",
      top: "20rem",
      left: "25rem",
      right: "25rem",
      bottom: "20rem",
      border: "1px solid #ccc",
      background: "#fff",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "4px",
      outline: "none",
      padding: "0",
    },
  };

  // -------------------- Item handle ------------------- //

  const handleDeleteItem = (idx) => {
    setItems((items) => items.filter((_, itemIdx) => idx !== itemIdx));
  };

  const addNewItem = () => {
    setItems([...items, { itemName: "", itemURL: "", itemImgURL: "" }]);
  };

  return (
    <form className="my-6" onSubmit={handleList}>
      <ErrorHelper errors={errors} />
      {/* <!-- List name --> */}
      <InputField
        className="w-full form-control block -mb-3 px-2 py-1 text-xl font-normal text-gray-700 bg-whites bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-900 focus:bg-white focus:border-violet-600 focus:outline-none"
        type="text"
        label="List name"
        labelClassName="text-slate-700 font-semibold pl-4"
        value={data.listName}
        onChange={(value) => handleListFormChange("listName", value)}
      />
      <div className="block rtl-grid mb-4 border-b border-[#df7e7e8d]">
        <Button
          onClick={addNewItem}
          className="btn mr-14 p-3 my-1 rounded-lg font-semibold text-slate-700 hover:bg-violet-200 hover:text-slate-900 hover:border-none"
          type="button"
          buttonText="Add new item +"
        />
      </div>
      {items.map((item, idx) => (
        <div key={idx} className="border-b-2 border-[#df7e7e8d]  mb-4">
          <div>
            <Button
              className="btn m-8 pr-5 float-right material-symbols-outlined"
              type="button"
              title="delete this item"
              buttonText="delete"
              onClick={() => handleDeleteItem(idx)}
            />
            <InputField
              className="w-3/4 form-control block px-2 py-1 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-violet-600 focus:outline-none"
              type="text"
              labelClassName="text-slate-700 font-semibold pl-4"
              label="Item Name"
              value={item.itemName}
              onChange={(value) => handleItemFormChange(idx, "itemName", value)}
            />
          </div>

          <div>
            <InputField
              type="text"
              label="Item URL"
              labelClassName="text-slate-700 font-semibold pl-4"
              value={item.itemURL}
              onChange={(value) => handleItemFormChange(idx, "itemURL", value)}
            />
          </div>

          <div>
            <InputField
              type="text"
              label="Item Image URL"
              labelClassName="text-slate-700 font-semibold pl-4"
              value={item.itemImgURL}
              onChange={(value) =>
                handleItemFormChange(idx, "itemImgURL", value)
              }
            />
          </div>
        </div>
      ))}
      <br />
      {/* <!-- Submit button --> */}
      <Button
        type="submit"
        className="inline-block w-1/4 px-7 py-3 float-right bg-violet-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-violet-600 hover:shadow-lg focus:bg-violet-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-violet-800 active:shadow-lg transition duration-150 ease-in-out"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        buttonText="Create list"
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={style}
      >
        <h3 className="text-center my-6">List created successfully!</h3>
      </Modal>
    </form>
  );
};

export default ListForm;
