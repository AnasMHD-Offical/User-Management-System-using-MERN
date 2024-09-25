import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link,useNavigate } from "react-router-dom";

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
  const navigate = useNavigate()
  const rows = usersData.map((user, index) => {
    const { _id, name, email, phone, profile } = user;
    const img = profile.split("\\").pop();
    const ImgUrl = `http://localhost:8080/${img}`;
    return createData(index + 1, _id, name, email, phone, ImgUrl);
  });
const handleEditUser = (id)=>{
    navigate(`/admin/adminpanel/editUser/${id}`)
    console.log(`/admin/adminpanel/editUser/${id}`);
    
}

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
                    onClick={()=>handleEditUser(row._id)}
                    className="border py-2 px-4 font-semibold rounded-lg shadow-sm text-slate-100 bg-green-600"
                  >
                    Edit
                  </button>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <button
                    onClick={"/delete"}
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
