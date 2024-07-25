import React, { useState, useEffect } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const SnippetManager = () => {
  const [snippets, setSnippets] = useState([]);
  const [language, setLanguage] = useState('');
  const [code, setCode] = useState('');

  // Load snippets from localStorage on component mount
  useEffect(() => {
    try {
      const savedSnippets = JSON.parse(localStorage.getItem('snippets')) || [];
      setSnippets(savedSnippets);
    } catch (error) {
      console.error('Error loading snippets from localStorage', error);
    }
  }, []);

  // Save snippets to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('snippets', JSON.stringify(snippets));
    } catch (error) {
      console.error('Error saving snippets to localStorage', error);
    }
  }, [snippets]);

  const addSnippet = () => {
    if (language && code) {
      setSnippets([...snippets, { language, code, visible: true }]);
      setLanguage('');
      setCode('');
    }
  };

  const deleteSnippet = (index) => {
    const newSnippets = snippets.filter((_, i) => i !== index);
    setSnippets(newSnippets);
  };

  const toggleVisibility = (index) => {
    const newSnippets = snippets.map((snippet, i) =>
      i === index ? { ...snippet, visible: !snippet.visible } : snippet
    );
    setSnippets(newSnippets);
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-lg max-w-4xl w-full mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Code Snippet Manager</h1>
      <div className="mb-6 p-4 bg-gray-800 rounded-lg">
        <input
          type="text"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          placeholder="Language"
          className="border border-gray-700 p-2 rounded mb-4 w-full bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Code"
          className="border border-gray-700 p-2 rounded mb-4 w-full h-32 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addSnippet}
          className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700 transition"
        >
          Add Snippet
        </button>
      </div>
      <div>
        {snippets.map((snippet, index) => (
          <div key={index} className="mb-6 p-4 bg-gray-800 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">{snippet.language}</h2>
              <div className="flex items-center">
                <button
                  onClick={() => toggleVisibility(index)}
                  className={`mr-2 ${snippet.visible ? 'text-red-400 hover:text-red-500' : 'text-green-400 hover:text-green-500'} transition`}
                >
                  {snippet.visible ? 'Hide' : 'Show'}
                </button>
                <button
                  onClick={() => deleteSnippet(index)}
                  className="text-red-400 hover:text-red-500 transition"
                >
                  Delete
                </button>
              </div>
            </div>
            {snippet.visible && (
              <SyntaxHighlighter language={snippet.language} style={docco}>
                {snippet.code}
              </SyntaxHighlighter>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SnippetManager;
