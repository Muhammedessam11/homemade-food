import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [foods, setFoods] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = () => {
    axios.get("http://63.178.171.156:30005/api/foods")
      .then(res => setFoods(res.data))
      .catch(err => console.error(err));
  };

  const addFood = () => {
    axios.post("http://63.178.171.156:30005/api/foods", { name, price })
      .then(() => {
        fetchFoods();
        setName("");
        setPrice("");
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Homemade Food Marketplace</h1>
      <div>
        <input placeholder="Food name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
        <button onClick={addFood}>Add Food</button>
      </div>
      <ul>
        {foods.map(food => (
          <li key={food.id}>{food.name} - ${food.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
