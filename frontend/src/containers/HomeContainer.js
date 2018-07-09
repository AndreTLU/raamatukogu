import { connect } from 'react-redux'
import Home from '../components/Home'
import { getBooks } from '../actions/HomeActions'

const mapStateToProps = state => ({
    home: state.home
})

export default connect(mapStateToProps, { getBooks })(Home)