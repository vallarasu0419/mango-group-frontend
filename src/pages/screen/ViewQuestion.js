import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { BaseUrl, instance } from "../../controller/Common";
import RaiseQuestionModal from "../../components/RaiseQuestionModal";
import { IconButton, Tooltip } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import UploadDocumentModal from "../../components/UploadDocumentModal";
import AssignmentIcon from "@mui/icons-material/Assignment";

const ViewQuestion = () => {
  const cookies = new Cookies();
  const userDetails = cookies.get("user");
  const [questionDetails, setQuestionDetails] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDocument, setOpenDocument] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState();

  const getQuestion = async () => {
    try {
      const endpoint =
        userDetails.role === "USER"
          ? `/api/getQuestion?userId=${userDetails.userId}`
          : `/api/getAllQuestion`;

      const response = await instance.get(endpoint);

      if (response.status === 200 && response.data) {
        setQuestionDetails(response.data);
      }
    } catch (error) {
      setQuestionDetails([]);
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <>
      {open && (
        <RaiseQuestionModal
          open={open}
          setOpen={setOpen}
          getQuestion={getQuestion}
        />
      )}
      {openDocument && (
        <UploadDocumentModal
          openDocument={openDocument}
          setOpenDocument={setOpenDocument}
          selectedQuestion={selectedQuestion}
        />
      )}

      <div className="m-5">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>View Question</h3>
          {userDetails?.role === "USER" && (
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => setOpen(true)}
            >
              Raise Question
            </button>
          )}
        </div>
        <table
          className="table table-hover"
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              {userDetails?.role === "ADMIN" && <th scope="col">Name</th>}
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Raised On</th>
              <th scope="col">Status</th>
              {userDetails?.role === "ADMIN" && <th scope="col">Document</th>}
            </tr>
          </thead>
          <tbody style={{ verticalAlign: "baseline" }}>
            {questionDetails.length > 0 ? (
              questionDetails.map((e, index) => (
                <tr key={e.questionId}>
                  <th scope="row">{index + 1}</th>
                  {userDetails?.role === "ADMIN" && (
                    <td>
                      <Tooltip title={e.name} arrow>
                        {e.name}
                      </Tooltip>
                    </td>
                  )}
                  <td>
                    <Tooltip title={e.title} arrow>
                      {e.title}
                    </Tooltip>
                  </td>
                  <td>
                    <Tooltip title={e.description} arrow>
                      {e.description}
                    </Tooltip>
                  </td>
                  <td>
                    <Tooltip
                      title={new Date(e.createDate).toLocaleDateString()}
                      arrow
                    >
                      {new Date(e.createDate).toLocaleDateString()}
                    </Tooltip>
                  </td>
                  <td>
                    <span
                      style={{
                        backgroundColor:
                          e.status === "Pending" ? "#ec971f" : "#449d44",
                        padding: "5px",
                        borderRadius: "5px",
                      }}
                    >
                      <Tooltip title={e.status} arrow>
                        {e.status}
                      </Tooltip>
                    </span>
                  </td>
                  {userDetails?.role === "ADMIN" && (
                    <td style={{ cursor: "pointer" }}>
                      {e.documents === null ? (
                        <IconButton
                          onClick={() => {
                            setOpenDocument(true);
                            setSelectedQuestion(e);
                          }}
                        >
                          <Tooltip title="Upload File" arrow>
                            <FileUploadIcon sx={{ fontSize: "30px" }} />
                          </Tooltip>
                        </IconButton>
                      ) : (
                        <a
                          href={`${BaseUrl}/public/${e.documents}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          download="document.pdf"
                          style={{ textDecoration: "none" }}
                        >
                          <IconButton>
                            <Tooltip title="Open File" arrow>
                              <AssignmentIcon sx={{ fontSize: "30px" }} />
                            </Tooltip>
                          </IconButton>
                        </a>
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No question available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewQuestion;
