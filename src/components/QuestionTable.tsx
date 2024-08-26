import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Question } from "../types/question";
import { getAnswerFormatDisplay } from "../types/answerFormat.enum";
import { Link } from "react-router-dom";

export default function TaskTable({
    questions,
}: // userId,
{
    questions: Question[] | undefined;
    userId: number;
}) {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    return (
        <TableContainer component={Paper} sx={{ width: "80%", m: "auto" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>質問</TableCell>
                        <TableCell align="center">回答URL</TableCell>
                        <TableCell align="center">回答形式</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {questions?.map((question) => (
                        <TableRow
                            key={question.id}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                <Link to={`/questions/result/${question.id}`}>
                                    {question.question}
                                </Link>
                            </TableCell>
                            <TableCell align="right">
                                <Link
                                    to={`/questions/answer-form/${question.id}`}
                                >
                                    {`${baseUrl}/questions/answer-form/${question.id}`}
                                </Link>
                            </TableCell>
                            <TableCell align="right">
                                {getAnswerFormatDisplay(question.answerFormat)}
                            </TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
