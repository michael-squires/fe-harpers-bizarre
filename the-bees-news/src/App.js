import { Router } from '@reach/router'
import './App.css';
import ArticlesList from './components/ArticlesList';
import Header from './components/Header';
import Nav from './components/Nav';

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Router>
        <ArticlesList path='/' />
        <ArticlesList path='/topics/:topic_slug' />
      </Router>
      <ArticlesList />
    </div>
  );
}

export default App;
