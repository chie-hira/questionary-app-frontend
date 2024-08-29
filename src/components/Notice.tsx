import { Alert, AlertTitle, Container } from "@mui/material";

function Notice() {
    return (
        <Container maxWidth="sm" sx={{ mt: 20 }}>
            <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                回答しました。ご協力ありがとうございました！
            </Alert>
        </Container>
    );
};

export default Notice;
