import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

  state = {
    progress: 0
  }
  apiKey = process.env.REACT_APP_NEWS_API;

  setProgress = (progress) => {
    this.setState({
      progress: progress
    })
  }

  render() {
    return (
      <div>
          <BrowserRouter>
          <NavBar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
      <Routes>
        <Route exact path="/" element={ <News setProgress={this.setProgress} apiKey={this.apiKey} pagesize={5} key="general" country="in" category="general" />} />
        <Route exact path="/general" element={ <News setProgress={this.setProgress} apiKey={this.apiKey} pagesize={5} key="general" country="in" category="general" />} />
        <Route exact path="/business" element={ <News setProgress={this.setProgress} apiKey={this.apiKey} pagesize={5} key="business" country="in" category="business" />} />
        <Route exact path="/entertainment" element={ <News setProgress={this.setProgress} apiKey={this.apiKey} pagesize={5} key="entertainment" country="in" category="entertainment" />} />
        <Route exact path="/health" element={ <News setProgress={this.setProgress} apiKey={this.apiKey} pagesize={5} key="health" country="in" category="health" />} />
        <Route exact path="/science" element={ <News setProgress={this.setProgress} apiKey={this.apiKey} pagesize={5} key="science" country="in" category="science" />} />
        <Route exact path="/sports" element={ <News setProgress={this.setProgress} apiKey={this.apiKey} pagesize={5} key="sports" country="in" category="sports" />} />
        <Route exact path="/technology" element={ <News setProgress={this.setProgress} apiKey={this.apiKey} pagesize={5} key="technology" country="in" category="technology" />} />
      </Routes>
    </BrowserRouter>

      </div>
    )
  }
}


