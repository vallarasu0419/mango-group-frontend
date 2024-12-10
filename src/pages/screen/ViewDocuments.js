import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { BaseUrl, instance } from "../../controller/Common";
import { IconButton, Tooltip } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";

const ViewDocuments = () => {
  const cookies = new Cookies();
  const userDetails = cookies.get("user");
  const [questionDetails, setQuestionDetails] = useState([]);

  const getQuestion = async () => {
    try {
      const response = await instance.get(
        `/api/getQuestion?userId=${userDetails.userId}`
      );
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
      <div className="m-5">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>View Documents</h3>
        </div>
        <table
          className="table table-hover"
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Raised On</th>
              <th scope="col">Status</th>
              <th scope="col">Document</th>
            </tr>
          </thead>
          <tbody style={{ verticalAlign: "baseline" }}>
            {questionDetails.length > 0 ? (
              questionDetails.map((e, index) => (
                <tr key={e.questionId}>
                  <th scope="row">{index + 1}</th>
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
                  <td style={{ cursor: "pointer" }}>
                    {e.documents === null ? (
                      <IconButton>
                        <Tooltip title="No File" arrow>
                          ---
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

export default ViewDocuments;
