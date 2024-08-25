import "./App.css";
import SignUp from "./components/SignUp";
import Main from "./components/Main";
import NotFound from "./components/NotFound";
import Login from "./components/Login";

function App() {
    return (
        <>
            <Login />
            <SignUp />
            <Main />
            <NotFound />
        </>
    );
}

export default App;
