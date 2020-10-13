import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import Tasks from "./components/Tasks/Tasks";
import {Provider} from 'react-redux';
import store from "./store";

function App() {
  return (
    <Provider store={store}>
    <div className="App">
        <Tasks/>
    </div>
    </Provider>
  );
}

export default App;
