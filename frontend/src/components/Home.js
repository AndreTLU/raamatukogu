import React from 'react'
import Api from '../utils/api'

class Home extends React.Component {
  constructor(props){
    super(props)
    this.rentBook = this.rentBook.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    this.props.getBooks()
  }

  rentBook(e, value){
    console.log(value)
    Api('PUT', '/api/books/'+e.id, {params:{rented: value}})
        .then(() =>{
          this.props.getBooks()
        })
        .catch(err =>{
            console.log(err)
        })
  }
  handleSubmit(event){
    event.preventDefault()
    const data = new FormData(event.target)
    Api('POST', '/api/books', {data})
    .then(data => {
      this.props.getBooks()
    }).catch(err => {
      console.log(err)
    })
  }

  render(){
    const { home: { loading, books}} = this.props
    let items = []
    books.forEach((element,i) => {
      items.push(
      <div key={i}>
        <p><i>{element.title}</i> - {element.author} {element.rented == 'false' ? (<i></i>): (<i style={{color:'red'}} >Laenatud</i>) } </p> 
        {element.rented == 'false' ? (<button key={i} onClick={()=>this.rentBook(element, 'true')}>Laenuta</button>) : 
        (<button key={i} onClick={()=>this.rentBook(element, 'false')}>Tagasta</button>)}
      </div>)
    });
    return (
      <div>
        <h1>Raamatukogu</h1>
        <br/>
        <form onSubmit={this.handleSubmit}>
          <label>Pealkiri:<input type='text' name='title'/></label>
          <label>Autor: <input type='text' name='author'/></label>
          <input type='submit'/>
        </form>
        <br/>
        {items}
      </div>
    )
  }
}

export default Home