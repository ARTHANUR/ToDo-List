import React, { useState } from "react";
import { FaTrash, FaPlus, FaCheck,  FaTimes, FaRegEdit ,FaSave } from "react-icons/fa";
import "./Todo.css";

const Todo = () => {
    const [input, setInput] = useState("");
    const [todo, setTodo] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState("");

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

    const handleClearAll = (index) => {
        const clear = todo.filter((_, i) => index === -2);
        setTodo(clear);
    };
    const handleEdit = (index) => {
        setEditIndex(index);
        setEditValue(todo[index]);
    };
    const handleSave = () => {
        const updatedTodo = [...todo];
        updatedTodo[editIndex] = editValue;
        setTodo(updatedTodo);
        setEditIndex(null);
        setEditValue("");
    };
    return (
        <>
            <h1>Notes</h1>
            <div className="input-area">
                <input onKeyPress={handleKeyPress} value={input} onChange={handleInput} type="text" />

                <FaPlus className="plus-icon" onClick={handleAddTodo} />
                <div onClick={handleClearAll} className="clear">
                    <span>Clear all</span>
                    <FaTimes className="wrong-icon" />
                </div>
            </div>
            <div className="container">
                {todo.map((item, index) => (
                    <div key={index} style={{ backgroundColor: generateRandomColor() }} className="content">
                        {editIndex === index ? (
                            <>
                                <input className="edit-input" type="text " value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                                <button className="edit-btn" onClick={handleSave}>Save <br /> <FaSave className="icon-save" /></button>
                                
                            </>
                        ) : (
                            <>
                                <h3>{item}</h3>
                                <div className="edit-todo">
                                    <FaCheck className="check-icon icon" />
                                    <FaRegEdit onClick={() => handleEdit(index)} className="icon" />
                                    <FaTrash className="delete-icon icon" onClick={() => handleDelete(index)} />
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Todo;
