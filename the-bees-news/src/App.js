import { Router } from '@reach/router'
import './App.css';
import Article from './components/Article';
import ArticlesList from './components/ArticlesList';
import Header from './components/Header';
import Nav from './components/Nav';

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Router className='main_router'>
        <ArticlesList path='/' />
        <ArticlesList path='/topics/:topic_slug' />
        <Article path='/articles/:article_id' />
      </Router>
    </div>
  );
}

export default App;
