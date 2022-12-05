import reducer from "./reducer";

import {legacy_createStore as createStore} from 'redux'
// import configureStore from RTK

const store = createStore(reducer)

export default store