import React from "react";
import { TableRow, TableCell, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface UserRowProps {
  user: any;
  index: number;
  compactView: boolean;
  onDelete: (index: number) => void;
  onEdit: (user: any) => void;
  selectedColumns: string[];
}

const UserRow: React.FC<UserRowProps> = ({
  user,
  index,
  compactView,
  onDelete,
  onEdit,
  selectedColumns,
}) => {
  return (
    <TableRow key={index}>
      <TableCell>
        <img src={user.picture.thumbnail} alt="User Thumbnail" />
      </TableCell>
      <TableCell>{`${user.name.first} ${user.name.last}`}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.location.country}</TableCell>
      {!compactView && <TableCell>{user.phone}</TableCell>}
      {!compactView && <TableCell>{user.dob.age}</TableCell>}
      {compactView && selectedColumns.includes("Edad") && (
        <TableCell>{user.dob.age}</TableCell>
      )}
      <TableCell>
        <IconButton onClick={() => onEdit(user)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(index)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
