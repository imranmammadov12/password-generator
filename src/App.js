import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import { Alert, Input, Badge } from 'reactstrap';
import Footer from './components/Footer';
import img from './assets/i.webp'

const App = () => {
  const generateRandomPassword = (length, useLettersUppercase, useLettersLowercase, useNumbers, useSymbols) => {
    let characters = '';
    if (useLettersUppercase) {
      characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }

    if(useLettersLowercase){
      characters += 'abcdefghijklmnopqrstuvwxyz';
    }

    if(useSymbols){
      characters += "~`!@#$%^&*_-+=\":;/\\|?,.'\\'";
    }

    if (useNumbers) {
      characters += '0123456789';
    }

    if (!characters) {
      return '';
    }

    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
  };

  const [password, setPassword] = useState(generateRandomPassword(8, true, true, true, true));
  const [useLettersUppercase, setUseLettersUppercase] = useState(true);
  const [useLettersLowercase, setUseLettersLowercase] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [usePasswordLength, setUsePasswordLength] = useState(8);
  const [alertVisible, setAlertVisible] = useState(false);

  const handleGeneratePassword = () => {
    setPassword(generateRandomPassword(usePasswordLength, useLettersUppercase, useLettersLowercase, useNumbers, useSymbols));
  };


  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password).then(() => {
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 1000);
    }).catch(err => {
      console.error('Failed to copy password: ', err);
    });
  };

  return (
    <div className='font' style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Random</h1>
      <h1>Password</h1>
      <h1>Generator</h1>
      <p style={{ marginTop: '35px', marginBottom: '35px'}}>Create a random and strong password to keep your acc safe always.</p>
      <img src={img} style={{width: '150px', height: '150px', marginBottom: '20px'}}/>
      <h1>
        <Badge color='info'>
        {password}
        </Badge>
        </h1>
      <Button color="info" outline onClick={handleCopyPassword} style={{ marginLeft: '10px', marginTop: '20px', marginBottom: '20px' }}>Copy Password</Button>
      <Alert color="success" isOpen={alertVisible} toggle={() => setAlertVisible(false)} style={{ marginTop: '20px', width: '300px', marginLeft: '500px', alignItems:'center' }}>
        Password Copied!
      </Alert>
      <div>
        <label>
          <input
            type="checkbox"
            checked={useLettersUppercase}
            onChange={(e) => setUseLettersUppercase(e.target.checked)}
            style={{margin: '20px'}}
          />
          ABC
        </label>

        <label>
          <input
            type="checkbox"
            checked={useLettersLowercase}
            onChange={(e) => setUseLettersLowercase(e.target.checked)}
            style={{margin: '20px'}}v
          />
          abc
        </label>

        <label>
          <input
            type="checkbox"
            checked={useNumbers}
            onChange={(e) => setUseNumbers(e.target.checked)}
            style={{margin: '20px'}}
          />
          123
        </label>


        <label>
          <input
            type="checkbox"
            checked={useSymbols}
            onChange={(e) => setUseSymbols(e.target.checked)}
            style={{margin: '20px'}}
          />
          #$&
        </label>
          <br></br>
          <br></br>
        <label>
          Password Length:
          <Input
            type="number"
            value={usePasswordLength}
            onChange={(e) => setUsePasswordLength(Number(e.target.value))}
            min="1"
            style={{ marginLeft: '10px', marginTop: '10px' }}
          />
        </label>
      </div>
      <Button marginTop ='20' color="info"  outline  onClick={handleGeneratePassword} style={{marginTop: '25px'}}>Generate Password</Button>
      <Footer />
    </div>
  );
};

export default App;
