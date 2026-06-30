import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2 className="text-center mb-4">
          Real-Time Support Chat Dashboard
        </h2>

        <div className="row">
          <div className="col-md-3 mb-3">
            <div className="card shadow text-center">
              <div className="card-body">
                <h5>Total Users</h5>
                <h2>120</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow text-center">
              <div className="card-body">
                <h5>Online Users</h5>
                <h2>45</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow text-center">
              <div className="card-body">
                <h5>Open Tickets</h5>
                <h2>18</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow text-center">
              <div className="card-body">
                <h5>Resolved</h5>
                <h2>102</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow mt-4">
          <div className="card-body">
            <h4>Quick Actions</h4>

            <Link to="/chat" className="btn btn-primary me-2">
              Open Chat
            </Link>

            <Link to="/login" className="btn btn-danger">
              Logout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;