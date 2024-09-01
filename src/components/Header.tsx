import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "@mui/material";

function Header() {
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
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        <Link href="/" sx={{ color: "white" }}>
                            Questionary App
                        </Link>
                    </Typography>
                    {authenticated && (
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;
