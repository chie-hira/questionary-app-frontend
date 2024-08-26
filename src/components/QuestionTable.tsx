import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
    question: string,
    url: string,
    answerFormat: string,
) {
    return { question, url, answerFormat };
}

const rows = [
    createData('Sample Question1', 'http://localhost:5173/', '一択'),
    createData('Sample Question2', 'http://localhost:5173/', '一択'),
    createData('Sample Question3', 'http://localhost:5173/', '一択'),
    createData('Sample Question4', 'http://localhost:5173/', '一択'),
    createData('Sample Question5', 'http://localhost:5173/', '一択'),
    createData('Sample Question6', 'http://localhost:5173/', '一択'),
];

export default function TaskTable() {
    return (
        <TableContainer component={Paper} sx={{ width: '80%', m: 'auto' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>質問</TableCell>
                        <TableCell align="right">回答URL</TableCell>
                        <TableCell align="right">回答形式</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.question}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {row.question}
                            </TableCell>
                            <TableCell align="right">{row.url}</TableCell>
                            <TableCell align="right">{row.answerFormat}</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
