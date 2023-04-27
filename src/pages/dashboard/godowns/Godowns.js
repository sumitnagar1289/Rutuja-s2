import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Box from "@material-ui/core/Box";
import * as Yup from "yup";
import { Edit, Delete } from '@material-ui/icons';

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Grid,
  Typography,
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
export const initialValues = {
  id: "",
  location: "",
  managerId: "",
};

export const validationSchema = Yup.object().shape({
  location: Yup.string().required("Location is required"),
  id: Yup.number().required("ID is required").positive("ID must be positive"),
  managerId: Yup.number()
    .required("Manager ID is required")
    .positive("Manager ID must be positive"),
});
const useStyles = makeStyles((theme) => ({
  customTitle: {
    // // backgroundColor: "#4169e1", // Replace with desired color
    // color: "#ffffff", // Replace with desired text color

    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: '#000000',

    color: theme.palette.common.white,
    textAlign: "center",
  },
  successButton: {
    borderRadius: "8px",
    padding: "12px 24px",
    backgroundColor: "	#4169e1",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#e53935",
    },
    "&:hover": {
      backgroundColor: "#FFFFE0",
    },
  },
}));

function Godowns({   onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  // const [godownData, setGodownData] = useState({ location, managerId, capacity });
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [managerId, setmanagerId] = useState(" ");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/godowns")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    onDelete(id);
  };

  const handleEdit = () => {
    setEditing(true);
  };
  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleCapacityChange = (event) => {
    setCapacity(event.target.value);
  };
  const handlemanagerId = (event) => {
    setmanagerId(event.target.value);
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("location", location);
    formData.append("capacity", capacity);
    formData.append("managerId", managerId);
    formData.append("date", date);
    formData.append("image", image);

    axios
      .post("  http://localhost:5000/godowns", formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
    setId("");
    setLocation("");
   setCapacity("");
    setmanagerId("");
    setDate("");
    setImage(null);
    setOpen(false);
  };

  return (
    <div className="App">
      <Box display="flex" justifyContent="flex-end">
        <Button
          varient="outlined"
          className={classes.successButton}
          onClick={handleClickOpen}
        >
          Add Godowns
        </Button>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className={classes.customTitle}>
        GODOWN FORM
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formikProps) => (
              <Form>
                <TextField
                  autoFocus
                  margin="dense"
                  id="id"
                  label="id"
                  type="number"
                  fullWidth
                  value={id}
                  onChange={handleIdChange}
                  error={formikProps.touched.id && !!formikProps.errors.id}
                  helperText={formikProps.touched.id && formikProps.errors.id}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="location"
                  label="location"
                  type="text"
                  fullWidth
                  value={location}
                  onChange={handleLocationChange}
                />
                <TextField
                  margin="dense"
                  id=" capacity"
                  label="capacity"
                  type="float"
                  fullWidth
                  value={capacity}
                  onChange={handleCapacityChange}
                />
                <TextField
                  margin="dense"
                  id="managerId"
                  label="managerId"
                  type="number"
                  fullWidth
                  value={managerId}
                  onChange={handlemanagerId}
                  error={
                    formikProps.touched.managerId &&
                    !!formikProps.errors.managerId
                  }
                  helperText={
                    formikProps.touched.managerId &&
                    formikProps.errors.managerId
                  }
                />
                <TextField
                  margin="dense"
                  id="date"
                  label="Date"
                  type="date"
                  fullWidth
                  value={date}
                  onChange={handleDateChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <input type="file" onChange={handleImageChange} />
                <DialogActions
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button type="submit" color="primary" variant="contained">
                    Add Godown
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
      <Grid container spacing={6}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={user.location}
                  height="140"
                  image={user.image}
                  title={user.location}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {user.id}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {user.capacity}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {user.date}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {user.managerId}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {user.location}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
        {/* <IconButton aria-label="edit" onClick={handleEdit}>
          <Edit />
        </IconButton>
        <IconButton aria-label="delete" onClick={handleDelete}>
          <Delete /> */}
        {/* </IconButton> */}
      </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Godowns;
