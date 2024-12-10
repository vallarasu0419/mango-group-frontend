import React, { useEffect, useMemo, useState } from "react";
import { instance } from "../../controller/Common";
import { Tooltip } from "@mui/material";
import EditUserModal from "../../components/EditUserModal";
import AddUserModal from "../../components/AddUserModal";
import TextInputComponent from "../../components/TextInputComponent";

const CreateUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState();

  const fetchUsers = async () => {
    try {
      const response = await instance.get("/api/getAllUser");
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filterData = useMemo(() => {
    return users?.filter(
      (item) =>
        item.name.toString().toLowerCase().includes(search.toLowerCase()) ||
        item.email.toString().toLowerCase().includes(search.toLowerCase()) ||
        item.mobile.toString().toLowerCase().includes(search.toLowerCase())
    );
  }, [search, users]);

  return (
    <div className="m-5">
      {addOpen && (
        <AddUserModal
          addOpen={addOpen}
          setAddOpen={setAddOpen}
          fetchUsers={fetchUsers}
        />
      )}

      {editOpen && (
        <EditUserModal
          editOpen={editOpen}
          setEditOpen={setEditOpen}
          fetchUsers={fetchUsers}
          editData={editData}
        />
      )}

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>All Users</h2>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => setAddOpen(true)}
        >
          Add User
        </button>
      </div>
      {filterData ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <TextInputComponent
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              id="name-input"
              name="name"
            />
          </div>
          <table
            className="table table-hover"
            style={{ textAlign: "center", marginTop: "20px" }}
          >
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile</th>
                <th scope="col">Gender</th>
                <th scope="col">Address</th>
                <th scope="col">Bank Details</th>
                <th scope="col">Role</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody style={{ verticalAlign: "baseline" }}>
              {filterData.map((user, index) => (
                <tr key={user.userId}>
                  <td>{index + 1}</td>
                  <td>
                    <Tooltip title={user.name} arrow>
                      {user.name}
                    </Tooltip>
                  </td>
                  <td>
                    <Tooltip title={user.email} arrow>
                      {user.email}
                    </Tooltip>
                  </td>
                  <td>
                    <Tooltip title={user.mobile} arrow>
                      {user.mobile ? user.mobile : "-"}
                    </Tooltip>
                  </td>
                  <td>
                    <Tooltip title={user.gender} arrow>
                      {user.gender ? user.gender : "-"}
                    </Tooltip>
                  </td>
                  <td>
                    <Tooltip title={user.address} arrow>
                      {user.address ? user.address : "-"}
                    </Tooltip>
                  </td>
                  <td>
                    <Tooltip title={user.bankDetails} arrow>
                      {user.bankDetails ? user.bankDetails : "-"}
                    </Tooltip>
                  </td>
                  <td>
                    <Tooltip title={user.role} arrow>
                      {user.role}
                    </Tooltip>
                  </td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => {
                        setEditData(user);
                        setEditOpen(true);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : null}
    </div>
  );
};

export default CreateUsers;
