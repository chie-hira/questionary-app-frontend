import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
    FormControlLabel,
    FormLabel,
    IconButton,
    Radio,
    RadioGroup,
    Stack,
} from "@mui/material";
import {
    AnswerFormat,
    getAnswerFormatDisplay,
} from "../types/answerFormat.enum";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function AddQuestion() {
    const [open, setOpen] = useState(false);
    const [question, setQuestion] = useState("");
    const [answerFormat, setAnswerFormat] = useState("");
    const [answerChoices, setAnswerChoices] = useState<string[]>([""]);
    const answerFormats = Object.values(AnswerFormat);

    const addAnswerChoice = () => {
        setAnswerChoices([...answerChoices, ""]);
    };

    const removeAnswerChoice = (index: number) => {
        setAnswerChoices(answerChoices.filter((_, i) => i !== index));
    };

    const handleChange = (index: number, value: string) => {
        const newAnswerChoices = [...answerChoices];
        newAnswerChoices[index] = value;
        setAnswerChoices(newAnswerChoices);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                variant="outlined"
                sx={{ widows: "270px" }}
                onClick={handleClickOpen}
            >
                質問作成
            </Button>
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
                    />

                    <FormLabel id="demo-row-radio-buttons-group-label">
                        回答形式
                    </FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={answerFormat}
                        onChange={(e) => setAnswerFormat(e.target.value)}
                    >
                        {answerFormats?.map((answerFormat) => (
                            <FormControlLabel
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
                        <DialogContent>
                            {answerChoices.map((answerChoice, index) => (
                                <Stack
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
                                            handleChange(index, e.target.value)
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
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
