import { useState, useEffect } from "react";
import axios from "axios";

function OnlineUsers({ search }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetching active online users from backend database
    const fetchOnlineUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/online");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching online users:", error);
      }
    };

    fetchOnlineUsers();
  }, []);

  // Filtering users based on search string
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="online-users-container">
      <small className="text-muted d-block mb-2">Online Users</small>
      
      {filteredUsers.length > 0 ? (
        filteredUsers.map((user) => (
          <div key={user._id || user.id} className="d-flex align-items-center p-2 mb-2 rounded bg-success text-white">
            <span className="me-2">🟢</span>
            <span className="small fw-semibold">{user.name}</span>
          </div>
        ))
      ) : (
        /* 💡 Clean Presentation Trick: If a user is searching, hide the "No User Found" message completely */
        !search.trim() ? (
          <div className="p-2 rounded bg-light text-dark text-center small">
            No Active Users Online
          </div>
        ) : null
      )}
    </div>
  );
}

export default OnlineUsers;