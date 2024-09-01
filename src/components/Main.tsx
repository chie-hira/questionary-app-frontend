import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { Button, Stack } from "@mui/material";

function Main() {
    const navigate = useNavigate();

    const handleAdminMain = () => {
        navigate("/admin");
    };

    const handleGuestMain = () => {
        navigate("/guest");
    };

    return (
        <>
            <Header />
            <Stack spacing={4} direction="column" m={8} alignItems="center">
                <Button
                    variant="contained"
                    sx={{ widows: "270px" }}
                    onClick={handleAdminMain}
                    size="large"
                >
                    管理画面はこちら
                </Button>
                <Button
                    variant="contained"
                    sx={{ widows: "270px" }}
                    onClick={handleGuestMain}
                    size="large"
                >
                    回答画面はこちら
                </Button>
            </Stack>
        </>
    );
}

export default Main;
