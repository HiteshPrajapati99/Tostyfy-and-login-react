import { useState } from "react";
import { Form, Button, NavLink } from "react-bootstrap";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Loginpage() {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const { values, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues,

    onSubmit: (values) => {
      // console.log(values);
      let url = "http://localhost:4000/login";
      axios.post(url, values).then(function (res) {
        if (res.data.success) {
          // set token in local storege

          localStorage.setItem("x-access-token", res.data.token);
          // console.log(res.data.tokan);

          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            navigate("/");
          }, 1700);
        } else {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
    },
  });

  const [show, setShow] = useState(false);

  const showpassword = () => {
    setShow(!show);
  };
  return (
    <div className="container mt-3">
      <div className="row" style={{ marginTop: "10rem" }}>
        <div className="col-md-5">
          <h2 className="text-center">Sign Up</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="mt-3">Email </Form.Label>
              <input
                type="email"
                placeholder="Enter your  Email"
                className="form-control"
                name="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="mt-3">Password</Form.Label>

              <input
                className="form-control"
                type={show ? "text" : "password"}
                placeholder="Password"
                name="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <Form.Group className="mt-1" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Click Here to view Password"
                  onClick={showpassword}
                />
              </Form.Group>
            </Form.Group>
            <div className="notify">
              <Button
                className="mt-4"
                size="lg"
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
              <ToastContainer
                theme="colored"
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </div>
          </Form>
          <div className="register" style={{ float: "right" }}>
            <span>
              <p> Don't have an account? </p>
              <NavLink
                style={{ color: "rebeccapurple" }}
                onClick={() => navigate("/register")}
              >
                Register Here
              </NavLink>
            </span>
          </div>
        </div>
        <div className="col-md-7 my-auto">
          <img className="img-fluid w-100" src="./assets/rocket.png" alt="" />
        </div>
      </div>
    </div>
  );
}
