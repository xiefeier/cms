import Router from "./router";
import './asserts/base.less'
// import  ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';

import store from './store'
import { Provider } from "react-redux";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <Router />
    </Provider>)

// ReactDOM.render(
//     <Router />,
//     document.getElementById("root")
// )