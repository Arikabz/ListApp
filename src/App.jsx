import React from "react"
import {useState} from 'react'
import './styles.css'

const Button = (props) => {
    return (
        <div>
            <button onClick = {props.do}>{props.name}</button>
        </div>
    )
}
const Input = (props) => <input type="text" placeholder={props.placeholder}
    name={props.name}/>

    async function newList() {
        try{
            const response = await fetch('newList', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: null
            })
        }catch(err){
            console.log(err)
        }
    }
function App() {
  return (
    <div className="App">
      <header className="App-header">
          <h1>ListAPP</h1>
          <h3>Get Your List</h3>
          <form action="/getList" method="GET">
              <Input placeholder="LIST ID" name='listID'/>
              <button type="submit">Get List</button>
          </form>
          <h4>...or create a new one!</h4>
          <button onClick={newList()}>CREATE</button>
          <h5>Add an Item</h5>
          <form action="/addItem" method="POST">
              <Input placeholder="Item:" name="itemName"/>
              <Input placeholder="Author" name="author"/>
              <button type="submit">Add</button>
          </form>
          <h2>List:</h2>

      </header>
    </div>
  );
}

export default App;
