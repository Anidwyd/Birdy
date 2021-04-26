import './MainPage.css';
import React, { useState } from 'react';
import NavigationPanel from './NavigationPanel'

function MainPage() {

  const [currentPage, setCurrentPage] = useState('register');
  const [isConnected, setConnected] = useState(false);
  const [isRegistered, setRegistered] = useState(false);

  const setLogout = () => {
    if (isConnected) {
      setConnected(false);
      setCurrentPage('register');
    }
  }

  const getConnected = () => {
    if (!isConnected) {
      setConnected(true);
      setCurrentPage('messages');
      !isRegistered && setRegistered(true);
    }
  }

  return (
    <div className="MainPage">
      <NavigationPanel page={currentPage} login={getConnected} logout={setLogout} isConnected={isConnected}/>
    </div>
  );
}

export default MainPage;
