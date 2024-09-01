import { Alert, AlertTitle, Container, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";

function Notice() {
    const [authenticated, setAuthenticated] = useState(false);
    const authInfo = useAuth();

    useEffect(() => {
        if (authInfo.isAuthenticated) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }, [authInfo.isAuthenticated]);

    const navigate = useNavigate();
    const handleBackMain = () => {
        navigate("/admin");
    };
    const handleBackGuestMain = () => {
        navigate("/guest");
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 20 }}>
            <Alert severity="success" sx={{ mb: 2 }}>
                <AlertTitle>Success</AlertTitle>
                回答しました。ご協力ありがとうございました！
            </Alert>
            {authenticated && (
                <IconButton
                    color="primary"
                    aria-label="back to question list"
                    onClick={handleBackMain}
                >
                    <KeyboardBackspaceIcon />
                </IconButton>
            )}
            {!authenticated && (
                <IconButton
                    color="primary"
                    aria-label="back to question list"
                    onClick={handleBackGuestMain}
                >
                    <KeyboardBackspaceIcon />
                </IconButton>
            )}
        </Container>
    );
}

export default Notice;
