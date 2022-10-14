import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import StockForm from './components/StockForm';

function App() {
  return (
    <div className="background min-h-screen grid place-content-center">
      <StockForm />
    </div>
  );
}

export default App;
