// Custom Hook for easy access to the context values

import { BooksContext } from "../contexts/BookContext";
import { useContext } from "react";

export const useBooksContext = () => {
    const context = useContext(BooksContext)

    // checks if the useBooksContext is used within the BooksContextProvider
    if (!context) {
        throw Error('useBooksContext must be used inside a BooksContextProvider')
    }

    return context
}