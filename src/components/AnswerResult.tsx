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
import { GET_COUNT_ANSWER_RESPONDENTS } from "../queries/answerQueries";

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

    const {
        loading: countRespondentLoading,
        data: countRespondentData,
        error: countRespondentError,
    } = useQuery<{
        countAnswerRespondentsByQuestionId: number;
    }>(GET_COUNT_ANSWER_RESPONDENTS, {
        variables: { questionId: parsedId },
    });

    const answerFormat = questionData?.getQuestionById.answerFormat;
    const question = questionData?.getQuestionById.question;
    
    const countRespondents =
        countRespondentData?.countAnswerRespondentsByQuestionId
            ? countRespondentData.countAnswerRespondentsByQuestionId
            : 0;

    return (
        <>
            {questionLoading && countRespondentLoading && <Loading />}
            {questionError && countRespondentError && (
                <Typography color="red">Error</Typography>
            )}
            {!questionLoading &&
                !countRespondentLoading &&
                !questionError &&
                !countRespondentError &&
                answerFormat !== AnswerFormat.DESCRIPTION && (
                    <AnswerChart
                        authenticated={authenticated}
                        countRespondents={countRespondents}
                        parsedId={parsedId}
                    />
                )}
            {!questionLoading &&
                !countRespondentLoading &&
                !questionError &&
                !countRespondentError &&
                answerFormat === AnswerFormat.DESCRIPTION && (
                    <AnswerDescription
                        authenticated={authenticated}
                        countRespondents={countRespondents}
                        parsedId={parsedId}
                        question={question}
                    />
                )}
        </>
    );
}

export default AnswerResult;
