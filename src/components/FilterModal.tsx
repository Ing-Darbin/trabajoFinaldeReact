import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Definición de la interfaz para los filtros
interface Filters {
  country: string;
  email: string;
  name: string;
}

// Definición de la interfaz para las propiedades del componente FilterModal
interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onFilter: (filters: Filters) => void;
}

// Esquema de validación para el formulario usando Yup
const validationSchema = Yup.object({
  country: Yup.string().required('País es requerido'),
  email: Yup.string().email('Correo inválido').required('Correo es requerido'),
  name: Yup.string().required('Nombre es requerido'),
});

// Componente FilterModal
const FilterModal: React.FC<FilterModalProps> = ({ open, onClose, onFilter }) => {
  return (
    // Diálogo de Material-UI
    <Dialog open={open} onClose={onClose} aria-labelledby="filter-dialog-title">
      <DialogTitle id="filter-dialog-title">Filtrar Usuarios</DialogTitle>
      <DialogContent>
        {/* Formulario manejado por Formik */}
        <Formik
          initialValues={{ country: '', email: '', name: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onFilter(values);
            onClose();
          }}
        >
          {() => (
            <Form>
              {/* Campo para el país */}
              <Field name="country" as={TextField} label="País" fullWidth margin="dense" />
              <ErrorMessage name="country" component="div" />

              {/* Campo para el correo */}
              <Field name="email" as={TextField} label="Correo" fullWidth margin="dense" />
              <ErrorMessage name="email" component="div" />

              {/* Campo para el nombre */}
              <Field name="name" as={TextField} label="Nombre" fullWidth margin="dense" />
              <ErrorMessage name="name" component="div" />

              {/* Acciones del diálogo */}
              <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button type="submit">Aplicar</Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;