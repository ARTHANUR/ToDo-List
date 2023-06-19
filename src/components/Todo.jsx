import React, { useState } from "react";
import { FaTrash, FaPlus, FaCheck, FaTimes, FaRegEdit, FaSave } from "react-icons/fa";
import "./Todo.css";
import Confetti from "react-confetti";

const Todo = () => {
    const [input, setInput] = useState("");
    const [todo, setTodo] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [checkDone, setCheckDone] = useState(false);

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
    const handleCheck = (index) => {
        setCheckDone(true);
        handleDelete(index);
    };
    const confettiProps = {
        numberOfPieces: 100,
        gravity: 0.3,
        initialVelocityX: 5,
        initialVelocityY: 10,
        recycle: false,
        colors: ["#ff0000", "#00ff00", "#0000ff"],
        onConfettiComplete: () => setCheckDone(false),
        confettiSource: { x: 0, y: 0, w: window.innerWidth, h: window.innerHeight },
        wind: 0,
        duration: 200,
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
                        {checkDone && <Confetti {...confettiProps} className="confetti" />}

                        {editIndex === index ? (
                            <>
                                <input className="edit-input" type="text " value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                                <button className="edit-btn" onClick={handleSave}>
                                    Save <br /> <FaSave className="icon-save" />
                                </button>
                            </>
                        ) : (
                            <>
                                <h3>{item}</h3>
                                <div className="edit-todo">
                                    <FaCheck onClick={() => handleCheck(index)} className="check-icon icon" />
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
