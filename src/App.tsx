import "./App.css";
import SignUp from "./components/SignUp";
import Main from "./components/Main";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {GuestRoute, PrivateRoute} from "./AuthRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<GuestRoute children={<Login />} />} />
                <Route path="/signup" element={<GuestRoute children={<SignUp />} />} />
                <Route path="/" element={<PrivateRoute children={<Main />} />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
