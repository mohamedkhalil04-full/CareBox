import "./profile.css";

const Profile = () => {
  return (
   

    <div className="container my-5">
      <div className="card-header my-5 mx-5 ">
          <h2 className="mb-0 fw-bolder">Workshop Profile</h2>
        </div>
      <div className="card shadow">
        

        <div className="card-body">
          <h5 className="mb-4 border-bottom pb-2">General Information</h5>

          {/* Logo */}
          <div className="mb-4">
            <label className="form-label">Workshop Logo</label>
            <div className="d-flex align-items-center gap-3">
              <div 
                className="rounded-circle bg-light d-flex align-items-center justify-content-center text-muted"
                style={{ width: '100px', height: '100px' }}
              >
                Logo
              </div>
              <button type="button" className="btn btn-outline-secondary">
                Upload New Logo
              </button>
            </div>
          </div>

          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Workshop Name</label>
            <input 
              type="text" 
              className="form-control" 
              defaultValue="AutoFix Workshop"
            />
          </div>

          {/* Address */}
          <div className="mb-3">
            <label className="form-label">Address</label>
            <div className="input-group">
              <input 
                type="text" 
                className="form-control" 
                defaultValue="Third district, Obour city, Cairo"
              />
              <button className="btn btn-outline-secondary mx-5 rounded-4 fa-location-dot" type="button">
                Use Current Location
              </button>
            </div>
          </div>

          {/* Phone + Email */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Phone Number</label>
              <input 
                type="tel" 
                className="form-control" 
                defaultValue="+20 111 222 333"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                className="form-control" 
                defaultValue="contact@autofixworkshop.com"
              />
            </div>
          </div>

          {/* Working Hours */}
          <div className="mb-4">
            <label className="form-label">Working Hours</label>
            <textarea 
              className="form-control" 
              rows="3"
              defaultValue="Mon-Fri: 8:00 AM - 6:00 PM, Sat: 9:00 AM - 2:00 PM"
            ></textarea>
          </div>

          {/* زر الحفظ */}
          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-danger px-5">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>


  );
};

export default Profile;