import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main';
import React, {useState} from 'react';
import Home from './components/Home';
import Footer from './components/Footer';

function App() {
  const [flag, setFlag] = useState(false)

  function setFlagTrue() {
    setFlag(true)
  }

  function setFlagFalse() {
    setFlag(false)
  }

  return (
    <div className="App">
      <Header onChange={setFlagTrue} />
      <Main flag={flag} changeFlag={setFlagFalse} />
      {/* { isHomeActive ?
          <Home onChange={onChangeStart} isHomeActive={isHomeActive} /> :
          <Main />
      } */}
      <Footer /> 
    </div>
  );
}

export default App;
