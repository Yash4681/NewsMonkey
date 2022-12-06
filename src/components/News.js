import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
    pagesize: 8,
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pagesize: PropTypes.number,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      article: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }

  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pagesize=${this.props.pagesize}&page=${this.state.page}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      article: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({page: ++this.state.page})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pagesize=${this.props.pagesize}&page=${this.state.page}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      article: this.state.article.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    return (
      <>
        <div>
          <h1 className="text-center my-4">{`NewsMonkey - Top ${this.capitalizeFirstLetter(
            this.props.category
          )} Headlines`}</h1>
          {this.state.loading && <Spinner />}
          <InfiniteScroll
            dataLength={this.state.article.length}
            next={this.fetchMoreData}
            hasMore={this.state.article.length !== this.state.totalResults}
            loader={<Spinner />}
          >
          <div className="container my-3">
            <div className="row">
              {
                this.state.article.map((element) => {
                  return (
                    <div className="col-md-4" key={element.url}>
                      <NewsItem
                        title={element.title}
                        description={element.description}
                        imageUrl={element.urlToImage}
                        newsUrl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                  );
                })}
            </div>
            </div>
          </InfiniteScroll>
        </div>
      </>
    );
  }
}

export default News;
