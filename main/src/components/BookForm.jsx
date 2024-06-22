import React, { useState } from "react";
import { useBooksContext } from "../hooks/useBooksContext";

const BookForm = () => {
    // grabs the dispatch function
    const { dispatch } = useBooksContext()

    // create a state for each properties
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [genre, setGenre] = useState('')
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
      
    // function to reach into the api
    const handleSubmit = async (e) => {
        // prevent from refreshing the page after submit
        e.preventDefault()

        // passes the state values
        const book = {title, author, genre}
        
        // fetch request
        // includes the route for the post & the object for post
        const response = await fetch('http://localhost:4000/api/books', {
            method: 'POST',
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
            console.log("new book added", json)

            // runs everytime a new book is created, and is added to the state
            dispatch({type: 'CREATE_BOOK', payload: json})
        }
    }

    return <div className="flex justify-center lg:justify-end mt-[40px] lg:mt-0">
        <form onSubmit={handleSubmit} className="md:w-[80%] w-[100%] flex flex-col text-white">
            <p className="font-medium text-xl text-center">Add a New Book</p>

            <label className="font-medium mt-[20px]">Book Title</label>
            <input 
                type="text" 
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={`font-medium mt-[10px] p-[10px] text-black rounded-[10px] 
                    ${emptyFields.includes('title') ? 'border-darkpink border-2' : ''}`}
            />

            <label className="font-medium mt-[20px]">Author</label>
            <input 
                type="text" 
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
                className={`font-medium mt-[10px] p-[10px] text-black rounded-[10px] 
                    ${emptyFields.includes('author') ? 'border-darkpink border-2' : ''}`}
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

            <button className="mt-[30px] px-[30px] py-[10px] bg-lime rounded-[10px] w-fit text-black font-semibold hover:brightness-[0.80]">
                Add Book
            </button>

            {error && 
                <div className="mt-[30px] p-[10px] rounded-[10px] font-medium border-2 border-darkpink text-darkpink bg-lightpink">
                    {error}
                </div>
            }
        </form>
    </div>;
};

export default BookForm;
