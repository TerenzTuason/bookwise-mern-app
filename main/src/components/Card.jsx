import React, { useState } from "react";
import editIcon from "../assets/edit.png"
import deleteIcon from "../assets/delete.png"
import { useBooksContext } from "../hooks/useBooksContext";
import { formatDistanceToNow } from "date-fns";
import EditBookModal from "./EditBookModal";

const Card = ({ book }) => {
  // grabs the dispatch function
  const { dispatch } = useBooksContext()
  const [showModal, setShowModal] = useState(false);

  // function to reach into the api
  const handleDeleteClick = async () => {
    // fetch request
    // includes the route for the post & the object for post
    const response = await fetch('http://localhost:4000/api/books/' + book._id, {
        method: 'DELETE'
    })

    // returns the json array
    const json = await response.json()
    
    if (response.ok){
        // runs everytime a new book is deleted, and is removed from the state
        dispatch({type: 'DELETE_BOOK', payload: json})
    }
  }

  const handleUpdateClick = () => {
    setShowModal(true);
  }

  return (
    <div className="bg-gunmetal w-[100%] rounded-[20px] p-[20px] grid grid-cols-1">
      <div className="flex">
        <p className="text-white font-medium text-xl mb-[20px] text-sky w-[100%] mr-[10px]">{book.title}</p>
        <button className="w-[20px] h-[20px] mr-[10px] hover:brightness-[0.80]" onClick={handleUpdateClick}><img src={editIcon} alt="" className="invert h-[100%] w-[100%]"/></button>
        <button className="w-[20px] h-[20px] hover:brightness-[0.80]" onClick={handleDeleteClick}><img src={deleteIcon} alt="" className="invert h-[100%] w-[100%]"/></button>
      </div>
      <p className="text-white font-medium"><strong>Author: </strong> {book.author}</p>
      <p className="text-white font-medium"><strong>Genre: </strong> {book.genre}</p>
      <p className="text-white font-medium text-sm mt-[20px] align-self-end">Created {formatDistanceToNow(new Date(book.createdAt), { addSuffix: true })}</p>

      {showModal && <EditBookModal bookItem={book} onClose={() => {
        // when this onClose method is called, the showModal state will be false
        setShowModal(false)
      }}/>}
    </div>
  );
};

export default Card;
