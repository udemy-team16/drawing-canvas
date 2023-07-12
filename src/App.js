import React from 'react';
import { Provider } from 'react-redux';
import store from 'redux/store';
import Palette from 'components/Palette';

function App() {
  return (
    <Provider store={store}>
      <Palette />
    </Provider>
  )
}

export default App;
