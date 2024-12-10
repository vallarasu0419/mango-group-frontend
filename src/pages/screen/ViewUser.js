import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import image from "../../assets/Mention-bro.svg";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Tooltip } from "@mui/material";
import EditUserModal from "../../components/EditUserModal";
import { instance } from "../../controller/Common";

const ViewUser = () => {
  const cookies = new Cookies();
  const userDetails = cookies.get("user");
  const [users, setUsers] = useState();
  const [editOpen, setEditOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await instance.get(
        `/api/getUser?userId=${userDetails.userId}`
      );
      if (response.status === 200) {
        setUsers(response?.data[0]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      {editOpen && (
        <EditUserModal
          editOpen={editOpen}
          setEditOpen={setEditOpen}
          editData={users}
          fetchUsers={fetchUsers}
        />
      )}
      <div className="m-5">
        <div
          className="card shadow-sm"
          style={{
            display: "flex",
            flexDirection: windowWidth <= 800 ? "column" : "row",
            borderRadius: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            width: "50%",
          }}
        >
          <div
            className="card-left"
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f4f4f4",
              borderRadius: "10px",
            }}
          >
            <img
              src={image}
              alt="User Avatar"
              style={{
                minWidth: "100px",
                minHeight: "100px",
                borderRadius: "50%",
              }}
            />
          </div>
          <div
            className="card-right"
            style={{
              flex: 2,
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              color: "white",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>{users?.name || "User"}</h4>
              <IconButton onClick={() => setEditOpen(true)}>
                <Tooltip title="Edit" arrow>
                  <EditIcon sx={{ fontSize: "30px", color: "white" }} />
                </Tooltip>
              </IconButton>
            </div>
            <p>
              <strong>Email:</strong> {users?.email || "user@example.com"}
            </p>
            <p>
              <strong>Phone:</strong> {users?.mobile || "Not Provided"}
            </p>
            <p>
              <strong>Gender:</strong> {users?.gender || "Not Available"}
            </p>
            <p>
              <strong>Address:</strong> {users?.address || "Not Available"}
            </p>
            <p>
              <strong>Bank Details:</strong>
              {users?.bankDetails || "Not Available"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewUser;
