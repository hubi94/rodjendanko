import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";

const MyList = () => {
  const [items, setItems] = useState([]);

  // useEffect(() => {
  //   async function getItems() {
  //     const items = await client.fetchItems(props.list.id);
  //     setItems(items);
  //   }
  //   getItems();
  // }, []);

  return (
    <Layout>
      {/* <h1>Should edit list id: {props.list.id}</h1>
      <pre>{JSON.stringify(props.list, null, 2)}</pre>
      <pre>{JSON.stringify(items, null, 2)}</pre> */}
    </Layout>
  );
};

export default MyList;
