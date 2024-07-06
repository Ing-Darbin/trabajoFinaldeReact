// src\components\UserTable.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  IconButton,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import ColumnSelectorModal from "./ColumnSelectorModal";
import FilterModal from "./FilterModal";
import EditUserModal from "./EditUserModal";
import "./UserTable.css"; // Importa el archivo CSS

// Definición de la interfaz User para tipar los datos de usuario
interface User {
  login: { uuid: string };
  name: { first: string; last: string };
  email: string;
  location: { country: string };
  phone: string;
  dob: { age: number };
  picture: { thumbnail: string };
}

// Componente principal UserTable
const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [compactView, setCompactView] = useState(true);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [modals, setModals] = useState({
    filter: false,
    edit: false,
    column: false,
  });
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Función para obtener los usuarios desde la API
  const fetchUsers = () => {
    setLoading(true);
    axios
      .get("https://randomuser.me/api/?results=20")
      .then((response) => {
        setUsers(response.data.results);
        setFilteredUsers(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setError("No se pudo obtener la información solicitada.");
      });
  };

  // useEffect para cargar los usuarios al montar el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  // Función para manejar la edición de un usuario
  const handleEdit = (user: User) => {
    setCurrentUser(user);
    setModals((prev) => ({ ...prev, edit: true }));
  };

  // Función para guardar los cambios de un usuario editado
  const handleSave = (user: User) => {
    const newUsers = users.map((u) =>
      u.login.uuid === user.login.uuid ? user : u
    );
    setUsers(newUsers);
    setFilteredUsers(newUsers);
  };

  // Función para manejar la eliminación de un usuario con confirmación
  const handleDelete = (index: number) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const newUsers = [...users];
        newUsers.splice(index, 1);
        setUsers(newUsers);
        setFilteredUsers(newUsers);
        Swal.fire(
          '¡Eliminado!',
          'El usuario ha sido eliminado.',
          'success'
        );
      }
    });
  };

  // Función para manejar el cambio de columnas seleccionadas
  const handleColumnChange = (columns: string[]) => {
    setSelectedColumns(columns);
  };

  // Función para manejar el filtrado de usuarios
  const handleFilter = (filtered: User[]) => {
    setFilteredUsers(filtered);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
        <Button variant="contained" color="primary" onClick={fetchUsers}>
          Actualizar
        </Button>
      </div>
      <Table className="table-bordered">
        <TableHead>
          <TableRow className="header-row">
            <TableCell>Nombre</TableCell>
            <TableCell>Correo</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>País</TableCell>
            <TableCell>Perfil</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Borrar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((user, index) => (
            <TableRow key={user.login.uuid}>
              <TableCell>{`${user.name.first} ${user.name.last}`}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.location.country}</TableCell>
              <TableCell>
                <img
                  src={user.picture.thumbnail}
                  alt={`${user.name.first} ${user.name.last}`}
                  className="user-image"
                />
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(user)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleDelete(index)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {currentUser && (
        <EditUserModal
          open={modals.edit}
          onClose={() => setModals((prev) => ({ ...prev, edit: false }))}
          user={currentUser}
          onSave={handleSave}
        />
      )}
      <ColumnSelectorModal
        open={modals.column}
        onClose={() => setModals((prev) => ({ ...prev, column: false }))}
        selectedColumns={selectedColumns}
        onChange={handleColumnChange}
      />
      <FilterModal
        open={modals.filter}
        onClose={() => setModals((prev) => ({ ...prev, filter: false }))}
        onFilter={handleFilter}
      />
    </>
  );
};

export default UserTable;