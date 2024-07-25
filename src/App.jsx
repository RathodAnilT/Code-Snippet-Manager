import React from 'react';
import SnippetManager from './components/SnippetManager';
import './index.css';

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <SnippetManager />
    </div>
  );
};

export default App;
