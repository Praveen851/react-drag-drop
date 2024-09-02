import React, { useState } from "react";
import Picture from "./Picture";
import "../App.css";
import { useDrop } from "react-dnd";
import { PictureList } from "../constants";

function DragDrop() {
    const [board, setBoard] = useState([]);
    const [, drop] = useDrop(() => ({
        accept: "image",
        drop: (item) => {
            addImageToBoard(item.id);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const addImageToBoard = (id) => {
        const picture = PictureList.filter((picture) => picture.id === id);

        setBoard((board) => [...board, ...picture]);
    };

    const runTask = () => {
        board.forEach((item) => {
            console.log(item);
            item.onClick();
        });
    };
    return (
        <>
            <div className="Pictures">
                {PictureList.map((picture) => (
                    <Picture id={picture.id} url={picture.url} />
                ))}
            </div>
            <div className="Board" ref={drop}>
                {board.map((picture) => (
                    <Picture id={picture.id} url={picture.url} />
                ))}
            </div>
            <button onClick={runTask}>run</button>
        </>
    );
}

export default DragDrop;
