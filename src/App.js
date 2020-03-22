import React from 'react';
import './styles/index.css';
import {Header} from './components/layout/Header'
import {Content} from './components/layout/Content'

function App() {
  return (
    <main data-testid="app" className="App">
      <Header />
      <Content />
    </main>
  );
}

export default App;
