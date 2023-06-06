import React from 'react';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Shop } from './components/shop';


function App() {
  return (
    <React.Fragment>
      < Header/>
      <Shop/>
      < Footer/>
    </React.Fragment>
  );
}

export default App;
