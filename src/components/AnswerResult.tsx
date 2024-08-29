import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { AnswerFormat } from "../types/answer";
import { Typography } from "@mui/material";
import Loading from "./Loading";
import { GET_QUESTION } from "../queries/questionQueries";
import { Question } from "../types/question";
import AnswerChart from "./AnswerChart";
import AnswerDescription from "./AnswerDescription";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";

function AnswerResult() {
    const [authenticated, setAuthenticated] = useState(false);
    const authInfo = useAuth();

    useEffect(() => {
        if (authInfo.isAuthenticated) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }, [authInfo.isAuthenticated]);

    const { id } = useParams<{ id: string }>();
    const parsedId = id ? parseInt(id, 10) : null;

    const {
        loading: questionLoading,
        data: questionData,
        error: questionError,
    } = useQuery<{
        getQuestionById: Question;
    }>(GET_QUESTION, {
        variables: { id: parsedId },
    });

    const answerFormat = questionData?.getQuestionById.answerFormat;

    return (
        <>
            {questionLoading && <Loading />}
            {questionError && <Typography color="red">Error</Typography>}
            {!questionLoading &&
                !questionError &&
                answerFormat !== AnswerFormat.DESCRIPTION && (
                    <AnswerChart authenticated={authenticated} parsedId={parsedId} />
                )}
            {!questionLoading &&
                !questionError &&
                answerFormat === AnswerFormat.DESCRIPTION && (
                    <AnswerDescription authenticated={authenticated} parsedId={parsedId} />
                )}
        </>
    );
}

export default AnswerResult;
