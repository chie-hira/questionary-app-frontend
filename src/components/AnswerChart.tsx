import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_AGGREGATE_ANSWER } from "../queries/answerQueries";
import { AggregatedAnswer } from "../types/answer";
import {
    Alert,
    AlertTitle,
    Box,
    Container,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Loading from "./Loading";

function AnswerChart({
    authenticated,
    countRespondents,
    parsedId,
}: {
    authenticated: boolean;
    countRespondents: number;
    parsedId: number | null;
}) {
    const navigate = useNavigate();
    const handleBackMain = () => {
        navigate("/");
    };
    const handleBackGuestMain = () => {
        navigate("/guest");
    };

    const { loading, data, error } = useQuery<{
        getAggregatedAnswerByQuestionId: AggregatedAnswer[];
    }>(GET_AGGREGATE_ANSWER, {
        variables: { questionId: parsedId },
    });

    if (data?.getAggregatedAnswerByQuestionId.length === 0) {
        return (
            <Container maxWidth="sm" sx={{ mt: 20 }}>
                <Alert severity="info" sx={{ mb: 2 }}>
                    <AlertTitle>Info</AlertTitle>
                    まだ回答がありません。
                </Alert>
                {authenticated && (
                    <IconButton
                        color="primary"
                        aria-label="back to question list"
                        onClick={handleBackMain}
                    >
                        <KeyboardBackspaceIcon />
                    </IconButton>
                )}
                {!authenticated && (
                    <IconButton
                        color="primary"
                        aria-label="back to question list"
                        onClick={handleBackGuestMain}
                    >
                        <KeyboardBackspaceIcon />
                    </IconButton>
                )}
            </Container>
        );
    }

    const aggregatedAnswers = data?.getAggregatedAnswerByQuestionId;
    const question = aggregatedAnswers?.[0];

    const chartData = aggregatedAnswers?.map((answer) => answer.count);
    const categories = aggregatedAnswers?.map((answer) => answer.choice);
    const total = chartData?.reduce((sum, value) => sum + value, 0) || 0;

    const series = [
        {
            name: "回答数",
            data: chartData || [],
        },
    ];

    const options = {
        chart: {
            id: "answer-bar",
            stacked: true,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                dataLabels: {
                    position: "top",
                },
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val: number) {
                const percentage = ((val / total) * 100).toFixed(2);
                return `${val}(${percentage}%)`;
            },
            offsetY: -20,
            style: {
                fontSize: "12px",
                colors: ["#304758"],
            },
        },
        xaxis: {
            categories: categories,
        },
        colors: ["#606DC2"],
    };

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
                        <Stack direction="column" spacing={2}>
                            <Typography id="select">
                                <IconButton
                                    color="primary"
                                    aria-label="remove answer choice"
                                >
                                    <QuizIcon />
                                </IconButton>
                                {question?.question}
                            </Typography>
                            <Typography variant="h6" sx={{ pl: 2 }}>
                                回答者数: {countRespondents}名
                            </Typography>
                        </Stack>
                    </Box>
                    <ReactApexChart
                        options={options}
                        type="bar"
                        series={series}
                    />
                    {authenticated && (
                        <IconButton
                            color="primary"
                            aria-label="back to question list"
                            onClick={handleBackMain}
                        >
                            <KeyboardBackspaceIcon />
                        </IconButton>
                    )}
                    {!authenticated && (
                        <IconButton
                            color="primary"
                            aria-label="back to question list"
                            onClick={handleBackGuestMain}
                        >
                            <KeyboardBackspaceIcon />
                        </IconButton>
                    )}
                </Container>
            )}
        </Container>
    );
}

export default AnswerChart;
