import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_QUESTION } from "../queries/questionQueries";
import { Question } from "../types/question";
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    IconButton,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import Loading from "./Loading";
import { AnswerFormat, getAnswerFormatSentence } from "../types/answer";
import { Fragment, useEffect, useState } from "react";
import { AnswerResult } from "../types/answer";
import { useAuth } from "../hooks/useAuth";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {CREATE_ANSWER} from "../mutations/answerMutation";

const AnswerForm = () => {
    const { id } = useParams<{ id: string }>();
    const parsedId = id ? parseInt(id, 10) : null;
    const { loading, data, error } = useQuery<{
        getQuestionById: Question;
    }>(GET_QUESTION, {
        variables: { id: parsedId },
    });
    const question = data?.getQuestionById;

    const [respondentName, setRespondentName] = useState("");
    const [respondentEmail, setRespondentEmail] = useState("");
    const [respondentChoices, setRespondentChoices] = useState<number[]>([]);
    const [description, setQuestion] = useState("");
    const [isInValidRespondentName, setIsInvalidRespondentName] =
        useState(false);
    const [isInValidRespondentEmail, setIsInvalidRespondentEmail] =
        useState(false);
    const [isInvalidDescription, setIsInvalidDescription] = useState(false);
    const [isInvalidRespondentChoices, setIsInvalidAnswerChoices] =
        useState(false);
    const navigate = useNavigate();

    const [createAnswer] = useMutation<{ createAnswer: AnswerResult }>(
        CREATE_ANSWER
    );

    const theme = useTheme();
    const errorColor = theme.palette.error.main; // MUIのデフォルトのエラー色

    const handleSubmitAnswer = async () => {
        setIsInvalidRespondentName(false);
        setIsInvalidRespondentEmail(false);
        setIsInvalidDescription(false);
        setIsInvalidAnswerChoices(false);
        let isValid = false;

        if (respondentName.length === 0) {
            setIsInvalidRespondentName(true);
            isValid = true;
        }

        if (respondentEmail.length === 0) {
            setIsInvalidRespondentEmail(true);
            isValid = true;
        }

        if (
            question?.answerFormat === AnswerFormat.DESCRIPTION &&
            (description.length === 0 || description.length > 200)
        ) {
            setIsInvalidDescription(true);
            isValid = true;
        }

        if (
            question?.answerFormat != AnswerFormat.DESCRIPTION &&
            respondentChoices.length === 0
        ) {
            setIsInvalidAnswerChoices(true);
            isValid = true;
        }

        if (isValid) {
            return;
        }

        const createAnswerResultInput = {
            questionId: question?.id,
            description,
        };
        const createAnswerDetailsInput = respondentChoices.map((choice) => ({
            answerChoiceId: choice,
        }));
        const createRespondentInput = {
            name: respondentName,
            email: respondentEmail,
        };

        try {
            await createAnswer({
                variables: {
                    createAnswerResultInput,
                    createAnswerDetailsInput,
                    createRespondentInput,
                },
            });

            navigate("/notice");
            return;
        } catch (error: unknown) {
            console.log(error);

            if (
                error instanceof Error &&
                error.message ===
                    "An answer for this question by this respondent already exists."
            ) {
                alert("すでに回答済みです");
                return;
            }
            alert("エラーが発生しました");
        }
    };

    const handleCheckboxChange = (id: number) => {
        setRespondentChoices((prevChoices) => {
            if (prevChoices.includes(id)) {
                return prevChoices.filter((choice) => choice !== id);
            } else {
                return [...prevChoices, id];
            }
        });
    };

    const handleBackMain = () => {
        navigate("/");
    };

    const [authenticated, setAuthenticated] = useState(false);
    const authInfo = useAuth();
    useEffect(() => {
        if (authInfo.isAuthenticated) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }, [authInfo.isAuthenticated]);

    return (
        <Container maxWidth="sm" sx={{ pt: 5 }}>
            <Stack spacing={4} direction="column" m={8} alignItems="center">
                <Box component="form" sx={{ mt: 1 }} minWidth={500}>
                    <Typography component="h1" fontSize={18}>
                        回答者情報
                    </Typography>
                    <Box sx={{ mt: 2, mb: 6 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="respondentName"
                                    required
                                    fullWidth
                                    id="respondentName"
                                    label="氏名"
                                    autoFocus
                                    value={respondentName}
                                    onChange={(e) =>
                                        setRespondentName(e.target.value)
                                    }
                                    error={isInValidRespondentName}
                                    helperText={
                                        isInValidRespondentName
                                            ? "回答者の氏名は必須です"
                                            : ""
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="respondentEmail"
                                    label="メールアドレス"
                                    name="respondentEmail"
                                    autoComplete="respondentEmail"
                                    value={respondentEmail}
                                    onChange={(e) =>
                                        setRespondentEmail(e.target.value)
                                    }
                                    error={isInValidRespondentEmail}
                                    helperText={
                                        isInValidRespondentEmail
                                            ? "回答者のメールアドレスは必須です"
                                            : ""
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    {loading && <Loading />}
                    {error && <Typography color="red">Error</Typography>}
                    {!loading && !error && (
                        <Box sx={{ mt: 2, mb: 6 }}>
                            <Stack spacing={3}>
                                <Typography id="select">
                                    <IconButton
                                        color="primary"
                                        aria-label="remove answer choice"
                                    >
                                        <QuizIcon />
                                    </IconButton>
                                    {question?.question}
                                </Typography>
                                <FormControl sx={{ ml: 4 }}>
                                    <FormLabel id="radio">
                                        {question?.answerFormat &&
                                            getAnswerFormatSentence(
                                                question?.answerFormat
                                            )}
                                    </FormLabel>
                                    {isInvalidRespondentChoices && (
                                        <Typography
                                            fontSize={12}
                                            color={errorColor}
                                            sx={{ mt: 2 }}
                                        >
                                            少なくとも1つの選択肢を選んでください
                                        </Typography>
                                    )}
                                    <RadioGroup
                                        aria-labelledby="respondentChoice"
                                        name="respondentChoice"
                                        onChange={(e) => {
                                            const selectedValue = parseInt(
                                                e.target.value,
                                                10
                                            );
                                            setRespondentChoices([
                                                selectedValue,
                                            ]);
                                        }}
                                    >
                                        {question?.answerChoices?.map(
                                            (answerChoice) => (
                                                <Fragment key={answerChoice.id}>
                                                    {question?.answerFormat ===
                                                        AnswerFormat.ONE_CHOICE && (
                                                        <FormControlLabel
                                                            key={
                                                                answerChoice.id
                                                            }
                                                            value={
                                                                answerChoice.id
                                                            }
                                                            control={<Radio />}
                                                            label={
                                                                answerChoice.answerChoice
                                                            }
                                                        />
                                                    )}

                                                    {question?.answerFormat ===
                                                        AnswerFormat.MULTIPLE_CHOICE && (
                                                        <FormControlLabel
                                                            key={
                                                                answerChoice.id
                                                            }
                                                            control={
                                                                <Checkbox
                                                                    checked={respondentChoices.includes(
                                                                        Number(
                                                                            answerChoice.id
                                                                        )
                                                                    )}
                                                                    onChange={() =>
                                                                        handleCheckboxChange(
                                                                            Number(
                                                                                answerChoice.id
                                                                            )
                                                                        )
                                                                    }
                                                                />
                                                            }
                                                            label={
                                                                answerChoice.answerChoice
                                                            }
                                                        />
                                                    )}
                                                </Fragment>
                                            )
                                        )}
                                    </RadioGroup>
                                    {question?.answerFormat ===
                                        AnswerFormat.DESCRIPTION && (
                                        <TextField
                                            margin="normal"
                                            id="description"
                                            label="回答"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            value={description}
                                            onChange={(e) =>
                                                setQuestion(e.target.value)
                                            }
                                            error={isInvalidDescription}
                                            helperText={
                                                question.answerFormat ===
                                                    AnswerFormat.DESCRIPTION &&
                                                isInvalidDescription &&
                                                description.length > 200
                                                    ? "200文字以内で回答してください"
                                                    : "必須です"
                                            }
                                        />
                                    )}
                                </FormControl>
                            </Stack>
                            <Button
                                sx={{ mt: 2 }}
                                fullWidth
                                // type="submit" // フォームの送信時にページがリロードされる
                                variant="outlined"
                                onClick={handleSubmitAnswer}
                            >
                                回答送信
                            </Button>
                        </Box>
                    )}
                    {authenticated && (
                        <IconButton
                            color="primary"
                            aria-label="back to question list"
                            onClick={handleBackMain}
                        >
                            <KeyboardBackspaceIcon />
                        </IconButton>
                    )}
                </Box>
            </Stack>
        </Container>
    );
};

export default AnswerForm;
