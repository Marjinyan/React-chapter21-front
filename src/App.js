import {useState, useEffect} from 'react'
import axios from 'axios'
import BookList from './components/BookList'
import AddBook from './components/AddBook'
import UpdateBook from './components/UpdateBook'
import {API_BASE_URL} from './constants'
import './App.css'

function App(){
  const [books, setBooks] = useState([])
  const [currentBook, setCurrentBook] = useState(-1)

  useEffect(() => {
    axios
      .get(API_BASE_URL)
      .then(r => {
        console.log(r.data.items) //{items: Array(0) }
        setBooks(r.data.items)
      })
  }, [])

  const addNewBook = newBook => setBooks([...books,newBook])

  const changeBook = book => {
    let index = books.findIndex(elm => elm.id === book.id)
    books[index] = book
    setBooks([...books])
  }

  const deleteBook = id => {
    let index = books.findIndex(elm => elm.id === id)
    books.splice(index,1)
    setBooks([...books])
  }

  return <div className="store">
    <h1>Book Store</h1>
    <div className="grid">
      <BookList books={books} onEdit={setCurrentBook}/>
      <AddBook onAdd={addNewBook}/>
      {
        currentBook !== -1
        &&
        <UpdateBook 
          onChangeBook={changeBook}
          removeBook={deleteBook}
          id={currentBook} 
          closeModal={() => setCurrentBook(-1)} />
      }
    </div>
  </div>
}
export default App