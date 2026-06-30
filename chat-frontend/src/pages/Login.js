import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };  

  const handleLogin = (e) => {
    e.preventDefault();

    if (formData.email === "" || formData.password === "") {
      alert("Please fill all fields");
      return;
    }

    // Backend API next module
    alert("Login Successful");
    navigate("/home");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">

          <div className="card shadow-lg p-4">

            <h2 className="text-center mb-4">
              Real-Time Support Chat
            </h2>

            <form onSubmit={handleLogin}>

              <div className="mb-3">
                <label>Email</label>

                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>Password</label>

                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Login
              </button>

            </form>

            <hr />

            <p className="text-center">
              Don't have an account?
            </p>

            <Link
              to="/register"
              className="btn btn-success w-100"
            >
              Register
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;