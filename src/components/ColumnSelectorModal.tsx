import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControlLabel, Checkbox } from '@mui/material';

interface ColumnSelectorModalProps {
  open: boolean;
  onClose: () => void;
  selectedColumns: string[];
  onChange: (column: string) => void;
}

const ColumnSelectorModal: React.FC<ColumnSelectorModalProps> = ({ open, onClose, selectedColumns, onChange }) => {
  const columns = ['Teléfono', 'Edad'];

  const handleCheckboxChange = (column: string) => {
    onChange(column);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Seleccionar Columnas</DialogTitle>
      <DialogContent>
        {columns.map(column => (
          <FormControlLabel
            key={column}
            control={
              <Checkbox
                checked={selectedColumns.includes(column)}
                onChange={() => handleCheckboxChange(column)}
              />
            }
            label={column}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ColumnSelectorModal;
