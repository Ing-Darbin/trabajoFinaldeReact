import React, { useState, useEffect } from "react";
import { Modal, TextField, Button, CircularProgress } from "@mui/material";
import { Formik, Form, Field } from "formik";
import Swal from "sweetalert2";

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  user: unknown;
  onSave: (user: unknown) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  open,
  onClose,
  user,
  onSave,
}) => {
  const [initialValues, setInitialValues] = useState<unknown>(null); // Initialize as null
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [loadingData, setLoadingData] = useState(false); // Loading data state

  useEffect(() => {
    setLoadingData(true); // Activate loading data state

    // Simulate data loading from an API (example: setTimeout)
    const fetchData = async () => {
      try {
        // Here you should implement your logic to fetch data from an API
        // Simulate data loading with setTimeout
        setTimeout(() => {
          setInitialValues(user);
          setLoadingData(false); // Deactivate loading data state after fetching data
        }, 2000); // Simulate a 2-second loading (adjust according to your logic)
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoadingData(false); // Make sure to deactivate loading data state in case of error
      }
    };

    fetchData();
  }, [user]); // Dependency on user to reload data when user changes

  const handleSave = async (values: any) => {
    setFormSubmitting(true); // Indicate that form is being submitted

    // Show SweetAlert to confirm the action
    const result = await Swal.fire({
      title: "Are you sure you want to save the changes?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, save",
      cancelButtonText: "No, cancel",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return onSave(values);
      },
    });

    setFormSubmitting(false); // Finish form submission

    // Process SweetAlert result after onSave
    if (result.isConfirmed) {
      onClose(); // Close MUI modal after confirmation
      Swal.fire({
        title: "Saved",
        text: "The changes have been saved.",
        icon: "success",
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  // If loading data, show a loading indicator
  if (loadingData) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
          zIndex: 9999,
        }}
      >
        <CircularProgress color="inherit" />
      </div>
    );
  }

  // When data has been loaded, show the user editing modal
  return (
    <Modal open={open && !formSubmitting} onClose={onClose}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "20px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          maxWidth: "80vw",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={handleSave}
        >
          {({ values, dirty }) => (
            <Form>
              <Field
                as={TextField}
                name="name.first"
                label="First Name"
                fullWidth
                margin="normal"
                required
              />
              <Field
                as={TextField}
                name="name.last"
                label="Last Name"
                fullWidth
                margin="normal"
                required
              />
              <Field
                as={TextField}
                name="email"
                label="Email"
                fullWidth
                margin="normal"
                required
                type="email"
              />
              <Field
                as={TextField}
                name="location.country"
                label="Country"
                fullWidth
                margin="normal"
                required
              />
              <Field
                as={TextField}
                name="phone"
                label="Phone"
                fullWidth
                margin="normal"
                required
              />
              <Field
                as={TextField}
                name="dob.age"
                label="Age"
                fullWidth
                margin="normal"
                required
              />
              <div style={{ marginTop: "16px", textAlign: "right" }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!dirty || formSubmitting}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginLeft: "8px" }}
                  onClick={onClose}
                  disabled={formSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default EditUserModal;
