import { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import axios from 'axios'
import {API_BASE_URL} from '../../constants'
import styles from './style.module.css'

const UpdateBook = props => {
    const id = props.id
    const [book, setBook] = useState(null)
    useEffect(() => {
        axios
            .get(`${API_BASE_URL}/${id}`)
            .then(r => {
                console.log(r.data) // {book:{...}}
                setBook(r.data.book)
            })
    }, [])

    const modalStyle = {
        content:{
            width:"400px", 
            height:"300px"
        },
        overlay:{
            background:"rgba(0,0,0,0.8)"
        }
    }

    const handleForm = event => {
        event.preventDefault()
        axios
            .put(`${API_BASE_URL}/${id}`, book)
            .then(r => {
                console.log(r.data) // {success:’OK’}
                props.closeModal()
                props.onChangeBook(book)
            })
    }

    const deleteBook = () => {
        axios
            .delete(`${API_BASE_URL}/${id}`)
            .then(r => {
                console.log(r.data) //{success:”OK”}
                props.closeModal()
                props.removeBook(id)
            })
    }
    
    return <ReactModal
            isOpen={true}
            ariaHideApp={false}
            style={modalStyle}
            onRequestClose={ () => props.closeModal() }
        >
            <h3>EDIT A BOOK</h3>
            <form className={styles.form} onSubmit={handleForm}>
                <div>
                    <label>title</label>
                    <input 
                        type="text"
                        value={book ? book.title : ""}
                        onChange={e => setBook({...book, title:e.target.value})}
                    />
                </div>
                <div>
                    <label>author</label>
                    <input 
                        type="text"
                        value={book ? book.author : ""}
                        onChange={e => setBook({...book, author:e.target.value})}
                    />
                </div>
                <button>save</button>
            </form>
            <div className={styles.tools}>
                <button className={styles.deleteBtn} onClick={deleteBook}>delete</button>
                <button className={styles.cancelBtn} onClick={() => props.closeModal()}>cancel</button>
            </div>
        </ReactModal>
    }
    export default UpdateBook