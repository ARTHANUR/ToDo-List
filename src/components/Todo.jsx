import React, { useState } from "react";
import { FaTrash, FaPlus, FaCheck } from "react-icons/fa";
import "./Todo.css";

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
        const updatedTodo = todo.filter((_, i) => i !== index);
        setTodo(updatedTodo);
    };

    const generateRandomColor = () => {
        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
        return randomColor;
    };

    // const handleCheck = (index) => {
    //     const updatedTodo = todo.map((item, i) => {
    //         if (i === index) {
    //             return { ...item, completed: !item.completed };
    //         }
    //         return item;
    //     });
    //     setTodo(updatedTodo);
    // };

    

    return (
        <>
            <h1>Notes</h1>
            <div className="input-area">
                <input onKeyPress={handleKeyPress} value={input} onChange={handleInput} type="text" />
                <FaPlus className="plus-icon" onClick={handleAddTodo} />
                <h1>Clear all</h1>
            </div>
            <div className="container">
                {todo.map((item, index) => (
                    <div style={{ backgroundColor: generateRandomColor() }} className="content">
                        <h3 style={{ textDecoration: item.completed ? "line-through" : "none" }} key={index}>
                            {item}
                        </h3>
                        <div className="edit-todo">
                            <FaCheck className="check-icon icon" /*onClick={() => handleCheck(index)}*/ />
                            <FaTrash className="delete-icon icon" onClick={() => handleDelete(index)} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Todo;
