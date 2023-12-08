import "./App.css";
import { useEffect, useState } from "react";
function App() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    getTransactions().then((transactions) => {
      setTransactions(transactions);
    });
  }, []);
  async function getTransactions() {
    const url = "http://localhost:4000/api/transactions";
    const response = await fetch(url);
    return await response.json();
  }
  // function addNewTransaction(ev) {
  //   ev.preventDefault();
  //   const url = "http://localhost:4000/api/transaction";
  //   const price = name.split(" ")[0];
    
  //   fetch(url, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       price,
  //       name: name.substring(price.length + 1),
  //       description,
  //       datetime,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setName("");
  //       setDatetime("");
  //       setDescription("");
        
  //     });
  // }
  function addNewTransaction(ev) {
    ev.preventDefault();
  
    // Check if required fields are empty
    if (!name || !description || !datetime) {
      alert("Please fill in all required fields");
      return;
    }
  
    const url = "http://localhost:4000/api/transaction";
    const price = name.split(" ")[0];
  
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price,
        name: name.substring(price.length + 1),
        description,
        datetime,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setName("");
        setDatetime("");
        setDescription("");
        // Additional success handling if needed
      })
      .catch((error) => {
        // Handle fetch errors
        console.error("Error during fetch:", error);
      });
  }
  
  let balance = 0;
for (const transaction of transactions) {
  balance = balance + parseFloat(transaction.price); // Ensure transaction.price is a number
}
balance = balance.toFixed(2);
const fraction = balance.split('.')[1]
balance = balance.split('.')[0]
  return (
    <main>
      <h1>
        Rs {balance}<span>{fraction}</span>
      </h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input
            type="text"
            value={name}
            onChange={(ev) => {
              setName(ev.target.value);
            }}
            placeholder={"+200 new TV"}
          />
          <input
            type="datetime-local"
            value={datetime}
            onChange={(ev) => {
              setDatetime(ev.target.value);
            }}
          />
        </div>
        <div className="description">
          <input
            type="text"
            value={description}
            onChange={(ev) => {
              setDescription(ev.target.value);
            }}
            placeholder={"Description"}
          />
        </div>
        <button type="submit">Add New Transaction</button>
      </form>
      <div className="transactions">
        {transactions.length > 0 ? transactions.map((transaction) =>(<div className="transaction">
              <div className="left">
                <div className="name">{transaction.name}</div>
                <div className="description">{transaction.description}</div>
              </div>
              <div className="right">
                <div className={"price " + ((transaction.price) < 0 ? 'red' : 'green')}>{transaction.price}</div>
                <div className="datetime">{transaction.datetime}</div>
              </div>
            </div>)) : ''}
            
          
      </div>
    </main>
  );
}

export default App;
