import { jwtDecode } from "jwt-decode";
import Header from "./Header";
import QuestionTable from "./QuestionTable";
import { Payload } from "../types/payload";
import { useQuery } from "@apollo/client";
import { Question } from "../types/question";
import { GET_QUESTIONS } from "../queries/questionQueries";
import { Stack, Typography } from "@mui/material";
import Loading from "./Loading";
import AddQuestion from "./AddQuestion";

function Main() {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode<Payload>(token!);
    const userId = decodedToken.sub;

    // トークンからuserIdを取得
    const { loading, data, error } = useQuery<{
        getQuestionsByUser: Question[];
    }>(GET_QUESTIONS, {
        variables: { userId: userId },
    });

    return (
        <>
            <Header />
            <Stack spacing={4} direction="column" m={8} alignItems="center">
                {loading && <Loading />}
                {error && <Typography color="red">Error</Typography>}
                {!loading && !error && (
                    <>
                        <AddQuestion userId={userId} />
                        <QuestionTable
                            questions={data?.getQuestionsByUser}
                            userId={userId}
                        />
                    </>
                )}
            </Stack>
        </>
    );
};

export default Main;
