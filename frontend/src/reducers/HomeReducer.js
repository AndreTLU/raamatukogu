const INITIAL_STATE = {
    books: [],
    loading: true
}

export default function (state = INITIAL_STATE, action){
    switch(action.type){
        case 'BOOKS_LOADED': {
            const { books } = action
            return {
                ...state,
                books,
                loading: false
            }
        }
        default:
            return {
                ...state
            }
    }
}