import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
    Box,
    FormControlLabel,
    FormLabel,
    IconButton,
    Radio,
    RadioGroup,
    Stack,
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { AnswerFormat, getAnswerFormatDisplay } from "../types/answer";
import { Question } from "../types/question";
import { CREATE_QUESTION } from "../mutations/questionMutations";
import { GET_QUESTIONS } from "../queries/questionQueries";

const answerFormats = Object.values(AnswerFormat);

function AddQuestion({ userId }: { userId: number }) {
    const [open, setOpen] = useState(false);
    const [question, setQuestion] = useState("");
    const [answerFormat, setAnswerFormat] = useState(AnswerFormat.ONE_CHOICE);
    const [answerChoices, setAnswerChoices] = useState<string[]>([""]);

    // チェック用のフィールド
    const [isInvalidQuestion, setIsInvalidQuestion] = useState(false);
    const [isInvalidAnswerChoices, setIsInvalidAnswerChoices] = useState(false);
    const [confirmAnswerChoice, setConfirmAnswerChoice] = useState(false);

    const navigate = useNavigate();
    const [createQuestion] = useMutation<{ createQuestion: Question }>(
        CREATE_QUESTION
    );

    const theme = useTheme();
    const errorColor = theme.palette.error.main; // MUIのデフォルトのエラー色

    const resetState = () => {
        setQuestion("");
        setAnswerFormat(AnswerFormat.ONE_CHOICE);
        setAnswerChoices([""]);
        setIsInvalidQuestion(false);
        setIsInvalidAnswerChoices(false);
        setConfirmAnswerChoice(false);
    };

    const handleCreateQuestion = async () => {
        setIsInvalidQuestion(false);

        let isValid = false;

        if (question.length === 0) {
            setIsInvalidQuestion(true);
            isValid = true;
        }

        if (
            answerFormat != AnswerFormat.DESCRIPTION &&
            answerChoices.some((element) => element === "")
        ) {
            setConfirmAnswerChoice(true);
            isValid = true;
        }

        if (
            answerFormat != AnswerFormat.DESCRIPTION &&
            answerChoices.length === 0
        ) {
            setIsInvalidAnswerChoices(true);
            isValid = true;
        }

        if (isValid) {
            return;
        }

        const createQuestionInput = { question, answerFormat, userId };
        const createAnswerChoicesInput = answerChoices.map((answerChoice) => ({
            answerChoice,
        }));

        try {
            await createQuestion({
                variables: { createQuestionInput, createAnswerChoicesInput },
                refetchQueries: [
                    { query: GET_QUESTIONS, variables: { userId: userId } },
                ], // クエリを再実行 一覧を取得
            });

            resetState();
            setOpen(false);
        } catch (error: unknown) {
            if (error instanceof Error && error.message === "Unauthorized") {
                localStorage.removeItem("token");
                alert("セッションが切れました。再度ログインしてください。");
                navigate("/login");
                return;
            }
            alert("エラーが発生しました。");
        }
    };

    const addAnswerChoice = () => {
        setAnswerChoices([...answerChoices, ""]);
    };

    const removeAnswerChoice = (index: number) => {
        setAnswerChoices(answerChoices.filter((_, i) => i !== index));
    };

    const handleChoiceChange = (index: number, value: string) => {
        const newAnswerChoices = [...answerChoices];
        newAnswerChoices[index] = value;
        setAnswerChoices(newAnswerChoices);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        resetState();
        setOpen(false);
    };

    return (
        <>
            <Box alignSelf="flex-start">
                <Button
                    variant="outlined"
                    sx={{ widows: "270px" }}
                    onClick={handleClickOpen}
                >
                    質問作成
                </Button>
            </Box>
            <Dialog
                fullWidth={true}
                maxWidth="sm"
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>質問作成</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="normal"
                        id="question"
                        label="質問内容"
                        fullWidth
                        multiline
                        rows={4}
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        error={isInvalidQuestion && question === ""}
                        helperText={
                            isInvalidQuestion && question === ""
                                ? "質問内容は必須です"
                                : ""
                        }
                    />

                    <FormLabel id="demo-row-radio-buttons-group-label">
                        回答形式
                    </FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={answerFormat}
                        onChange={(e) =>
                            setAnswerFormat(e.target.value as AnswerFormat)
                        }
                    >
                        {answerFormats?.map((answerFormat) => (
                            <FormControlLabel
                                key={answerFormat}
                                value={answerFormat}
                                control={<Radio />}
                                label={getAnswerFormatDisplay(answerFormat)}
                            />
                        ))}
                    </RadioGroup>
                </DialogContent>

                {answerFormat !== AnswerFormat.DESCRIPTION && (
                    <>
                        <DialogTitle>回答作成</DialogTitle>
                        {isInvalidAnswerChoices && (
                            <Typography
                                fontSize={12}
                                color={errorColor}
                                sx={{ ml: 5 }}
                            >
                                回答選択肢は必須です
                            </Typography>
                        )}
                        <DialogContent>
                            {answerChoices.map((answerChoice, index) => (
                                <Stack
                                    key={index}
                                    direction="row"
                                    spacing={1}
                                    marginTop={2}
                                >
                                    <TextField
                                        key={index}
                                        autoFocus
                                        margin="normal"
                                        id={`answerChoice-${index}`}
                                        label="回答選択肢"
                                        fullWidth
                                        required
                                        value={answerChoice}
                                        onChange={(e) =>
                                            handleChoiceChange(
                                                index,
                                                e.target.value
                                            )
                                        }
                                        error={
                                            confirmAnswerChoice &&
                                            answerChoice === ""
                                        }
                                        helperText={
                                            confirmAnswerChoice &&
                                            answerChoice === ""
                                                ? "回答選択肢は必須です"
                                                : ""
                                        }
                                    />
                                    <IconButton
                                        color="primary"
                                        aria-label="remove answer choice"
                                        onClick={() =>
                                            removeAnswerChoice(index)
                                        }
                                    >
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </Stack>
                            ))}
                            <IconButton
                                color="primary"
                                aria-label="add answer choice"
                                onClick={addAnswerChoice}
                            >
                                <AddIcon />
                            </IconButton>
                        </DialogContent>
                    </>
                )}
                <DialogActions>
                    <Button onClick={handleClose}>キャンセル</Button>
                    <Button onClick={handleCreateQuestion}>送信</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddQuestion;
