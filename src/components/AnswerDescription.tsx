import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import { Box, Container, Typography } from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { AnswerResult } from "../types/answer";
import {GET_DESCRIPTION_ANSWERS} from "../queries/answerQueries";
import Loading from "./Loading";

function AnswerDescription({
    authenticated,
    parsedId,
}: {
    authenticated: boolean;
    parsedId: number | null;
}) {
    const navigate = useNavigate();
    const handleBackMain = () => {
        navigate("/");
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
                    <Typography variant="h4" align="center" gutterBottom>
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
                        <Typography id="select">
                            <IconButton
                                color="primary"
                                aria-label="remove answer choice"
                            >
                                <QuizIcon />
                            </IconButton>
                            {descriptionAnswers?.[0].question.question}
                        </Typography>
                    </Box>
                    <List
                        sx={{
                            width: "100%",
                            bgcolor: "background.paper",
                        }}
                    >
                        {descriptionAnswers?.map((answer) => (
                            <ListItem key={answer.id} disableGutters>
                                <IconButton aria-label="comment" color="default">
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
                        <IconButton
                            color="primary"
                            aria-label="back to question list"
                            onClick={handleBackMain}
                        >
                            <KeyboardBackspaceIcon />
                        </IconButton>
                    )}
                </Container>
            )}
        </Container>
    );
}

export default AnswerDescription;
