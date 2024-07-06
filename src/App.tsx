// src\App.tsx
import React from 'react';
import { Container, Grid } from '@mui/material';
import UserTable from './components/UserTable';
import './App.css'; // Asegúrate de importar el archivo CSS

const App: React.FC = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1 className="green-title">Consumir Una Api en React Utilizando Axios.</h1>
        </Grid>
        <Grid item xs={12}>
          <UserTable />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
