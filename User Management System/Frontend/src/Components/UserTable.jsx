import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../Utils/tostify";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../Store/Slices/UserSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1f2937",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: "#f0f9ff",
    display: "flex-col",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(no, _id, name, email, phone, profile) {
  return { no, _id, name, email, phone, profile };
}
function UserTable({ usersData }) {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [Data, setData] = useState([]);
  useEffect(() => {
    setData(usersData);
  }, [usersData]);
  const rows = Data.map((user, index) => {
    const { _id, name, email, phone, profile } = user;
    const img = profile.split("\\").pop();
    const ImgUrl = `http://localhost:8080/${img}`;
    return createData(index + 1, _id, name, email, phone, ImgUrl);
  });
  const handleEditUser = (id) => {
    navigate(`/admin/adminpanel/editUser/${id}`);
    console.log(`/admin/adminpanel/editUser/${id}`);
  };
  const handleDeleteUser = async (id) => {
    try {
      const url = `http://localhost:8080/admin/deleteUser/${id}`;
      const response = await axios.delete(url);
      const { message, success } = response?.data;
      if (success) {
        handleSuccess(message);
        const ExistingUsers = Data.filter((user) => {
          if(user._id !== id){
            return user
          }
        });
        setData(ExistingUsers);
        dispatch(logout())
        navigate("/admin/adminpanel");
      }
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      handleError(errorMsg);
      console.log(error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No.</StyledTableCell>
            <StyledTableCell align="center">Profile</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">User ID</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Phone</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell>{row.no}</StyledTableCell>
              <StyledTableCell align="center">
                <img
                  style={{ width: "55px" }}
                  className="rounded-full"
                  src={row.profile}
                  alt="Pic"
                />
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell>{row._id}</StyledTableCell>
              <StyledTableCell align="center">{row.email}</StyledTableCell>
              <StyledTableCell align="center">{row.phone}</StyledTableCell>
              <StyledTableCell align="right">
                <StyledTableCell align="center">
                  <button
                    onClick={() => handleEditUser(row._id)}
                    className="border py-2 px-4 font-semibold rounded-lg shadow-sm text-slate-100 bg-green-600"
                  >
                    Edit
                  </button>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <button
                    onClick={() => handleDeleteUser(row._id)}
                    className="border py-2 px-4 font-semibold rounded-lg shadow-sm text-slate-100 bg-red-700"
                  >
                    Delete
                  </button>
                </StyledTableCell>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserTable;
