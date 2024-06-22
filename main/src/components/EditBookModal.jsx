import React, { useState } from 'react'
import closeIcon from "../assets/close.png"
import { useBooksContext } from '../hooks/useBooksContext'

const EditBookModal = ({ bookItem, onClose }) => {

    // grabs the dispatch function
    const { dispatch } = useBooksContext()

    const [title, setTitle] = useState(bookItem.title)
    const [author, setAuthor] = useState(bookItem.author)
    const [genre, setGenre] = useState(bookItem.genre)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const bookGenres = [
        "Action and Adventure",
        "Classics",
        "Comic and Graphic Novel",
        "Detective and Mystery",
        "Fantasy",
        "Historical Fiction",
        "Horror",
        "Literary Fiction",
        "Romance",
        "Science Fiction",
        "Thriller and Suspense",
        "Young Adult"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault()

        // passes the state values
        const book = {title, author, genre}
        
        // fetch request
        // includes the route for the patch & the object for patch
        const response = await fetch('http://localhost:4000/api/books/' + bookItem._id, {
            method: 'PATCH',
            body: JSON.stringify(book),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        // returns the json array
        const json = await response.json()

        // sets the value of the error state
        if (!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields || []);
        }

        // changes the states back to no value
        if (response.ok){
            setTitle('')
            setAuthor('')
            setGenre('')
            setError(null)
            setEmptyFields([])
            console.log("book is updated", json)

            // runs everytime a new book is created, and is added to the state
            dispatch({type: 'UPDATE_BOOK', payload: json})

            // closes the modal
            onClose()
        }
    }

    return (
        <div className={`w-screen h-screen bg-black bg-opacity-40 fixed z-[10] left-0 top-0 flex justify-center items-center`}>
            <form onSubmit={handleSubmit} className="w-[30%] p-[40px] rounded-[20px] grid grid-cols-1 text-white bg-midnight">
                <button onClick={onClose} className='w-[20px] h-[20px] justify-self-end hover:brightness-[0.80]'>
                    <img src={closeIcon} alt="" className='invert h-[100%] w-[100%]' />
                </button>

                <p className="font-medium text-xl text-center mt-[10px]">Update Book</p>

                <label className="font-medium mt-[20px]">Book Title</label>
                <input 
                    type="text" 
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className={`font-medium mt-[10px] p-[10px] text-black rounded-[10px]
                        ${emptyFields.includes('title') ? 'border-2 border-darkpink' : ''}`}
                />

                <label className="font-medium mt-[20px]">Author</label>
                <input 
                    type="text" 
                    onChange={(e) => setAuthor(e.target.value)}
                    value={author}
                    className={`font-medium mt-[10px] p-[10px] text-black rounded-[10px]
                        ${emptyFields.includes('author') ? 'border-2 border-darkpink' : ''}`}
                />

                <label className="font-medium mt-[20px]">Genre</label>
                <select 
                    onChange={(e) => setGenre(e.target.value)}
                    value={genre}
                    className={`font-medium mt-[10px] p-[10px] text-black rounded-[10px] ${emptyFields.includes('genre') ? 'border-2 border-darkpink' : ''}`}>
                        <option value=""></option>
                        {bookGenres.map(genre => (
                            <option value={genre}>{genre}</option>
                        ))}
                </select>

                <button className="mt-[30px] px-[30px] py-[10px] bg-lime rounded-[10px] w-fit justify-self-center text-black font-semibold hover:brightness-[0.80]">
                    Update Book
                </button>

                {error && 
                    <div className="mt-[30px] p-[10px] rounded-[10px] font-medium border-2 border-darkpink text-darkpink bg-lightpink">
                        {error}
                    </div>
                }
            </form>
        </div>
    )
}

export default EditBookModal