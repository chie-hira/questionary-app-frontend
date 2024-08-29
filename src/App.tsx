import "./App.css";
import SignUp from "./components/SignUp";
import Main from "./components/Main";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GuestRoute, PrivateRoute } from "./AuthRoute";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import AnswerForm from "./components/AnswerForm";
import AnswerResult from "./components/AnswerResult";
import Notice from "./components/Notice";
import GuestMain from "./components/GuestMain";

function App() {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/login"
                        element={<GuestRoute children={<Login />} />}
                    />
                    <Route
                        path="/signup"
                        element={<GuestRoute children={<SignUp />} />}
                    />
                    <Route
                        path="/"
                        element={<PrivateRoute children={<Main />} />}
                    />
                    <Route
                        path="/guest"
                        element={<GuestMain />}
                    />
                    <Route
                        path="/questions/answer-form/:id"
                        element={<AnswerForm />}
                    />
                    <Route
                        path="/questions/result/:id"
                        element={<AnswerResult />}
                    />
                    <Route path="/notice" element={<Notice />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
