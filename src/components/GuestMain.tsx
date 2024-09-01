import { Stack, Typography } from "@mui/material";
import { Question } from "../types/question";
import { GET_All_QUESTIONS } from "../queries/questionQueries";
import { useQuery } from "@apollo/client";
import Loading from "./Loading";
import QuestionTable from "./QuestionTable";
import Header from "./Header";

function GuestMain() {
    const userId = null;

    const { loading, data, error } = useQuery<{
        getAllQuestions: Question[];
    }>(GET_All_QUESTIONS);

    return (
        <>
            <Header />
            <Stack spacing={4} direction="column" m={8} alignItems="center">
                {loading && <Loading />}
                {error && <Typography color="red">Error</Typography>}
                {!loading && !error && (
                    <>
                        <Typography variant="h5">
                            アンケート一覧
                        </Typography>
                        <QuestionTable
                            questions={data?.getAllQuestions}
                            userId={userId}
                        />
                    </>
                )}
            </Stack>
        </>
    );
}

export default GuestMain;
