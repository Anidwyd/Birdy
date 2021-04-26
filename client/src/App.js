import React, { useState } from 'react';
import Wrapper from './Wrapper'

function App() {

  const [isConnected, setConnected] = useState(true);

  const logout = () => isConnected && setConnected(false);
  const login = () => !isConnected && setConnected(true);

  return (
    <div>
      <Wrapper login={login} logout={logout} isConnected={isConnected}/>
    </div>
  );
}

export default App;