import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { User } from "../types/user";
import { useMutation } from "@apollo/client";
import { LOGIN, SIGN_UP } from "../mutations/authMutations";
import { useNavigate } from "react-router-dom";
import { LoginResponse } from "../types/loginResponse";

const defaultTheme = createTheme();

function SignUp() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [signUp] = useMutation<{ createUser: User }>(SIGN_UP);
    const [login] = useMutation<LoginResponse>(LOGIN);
    const navigate = useNavigate();

    /*
     * カスタムフックでバリデーション
     * emailの入力patternチェック, passwordの文字数チェックは未実装
     * 中規模,大規模なプロジェクト、複雑なフォームには Formik + Yup または React Hook Form が有効
     */
    const [isInValidName, setIsInValidName] = useState(false);
    const [isInValidEmail, setIsInValidEmail] = useState(false);
    const [isInValidPassword, setIsInValidPassword] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const signUpInput = { name, email, password };

        let isValid = true;

        if (name.length === 0) {
            setIsInValidName(true);
            isValid = false;
        }

        if (email.length === 0) {
            setIsInValidEmail(true);
            isValid = false;
        }

        if (password.length === 0) {
            setIsInValidPassword(true);
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        try {
            const signUpResult = await signUp({
                // mutationで定義した引数名 createUserInput
                // handleSubmit関数で定義した変数名 signUpInput
                variables: { createUserInput: signUpInput },
            });

            if (!signUpResult.data?.createUser) {
                alert("ユーザーの作成に失敗しました");
                return;
            }

            // signInしてMainPageに遷移
            const loginInput = { email, password };
            const loginResult = await login({ variables: { loginInput } });
            if (loginResult.data) {
                localStorage.setItem(
                    "token",
                    loginResult.data.login.accessToken
                );
            }

            if (localStorage.getItem("token")) {
                navigate("/");
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
            alert("ユーザーの作成に失敗しました");
            return;
        }
        console.log({
            name,
            email,
            password,
        });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "Silver" }}>
                        <HomeIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    error={isInValidName && name === ""}
                                    helperText={
                                        isInValidName && name === ""
                                            ? "名前は必須です"
                                            : ""
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={isInValidEmail}
                                    helperText={
                                        isInValidEmail
                                            ? "メールアドレスは必須です"
                                            : ""
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    error={isInValidPassword}
                                    helperText={
                                        isInValidPassword
                                            ? "パスワードは必須です"
                                            : ""
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default SignUp;
