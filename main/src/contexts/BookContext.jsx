import { createContext, useReducer } from "react";

// empty list at first
export const BooksContext = createContext()

// state argument is the current state of the book
export const booksReducer = (state, action) => {
    switch (action.type){
        case 'SET_BOOKS': return {
            // fills the array with the current books
            books: action.payload
        }
        case 'CREATE_BOOK': return {
            // creates a new array with the new book first followed by the others
            // first parameter is the new book
            // second parameter is the existing book items
            books: [action.payload, ...state.books]
        }
        case 'DELETE_BOOK': return {
            // removes a specific book with the same id from the list
            books: state.books.filter((book) => book._id !== action.payload._id)
        }
        case 'UPDATE_BOOK': 
        return {
            // removes the previous book with the same id from the list
            books: state.books.map((book) => book._id === action.payload._id ? action.payload : book)
        }
        default: return state
    }
}

// this manages the list and makes sures the children sees the values
// the children represents the App component that was wrapped
export const BooksContextProvider = ({ children }) => {

    // pretty much similar to useState
    const [state, dispatch] = useReducer(booksReducer, {
        books: null
    })

    return (
        // wraps the entire app to provide context values (state and dispatch)
        <BooksContext.Provider value={{...state, dispatch}}>
            { children }
        </BooksContext.Provider>
    )
}