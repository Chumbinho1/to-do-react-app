import React, { useState } from "react";

function TodoForm(props) {
    const [text, setText] = useState("")

    function handleChange(event) {
        let text = event.target.value
        setText(text)
    }

    function addItem(event) {
        event.preventDefault()
        if (text) {
            props.onAddItem(text)
            setText("")
        }
    }
    return (
        <form>
            <input type="text" className="input-task" onChange={handleChange} value={text}></input>
            <button className="add-btn" onClick={addItem}>Add</button>
        </form>
    )
}

export default TodoForm