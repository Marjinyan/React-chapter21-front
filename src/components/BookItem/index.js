import styles from './style.module.css'

const BookItem = (book) => {
    console.log(book)
    return < div className={styles.item}>
        <img src={book.photo} />
        <h2>{book.title} </h2>
        <p className={styles.author}>by {book.author}</p>
        <p>{book.pages} pages</p>
        <button onClick={() => book.onEdit(book.id)}>Edit</button>
    </div>
}
export default BookItem