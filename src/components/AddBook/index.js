import styles from './style.module.css';
import { useState } from 'react'
import axios from 'axios'
import {API_BASE_URL} from '../../constants'

const AddBook = (props) => {
    const [book, setBook] = useState({title:"", author:"", pages:"",genre:"",photo:"" })
    const [error, setError] = useState("")

    const handleSubmit = event => {
        event.preventDefault()
        for(let key in book){
            if(!book[key]){
                return setError("Please fill all the fields")
            }
        }
        if(!Number.isInteger(+book.pages)){
            return setError("Page count must be a number")
        }
        axios
            .post(API_BASE_URL, book)
            .then(r => {
                setError("")
                setBook({title:"", author:"", pages:"",genre:"",photo:"" })
                props.onAdd(r.data.book)
            })
    }

    return (
        <div>
            <h2>Add Book</h2>
            {error && <p style={{color:"red"}}>{error}</p>}
            <form className={styles.form} onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        value={book.title}
                        onChange = {e => setBook({...book, title:e.target.value})}
                        type="text" />
                </div>
                <div>
                    <label>Author</label>
                    <input
                        value={book.author}
                        onChange = {e => setBook({...book, author:e.target.value})}
                        type="text" />
                </div>
                <div>
                    <label>Pages</label>
                    <input
                        value={book.pages}
                        onChange = {e => setBook({...book, pages:e.target.value})}
                        type="text" />
                </div>
                <div>
                    <label>Photo</label>
                    <input
                        value={book.photo}
                        onChange = {e => setBook({...book, photo:e.target.value})}
                        type="text" />
                </div>
                <div>
                    <label>Genre</label>
                    <input
                        value={book.genre}
                        onChange = {e => setBook({...book, genre:e.target.value})}
                        type="text" />
                </div>
                <div>
                    <button>Add Book </button>
                </div>
            </form>
        </div>
    );
};
export default AddBook;
