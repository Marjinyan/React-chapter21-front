import styles from './style.module.css'
import BookItem from '../BookItem'

const BookList = ({books, onEdit}) => {
    return <div>
        <h2>Book List</h2>
        <div className={styles.bookList}>
            {
                books.map(elm => <BookItem key={elm.id} {...elm} onEdit={onEdit} /> )
            }
        </div>
    </div>
}
export default BookList