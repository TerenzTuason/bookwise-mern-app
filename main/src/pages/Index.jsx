import React from "react";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import BookForm from "../components/BookForm";
import { useBooksContext } from "../hooks/useBooksContext";
import downIcon from "../assets/down.png"
import filterIcon from "../assets/filter.png"

const Index = () => {
  // const [books, setBooks] = useState(null);        not needed anymore because of react context

  // state is the list of books
  const {books, dispatch} = useBooksContext()

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

  const [genre, setGenre] = useState('')
  const [isFilterClicked, setIsFilterClicked] = useState(false)

  // runs when this component is rendered
  useEffect(() => {
    const fetchBooks = async () => {
      // fetch the list of books from the server
      const response = await fetch("http://localhost:4000/api/books");
      // gets the array of objects in json format
      const json = await response.json();

      // checks if the response is okay
      if (response.ok) {
        // updates the array of books                 not needed anymore because of react context
        // setBooks(json);                            not needed anymore because of react context

        // once this component starts/reloaded it sets the current books in the state
        // type describes the state change, and payload is for the data needed
        dispatch({type: 'SET_BOOKS', payload: json})
      }
    };

    // fetch all the books and updates the books state
    fetchBooks();
  }, []);

  return (
    <div className="bg-midnight min-h-[90vh] flex justify-center pb-[40px]">
      <div className="p-[40px] pb-[20px] w-[90%] grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[2fr,1fr]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] h-fit">
          {/* if the books has a value then it will print each book object */}
          {
            books && books
              .filter((book) => genre === "" || book.genre === genre)
              .map((book) => <Card key={book._id} book={book} />)
          }
        </div>
        
        <div>
          <div className="w-[100%] flex justify-end items-center relative mb-[50px]">

            <button 
              className={`${isFilterClicked ? 'rounded-b-[0px]' : 'rounded-b-[5px]'} hover:brightness-[0.80] ml-[20px] px-[20px] py-[10px] rounded-[5px] flex items-center bg-white`}
              onClick={() => setIsFilterClicked(!isFilterClicked)}>
                <p className="font-semibold mr-[10px]">Filter</p>
                <img src={filterIcon} alt="" className={`w-[20px] h-[20px]`}/>
            </button>

            <div className={`${isFilterClicked ? 'block' : 'hidden'} text-white w-fit bg-white flex flex-col absolute top-full`}>
              <button className="px-[10px] py-[2px] bg-white hover:brightness-[0.80]" onClick={() => {
                setGenre("")
                setIsFilterClicked(false)
                }}>
                <p className="text-white">-</p>
              </button>
              {bookGenres.map(genre => (
                  <button className="px-[10px] py-[2px] bg-white hover:brightness-[0.80]" onClick={() => {
                    setGenre(genre)
                    setIsFilterClicked(false)
                    }}>
                    <p className="text-black text-left">{genre}</p>
                  </button>
              ))}
            </div>
          </div>

          <BookForm/>
        </div>

        <button className="fixed lg:hidden right-[10px] bottom-[20px] p-[10px] bg-sky rounded-[100px] hover:brightness-[0.80]"><img src={downIcon} className="invert w-[20px] h-[20px]" 
        onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" })}/></button>
      </div>
    </div>
  );
};

export default Index;
