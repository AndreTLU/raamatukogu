import Api from '../utils/api'

export const getBooks = () => dispatch => {
    Api('GET', '/api/books', {})
        .then(data => dispatch({
            type: 'BOOKS_LOADED',
            books: data
        }))
        .catch(err =>{
            console.log(err)
        })
}