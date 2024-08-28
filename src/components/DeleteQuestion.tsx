import { useMutation } from "@apollo/client";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";
import { GET_QUESTIONS } from "../queries/questionQueries";
import { useNavigate } from "react-router-dom";
import { DELETE_QUESTION } from "../mutations/questionMutations";

const DeleteQuestion = ({ id, userId }: { id: number; userId: number }) => {
    const navigate = useNavigate();
    const [deleteQuestion] = useMutation<{ deleteQuestion: number }>(
        DELETE_QUESTION
    );

    const handleDeleteQuestion = async () => {
        try {
            await deleteQuestion({
                variables: { id },
                refetchQueries: [
                    { query: GET_QUESTIONS, variables: { userId } },
                ],
            });
            alert("質問を削除しました");
        } catch (error) {
            if (error instanceof Error && error.message === "Unauthorized") {
                localStorage.removeItem("token");
                alert("セッションが切れました。再度ログインしてください。");
                navigate("/login");
                return;
            }
            alert("エラーが発生しました。");
        }
    };

    return (
        <div>
            <Tooltip title="削除">
                <IconButton onClick={handleDeleteQuestion}>
                    <DeleteIcon color="action" />
                </IconButton>
            </Tooltip>
        </div>
    );
};

export default DeleteQuestion;
