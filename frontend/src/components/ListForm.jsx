import React, { useState } from "react";
import Button from "./Button";
import InputField from "./InputField";

const ListForm = () => {
  const [data, setData] = useState({ listName: "" });
  const [items, setItems] = useState([
    { itemName: "", itemURL: "", itemImgURL: "" },
  ]);

  const handleList = async (ev) => {
    ev.preventDefault();
    const errors = [];
  };

  const handleListFormChange = (name, value) => {
    setData((data) => ({ ...data, [name]: value }));
  };

  //object.assign() stvara novi objekat sa novom referencom
  const handleItemFormChange = (idx, name, value) => {
    // const arr = [...items.map((item) => Object.assign({}, item))]; Object.assign({}, obj) === {...obj}
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

  const addNewItem = () => {
    setItems([...items, { itemName: "", itemURL: "", itemImgURL: "" }]);
  };

  return (
    <form onSubmit={handleList}>
      {/* <!-- List name --> */}
      <label>List Name</label>
      <InputField
        type="text"
        value={data.listName}
        onChange={(value) => handleListFormChange("listName", value)}
      />

      <div className="block">
        <Button
          onClick={addNewItem}
          className="btn ml-80"
          type="button"
          buttonText="+ Add new item"
        />
      </div>

      {items.map((item, idx) => (
        <div key={idx} className="grid grid-cols-3 gap-4">
          <div>
            <label>Item Name</label>
            <InputField
              type="text"
              value={item.itemName}
              onChange={(value) => handleItemFormChange(idx, "itemName", value)}
            />
          </div>

          <div>
            <label>Item URL</label>
            <InputField
              type="text"
              value={item.itemURL}
              onChange={(value) => handleItemFormChange(idx, "itemURL", value)}
            />
          </div>

          <div>
            <label>Item Image URL</label>
            <InputField
              type="text"
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
        className="inline-block px-7 py-3 bg-violet-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-violet-600 hover:shadow-lg focus:bg-violet-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-violet-800 active:shadow-lg transition duration-150 ease-in-out w-full"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        buttonText="Create list"
      />
    </form>
  );
};

export default ListForm;
