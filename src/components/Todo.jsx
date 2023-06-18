import React, { useState } from "react";
import {FaTrash ,FaPlus } from "react-icons/fa";
import "./Todo.css"



const Todo = () => {
    const [input, setInput] = useState("");
    const [todo, setTodo] = useState([]);

    const handleInput = (input) => {
        setInput(input.target.value);
    };

    const handleAddTodo = () => {
        console.log(todo);
        if (input.trim() !== "") {
            setTodo([...todo, input]);
        }
        setInput("");
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleAddTodo();
        }
    };
    const handleDelete = (index) => {
        const updatedTodo = todo.filter((_,i) => i !== index);
        setTodo(updatedTodo)
    }
    
    return (
        <>
            <h1>What's On Your mind ?</h1>
            <div className="input-area">
                <input onKeyPress={handleKeyPress} value={input} onChange={handleInput} type="text" />
                {/* <button onClick={handleAddTodo}>+</button> */}
                <FaPlus className="plus-icon" onClick={handleAddTodo} />
            </div>
            <div className="container">
                {todo.map((item , index) => (
                    <div className="content">
                        <h3 key={index}>{item}</h3>
                        <FaTrash  onClick={ () => handleDelete(index)} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default Todo;