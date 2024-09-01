import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import { Box, Container, Stack, Typography } from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { AnswerResult } from "../types/answer";
import { GET_DESCRIPTION_ANSWERS } from "../queries/answerQueries";
import Loading from "./Loading";

function AnswerDescription({
    authenticated,
    countRespondents,
    parsedId,
    question,
}: {
    authenticated: boolean;
    countRespondents: number;
    parsedId: number | null;
    question: string | undefined;
}) {
    const navigate = useNavigate();
    const handleBackMain = () => {
        navigate("/admin");
    };
    const handleBackGuestMain = () => {
        navigate("/guest");
    };

    const { loading, data, error } = useQuery<{
        getDescriptionAnswersByQuestionId: AnswerResult[];
    }>(GET_DESCRIPTION_ANSWERS, {
        variables: { questionId: parsedId },
    });

    const descriptionAnswers = data?.getDescriptionAnswersByQuestionId;

    return (
        <Container maxWidth="md" sx={{ pt: 5 }}>
            {loading && <Loading />}
            {error && <Typography color="red">Error</Typography>}
            {!loading && !error && (
                <Container maxWidth="sm" sx={{ pt: 5 }}>
                    <Typography variant="h5" align="center" sx={{ mb:2 }}>
                        アンケート結果
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "left",
                            alignItems: "center",
                            height: "100%",
                        }}
                    >
                        <Stack direction="column" spacing={2}>
                            <Typography id="select">
                                <IconButton
                                    color="primary"
                                    aria-label="remove answer choice"
                                >
                                    <QuizIcon />
                                </IconButton>
                                {question}
                            </Typography>
                            <Typography variant="h6" sx={{ pl: 2 }}>
                                回答者数: {countRespondents}名
                            </Typography>
                        </Stack>
                    </Box>
                    <List
                        sx={{
                            width: "100%",
                            bgcolor: "background.paper",
                        }}
                    >
                        {descriptionAnswers?.map((answer) => (
                            <ListItem key={answer.id} disableGutters>
                                <IconButton
                                    aria-label="comment"
                                    color="default"
                                >
                                    <CommentIcon />
                                </IconButton>
                                <ListItemText
                                    primary={answer.description}
                                    sx={{
                                        whiteSpace: "normal", // テキストを改行する
                                        wordWrap: "break-word", // 単語の途中で改行する
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>
                    {authenticated && (
                        <Stack
                            spacing={0}
                            direction="row"
                            onClick={handleBackMain}
                        >
                            <IconButton
                                color="primary"
                                aria-label="back to question list"
                            >
                                <KeyboardBackspaceIcon />
                            </IconButton>
                            <Typography
                                variant="body2"
                                color="primary"
                                sx={{
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                管理画面
                            </Typography>
                        </Stack>
                    )}
                    <Stack
                        spacing={0}
                        direction="row"
                        onClick={handleBackGuestMain}
                    >
                        <IconButton
                            color="primary"
                            aria-label="back to question list"
                        >
                            <KeyboardBackspaceIcon />
                        </IconButton>
                        <Typography
                            variant="body2"
                            color="primary"
                            sx={{
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            アンケート一覧
                        </Typography>
                    </Stack>
                </Container>
            )}
        </Container>
    );
}

export default AnswerDescription;
