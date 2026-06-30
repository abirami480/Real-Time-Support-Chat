import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // போன் நம்பருக்கான ஸ்டேட்
  const [image, setImage] = useState(null); 

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      setUser(userData);
      setName(userData.name || "");
      setEmail(userData.email || "");
      setPhone(userData.phone || ""); // லோக்கல் ஸ்டோரேஜ்ல இருந்து போன் நம்பர் எடுத்தல்
      setImage(userData.profilePic || null); 
    }
  }, []);

  // இமேஜை ப்ரௌசர்ல தற்காலிகமா பார்க்க மாற்றுவது
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // இது இமேஜை base64 ஸ்ட்ரிங்காக மாற்றும்
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const updatedUser = { 
      ...user, 
      name: name, 
      email: email, 
      phone: phone, // போன் நம்பர் சேவ் ஆகுது
      profilePic: image,
      lastUpdated: new Date().toLocaleString()
    };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsEditing(false);
    alert("Profile changes updated successfully in local session!");
  };

  return (
    <div className="d-flex align-items-center justify-content-center bg-light" style={{ minHeight: "100vh" }}>
      <div className="container" style={{ maxWidth: "550px" }}>
        
        <div className="mb-3">
          <Link to="/chat" className="btn btn-sm btn-outline-secondary">← Back to Chat</Link>
        </div>

        <div className="card shadow-lg border-0 rounded-4 p-4 bg-white">
          <div className="text-center">
            
            {/* இமேஜ் டிஸ்ப்ளே செக்ஷன் */}
            <div className="mb-3 position-relative d-inline-block">
              {image ? (
                <img src={image} alt="Profile" className="rounded-circle shadow border" style={{ width: "130px", height: "130px", objectFit: "cover" }} />
              ) : (
                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center shadow" style={{ width: "130px", height: "130px", fontSize: "3.5rem", fontWeight: "bold" }}>
                  {name ? name.charAt(0).toUpperCase() : "U"}
                </div>
              )}
            </div>
            
            {isEditing && (
              <div className="mb-3">
                <label className="form-label small text-muted fw-bold">Upload Profile Photo</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="form-control form-control-sm" />
              </div>
            )}
            
            <h3 className="fw-bold mb-1">{name}</h3>
            <p className="text-muted small">Last Active/Updated: {user?.lastUpdated || "Just Now"}</p>
          </div>

          <div className="card-body px-0">
            {!isEditing ? (
              // VIEW MODE
              <div>
                <div className="mb-3 p-3 bg-light rounded border-start border-primary border-3">
                  <small className="text-muted d-block fw-bold">Email Address</small>
                  <span className="text-dark">{email}</span>
                </div>

                <div className="mb-4 p-3 bg-light rounded border-start border-success border-3">
                  <small className="text-muted d-block fw-bold">Phone Number & Call Link</small>
                  {phone ? (
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-dark">{phone}</span>
                      {/* HTML 'tel:' டேக் மூலமா கிளிக் பண்ணா உடனே கால் போகும் */}
                      <a href={`tel:${phone}`} className="btn btn-sm btn-success rounded-pill px-3">
                        📞 Call Now
                      </a>
                    </div>
                  ) : (
                    <span className="text-danger small">No phone number added yet. Click Edit to add.</span>
                  )}
                </div>

                <button onClick={() => setIsEditing(true)} className="btn btn-primary w-100 py-2 rounded-pill fw-bold">
                  ✍️ Edit Profile
                </button>
              </div>
            ) : (
              // EDIT MODE
              <div>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary">Full Name</label>
                  <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary">Email Address</label>
                  <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-bold text-secondary">Phone Number</label>
                  <input type="tel" className="form-control" placeholder="Enter mobile number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>

                <div className="d-flex gap-2">
                  <button onClick={handleSave} className="btn btn-success flex-grow-1 rounded-pill fw-bold">💾 Save Changes</button>
                  <button onClick={() => { setIsEditing(false); setImage(user?.profilePic || null); }} className="btn btn-outline-danger flex-grow-1 rounded-pill">Cancel</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;