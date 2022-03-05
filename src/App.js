import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main';
import React, {useState} from 'react';
import Home from './components/Home';

function App() {
  const [isHomeActive, setIsHomeActive] = useState(true)

  function mainToHomeHandler() {
    setIsHomeActive(true)
  }

  function onChangeStart(){
    setIsHomeActive(false)
    //console.log('clicked on onchange')
}

  return (
    <div className="App">
      <Header onChange={mainToHomeHandler} />
      <Main />
      {/* { isHomeActive ?
          <Home onChange={onChangeStart} isHomeActive={isHomeActive} /> :
          <Main />
      } */}
      
    </div>
  );
}

export default App;
