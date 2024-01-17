import React from 'react';
import './App.css';
import ToolbarWrapper from './components/toolbar/toolbar-wrapper.component';
import DeckWrapper from './components/deck-gl/deckgl-wrapper.component';

function App() {
  return (
    <div className="App">
      <div className='root-comp'>
        <ToolbarWrapper />
        <DeckWrapper />
      </div>
    </div>
  );
}

export default App;
