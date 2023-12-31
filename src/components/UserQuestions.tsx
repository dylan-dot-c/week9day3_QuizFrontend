import { getUserQuestions, deleteQuestion } from "../lib/apiWrapper";
import { useEffect, useState } from "react";
import { QuestionType } from "../types/question";
import Button from "react-bootstrap/Button";
import NewQuestionModal from "./NewQuestionModal";
import EditQuestionModal from "./EditModal";
import { toast } from "react-toastify";
import { PencilSquare, Trash } from "react-bootstrap-icons";

function UserQuestions() {
    var data: QuestionType[] = [];
    const [showQuestionModal, setShowQuestionModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [myQuestions, setMyQuestions] = useState<QuestionType[]>([]);
    const [currentEditQuestion, setCurrentEditQuestion] =
        useState<QuestionType>();
    useEffect(() => {
        async function getQuestions() {
            let result = await getUserQuestions(localStorage.getItem("token")!);
            console.log(result);
            if (result.data) {
                data = result.data.questions;
                console.log(data);
                setMyQuestions(data);
            }
        }

        getQuestions();
    }, [showQuestionModal, showEditModal]);

    async function handleDelete(id: number) {
        const token = localStorage.getItem("token");

        if (token) {
            let data = await deleteQuestion(token, id);
            console.log(data, data?.data);
        }

        toast(`Question id ${id} has been deleted`, {
            type: "info",
        });
    }

    return (
        <div className='mt-5'>
            <Button
                variant='primary'
                onClick={() => setShowQuestionModal(true)}>
                Add New Question
            </Button>
            <div className='mt-5 row justify-content-between gap-3'>
                {myQuestions.length == 0 ? (
                    <p>You have no Data</p>
                ) : (
                    myQuestions.map((question, index) => {
                        return (
                            <div
                                key={question.id}
                                className='col-5 border rounded-5 p-4 '>
                                <div className='d-flex justify-content-between'>
                                    <h5>{question.question}</h5>

                                    <div>
                                        <PencilSquare
                                            size={30}
                                            className='text-warning'
                                            onClick={() => {
                                                setCurrentEditQuestion(
                                                    myQuestions[index]
                                                );
                                                setShowEditModal(true);
                                            }}
                                        />
                                        <Trash
                                            size={30}
                                            className='text-danger'
                                            onClick={() =>
                                                handleDelete(question.id)
                                            }
                                        />
                                    </div>
                                </div>
                                <p>{question.answer}</p>
                            </div>
                        );
                    })
                )}
            </div>
            {showQuestionModal && (
                <NewQuestionModal
                    show={showQuestionModal}
                    setShow={setShowQuestionModal}
                />
            )}
            {showEditModal && (
                <EditQuestionModal
                    show={showEditModal}
                    setShow={setShowEditModal}
                    questionEdit={currentEditQuestion!}
                />
            )}
        </div>
    );
}

export default UserQuestions;
