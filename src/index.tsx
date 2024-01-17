import { render } from "react-dom"
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import store from "./store";
// import reportWebVitals from './reportWebVitals';

const roolElement = document.getElementById('root') as HTMLElement;
window.store = store;
render(
  <Provider store={store}>
    <App />
  </Provider>,
  roolElement
  )

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
