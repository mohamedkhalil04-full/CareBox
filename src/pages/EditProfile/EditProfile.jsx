import "./EditProfile.css";
import ProjectLogo from "../../assets/images/proj-logo.png";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const EditProfile = () => {

// const navigate = useNavigate();
//   const stored = JSON.parse(localStorage.getItem("currentUser"));
//   const [username, setUsername] = useState(stored?.username || "");
//   const [email, setEmail] = useState(stored?.email || "");
//   const [image, setImage] = useState(stored?.image || null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [password, setPassword] = useState(""); // optional change password
//   const [confirm, setConfirm] = useState("");

//  useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, []);

  
//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem("isLoggedIn");
//     if (isLoggedIn !== "true") navigate("/login");
//   }, [navigate]);

//   const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   const validatePassword = (password) =>
//     password === "" || /^(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);

 
// const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (file.size > 2 * 1024 * 1024) {
//       alert("❌ Image size is larger than 2MB");
//       return;
//     }
//     const reader = new FileReader();
//     reader.onloadend = () => setImage(reader.result);
//     reader.readAsDataURL(file);
//   };


// const handleSave = (e) => {
//     e.preventDefault();

//     if (!username.trim() || !email.trim()) {
//       alert("❌ Please fill in the required fields");
//       return;
//     }
//     if (!validateEmail(email)) {
//       alert("❌ Invalid email address");
//       return;
//     }
//     if (!validatePassword(password)) {
//       alert(
//         "❌ New password must be at least 6 characters, contain an uppercase letter and a number"
//       );
//       return;
//     }
//     if (password && password !== confirm) {
//       alert("❌ Password confirmation does not match");
//       return;
//     }


//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     // ensure uniqueness except for current user
//     const other = users.find(
//       (u) =>
//         u.id !== stored.id &&
//         (u.email.toLowerCase() === email.toLowerCase() ||
//           u.username.toLowerCase() === username.toLowerCase())
//     );
//     if (other) {
//       alert("❌ Another user with the same name or email already exists");
//       return;
//     }


//     // update user inside users array
//     const updatedUsers = users.map((u) => {
//       if (u.id === stored.id) {
//         return {
//           ...u,
//           username,
//           email,
//           // only update password if provided
//           password: password ? password : u.password,
//           image: image || null,
//         };
//       }
//       return u;
//     });

//     localStorage.setItem("users", JSON.stringify(updatedUsers));

//     const updatedCurrent = updatedUsers.find((u) => u.id === stored.id);
//     localStorage.setItem("currentUser", JSON.stringify(updatedCurrent));

//     alert("✅ Changes saved successfully");
//     navigate("/profile");
//   };


  return (
    <div id="back-page">
      <img src={ProjectLogo} className="p-3" alt="logo" width={100} />
      
      <div className="container my-5 d-flex justify-content-center">
      <div
        className="card profile-card shadow-lg border-0"
        style={{ maxWidth: 680, width: "100%" }}
      >
        <div className="card-body p-4">
          <h4 className="mb-3">Edit Profile</h4>
          <form >   {/* onSubmit={handleSave} */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                className="form-control"
                // value={username}
                // onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Change Password (optional)
              </label>
              <input
                // type={showPassword ? "text" : "password"}
                className="form-control mb-2"
                placeholder="New password (leave empty to keep current)"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
              />
              <input
                // type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Confirm new password"
                value={confirm}
                // onChange={(e) => setConfirm(e.target.value)}
              />
              <div className="form-check mt-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="showPwdEdit"
                  // checked={showPassword}
                  // onChange={() => setShowPassword((s) => !s)}
                />
                <label className="form-check-label" htmlFor="showPwdEdit">
                  Show Password
                </label>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                // onChange={handleImageUpload}
              />
              <small className="text-muted">
                Optional - suggested size less than 2MB
              </small>
              {/* {image && (
                <div className="mt-3">
                  <img
                    src={image}
                    alt="preview"
                    style={{
                      width: 120,
                      height: 120,
                      objectFit: "cover",
                      borderRadius: 999,
                    }}
                  />
                </div>
              )} */}
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-success w-50">
                Save Changes
              </button>
              <button
                type="button"
                // onClick={() => navigate("/profile")}
                className="btn btn-outline-secondary w-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default EditProfile;


  
    



