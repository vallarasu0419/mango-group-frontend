import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DashboardLayout.css";
import { cookie } from "../../controller/Common";
import popup from "../../assets/confetti-new.svg";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ContactSupportSharpIcon from "@mui/icons-material/ContactSupportSharp";
import QuestionAnswerSharpIcon from "@mui/icons-material/QuestionAnswerSharp";
import GradingSharpIcon from "@mui/icons-material/GradingSharp";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { IconButton, Tooltip } from "@mui/material";

const DashboardLayout = () => {
  const userDetails = cookie.get("user");
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);

  const logout = () => {
    cookie.remove("user", { path: "/" });
    cookie.remove("token", { path: "/" });
    navigate("/login");
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const getIconColor = (item) => (selectedItem === item ? "#ed5f2b" : "white");

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <nav className="sidebar">
        <a className="navbar-brand mb-4" href="#">
          <h4 style={{ padding: "20px" }}>
            <IconButton>
              <Tooltip title="Dashboard" placement="right" arrow>
                <DashboardIcon
                  sx={{
                    fontSize: "30px",
                    background:
                      "linear-gradient(to right, #fc6076, #fd8767, #f47a58)",
                  }}
                />
              </Tooltip>
            </IconButton>
          </h4>
        </a>
        {userDetails.role === "USER" ? (
          <>
            <ul className="navbar-nav flex-column" style={{ height: "100%" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "90%",
                }}
              >
                <div>
                  <li className="nav-item list">
                    <Link
                      className="nav-link"
                      to="/dashboardLayout/viewUser"
                      onClick={() => handleItemClick("viewUser")}
                    >
                      <IconButton className="icon">
                        <Tooltip title="Manage Users" placement="right" arrow>
                          <ManageAccountsIcon
                            sx={{
                              fontSize: "30px",
                              color: getIconColor("viewUser"),
                            }}
                          />
                        </Tooltip>
                      </IconButton>
                    </Link>
                  </li>
                  <li className="nav-item list">
                    <Link
                      className="nav-link"
                      to="/dashboardLayout/viewQuestion"
                      onClick={() => handleItemClick("viewQuestion")}
                    >
                      <IconButton className="icon">
                        <Tooltip title="Raise Question" placement="right" arrow>
                          <ContactSupportSharpIcon
                            sx={{
                              fontSize: "30px",
                              color: getIconColor("viewQuestion"),
                            }}
                          />
                        </Tooltip>
                      </IconButton>
                    </Link>
                  </li>
                  <li className="nav-item list">
                    <Link
                      className="nav-link"
                      to="/dashboardLayout/viewDocuments"
                      onClick={() => handleItemClick("viewDocuments")}
                    >
                      <IconButton className="icon">
                        <Tooltip title="View Documents" placement="right" arrow>
                          <GradingSharpIcon
                            sx={{
                              fontSize: "30px",
                              color: getIconColor("viewDocuments"),
                            }}
                          />
                        </Tooltip>
                      </IconButton>
                    </Link>
                  </li>
                </div>

                <li className="nav-item list">
                  <IconButton onClick={logout} className="icon">
                    <Tooltip title="Logout" placement="right" arrow>
                      <LogoutSharpIcon
                        sx={{ fontSize: "30px", color: "red" }}
                      />
                    </Tooltip>
                  </IconButton>
                </li>
              </div>
            </ul>
          </>
        ) : (
          <>
            <ul className="navbar-nav flex-column" style={{ height: "100%" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "90%",
                }}
              >
                <div>
                  <li className="nav-item list ">
                    <Link
                      className="nav-link"
                      to="/dashboardLayout/createUsers"
                      onClick={() => handleItemClick("createUsers")}
                    >
                      <IconButton className="icon">
                        <Tooltip title="Manage Users" placement="right" arrow>
                          <ManageAccountsIcon
                            sx={{
                              fontSize: "30px",
                              color: getIconColor("createUsers"),
                            }}
                          />
                        </Tooltip>
                      </IconButton>
                    </Link>
                  </li>
                  <li className="nav-item list">
                    <Link
                      className="nav-link"
                      to="/dashboardLayout/viewQuestion"
                      onClick={() => handleItemClick("viewQuestion")}
                    >
                      <IconButton className="icon">
                        <Tooltip title="View Question" placement="right" arrow>
                          <QuestionAnswerSharpIcon
                            sx={{
                              fontSize: "30px",
                              color: getIconColor("viewQuestion"),
                            }}
                          />
                        </Tooltip>
                      </IconButton>
                    </Link>
                  </li>
                </div>

                <li className="nav-item list">
                  <IconButton onClick={logout} className="icon">
                    <Tooltip title="Logout" placement="right" arrow>
                      <LogoutSharpIcon
                        sx={{ fontSize: "30px", color: "red" }}
                      />
                    </Tooltip>
                  </IconButton>
                </li>
              </div>
            </ul>
          </>
        )}
      </nav>
      {/* Main Content */}
      <div className="flex-grow-1" style={{ marginLeft: "100px" }}>
        {/* Navbar */}
        <nav className="navbar">
          <div
            className=""
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              width: "100%",
            }}
          >
            <div style={{ marginLeft: "20px" }}>
              <img
                src={popup}
                alt="popup"
                style={{
                  minWidth: "50px",
                  minHeight: "50px",
                }}
              />
              Welcome <i>{userDetails.name}</i>
            </div>
            <div style={{ marginRight: "20px" }}>
              <IconButton>
                <Tooltip title="Help" placement="bottom" arrow>
                  <HelpOutlineOutlinedIcon
                    sx={{
                      fontSize: "30px",
                    }}
                  />
                </Tooltip>
              </IconButton>
              <IconButton>
                <Tooltip title="Announcement" placement="bottom" arrow>
                  <CampaignOutlinedIcon
                    sx={{
                      fontSize: "30px",
                    }}
                  />
                </Tooltip>
              </IconButton>
              <IconButton>
                <Tooltip title="Notification" placement="bottom" arrow>
                  <NotificationsNoneOutlinedIcon
                    sx={{
                      fontSize: "30px",
                    }}
                  />
                </Tooltip>
              </IconButton>
            </div>
          </div>
        </nav>

        <div className="m-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
