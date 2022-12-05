/**
 * App > edit+list+Means
 * 
 * login
 * 
 * register
 * 
 */
import App from "../App";
import Login from "../pages/Login"
import Edit from "../pages/Edit"
import ListTable from "../pages/ListTable"
import ListList from "../pages/ListList"
import Means from "../pages/Means"
import Register from "../pages/Register"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

const BaseRouter = () => (
    <Router>
        <Routes>
            <Route path="/" element={<App/>}>
                <Route path="/edit" element={<Edit/>}></Route>
                <Route path="/list" element={<ListList/>}></Route>
                <Route path="/edit/:id" element={<Edit/>}></Route>
                <Route path="/table" element={<ListTable/>}></Route>
                <Route path="/means" element={<Means/>}></Route>
            </Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
        </Routes>
    </Router>
)

export default BaseRouter