import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'; 
import PropTypes from 'prop-types'



export class News extends Component {
  static defaultProps={
    name:'in',
    pageSize: 8,
    category: PropTypes.string
  }
  static propTypes={
    country: PropTypes.string,
    pazeSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor(){
    super();
    console.log("hello iam constructor")
    this.state = {
        articles : [],
        loading : false,
        page:1
    }
  }
   async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0fd0d97148714f1c86e0e94489a550cc&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData=  await data.json();
    this.setState({loading:true})
     this.setState({articles:parsedData.articles,
      totalResults:parsedData.totalResults,
      loading: false
    })
   }
      handlePrevClick = async ()=>{
        console.log("previous");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0fd0d97148714f1c86e0e94489a550cc&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData =  await data.json()
        this.setState({loading:true})
        this.setState ({page: this.state.page - 1,
          articles:parsedData.articles,
          loading:false
        })

    }

      handleNextClick = async ()=>{
        console.log("Next");
        if( ! (this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){

        }
        
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0fd0d97148714f1c86e0e94489a550cc&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData =  await data.json()
        this.setState({loading:true})
        this.setState ({page: this.state.page+1,
          articles:parsedData.articles,
          loading:false
        })
      
    }


  render() {
    return (
      <div className="container my-4">
        <h1 className='text-center' style={{margin:"35px 0px"}}>NewsDaily --Top headlines</h1>
       {this.state.loading && <Spinner/>}
      
         
        <div className = "row">
        {!this.state.loading && this.state.articles && this.state.articles.map((element)=>{
         return <div className = "col-md-4" key={element.url}>
          <NewsItem  title= {element.title} description= {element.description}  imageUrl={element.urlToImage} newsUrl = {element.url}/>
          </div>
        })}  
          
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>

        </div>
      </div>
    )
  }
}

export default News
