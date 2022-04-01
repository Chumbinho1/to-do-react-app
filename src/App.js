import React, { useEffect, useState } from "react";
import "./App.css"
import Item from "./components/Item";
import List from "./components/List";
import Modal from "./components/Modal";
import TodoForm from "./components/TodoForm";

const SAVED_ITEMS = "savedItems"

function App() {

    const [showModal, setShowModal] = useState(false)
    const [items, setItems] = useState([])

    function onHideModal(event) {
        let target = event.target
        if (target.id === "modal") {
            setShowModal(false)
        }
    }

    useEffect(() => {
        let savedItems = JSON.parse(localStorage.getItem(SAVED_ITEMS))
        if (savedItems) {
            setItems(savedItems)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(SAVED_ITEMS, JSON.stringify(items))
    }, [items])

    function onAddItem(text) {
        let item = new Item(text)

        setItems([...items, item])
    }
    function onItemDeleted(item) {
        let filteredItems = items.filter(it => it.id !== item.id)

        setItems(filteredItems)
    }
    function onDone(item) {
        let updatedItems = items.map(it => {
            if (it.id === item.id) {
                it.done = !it.done
            }
            return it
        })
        setItems(updatedItems)
    }
    return (
        <div className="container">
            <header className="header">
                <h1>To-Do List</h1>
                <button className="addButton" onClick={() => { setShowModal(true)}}>+</button>
            </header>
            <List items={items} onItemDeleted={onItemDeleted} onDone={onDone}></List>
            <Modal show={showModal} onHideModal={onHideModal}><TodoForm onAddItem={onAddItem}></TodoForm></Modal>
        </div>
    )
}





export default App