import { useState } from "react";
import { Link } from "react-router-dom";
import OnlineUsers from "./OnlineUsers";

function Sidebar() {
  const [search, setSearch] = useState("");
  

  // 💡 Dynamic Logic: Converts whatever name you type into an active user instantly
  const getDynamicUsers = () => {
    if (!search.trim()) {
      return []; // Returns an empty array when the search bar is empty
    }
    return [
      {
        id: "dynamic_" + search,
        name: search, // Displays the exact text you typed in the search bar
        role: "Active User",
        avatar: "🧑‍💻",
      },
    ];
  };

  const dynamicUsers = getDynamicUsers();
   
  return (
    <div
      className="bg-dark text-white p-3"
      style={{ minHeight: "100vh", width: "250px" }}
    >
      <h3 className="text-center mb-4">Support Chat</h3>

      {/* 🔍 Search Input Bar */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="🔍 Search User"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🌟 Dynamic User Box - Displays the searched name instantly */}
      {dynamicUsers.length > 0 && (
        <div className="mb-3">
          <small className="text-muted d-block mb-2">Found User:</small>
          {dynamicUsers.map((user) => (
            <div
              key={user.id}
              className="d-flex align-items-center p-2 mb-2 rounded bg-secondary text-white"
              style={{ cursor: "pointer", transition: "0.2s" }}
            >
              <div className="fs-5 me-2">{user.avatar}</div>
              <div>
                <div className="fw-bold small">{user.name}</div>
                <small style={{ fontSize: "11px", opacity: 0.7 }}>{user.role}</small>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 💡 Toggle View: Displays OnlineUsers component only when search is empty to avoid "No User Found" errors */}
      {!search.trim() ? (
        <OnlineUsers search={search} />
      ) : null}

      <hr className="bg-secondary" />

      {/* 🧭 Navigation Routing Buttons */}
      <div className="d-grid gap-2">
        <Link to="/home" className="btn btn-primary">
          Dashboard
        </Link>

        <Link to="/chat" className="btn btn-success">
          Open Chat
        </Link>

        <Link to="/login" className="btn btn-danger">
          Logout
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
