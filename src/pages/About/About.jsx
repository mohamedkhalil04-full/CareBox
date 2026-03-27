// import React, { useState, useEffect } from "react";
// import api from "../../api/axiosInstance";
// import "./About.css";
// import { Button, Form, Spinner, Alert } from "react-bootstrap";

// const BASE_URL = "https://careboxapi.runasp.net";

// const About = () => {
//   const [aboutData, setAboutData] = useState({
//     description: "",
//     images: [],
//   });

//   const [newDescription, setNewDescription] = useState("");
//   const [newImages, setNewImages] = useState([]);
//   const [previewImages, setPreviewImages] = useState([]);
//   const [imagesToDelete, setImagesToDelete] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });

//   // جلب البيانات
//   useEffect(() => {
//     const fetchAbout = async () => {
//       try {
//         const res = await api.get("/ProviderProfile/About");
//         const responseData = res.data || {};
//         const data = responseData.data || responseData;

//         setAboutData({
//           description: data.description || "",
//           images: Array.isArray(data.images) ? data.images : [],
//         });

//         setNewDescription(data.description || "");
//       } catch (err) {
//         console.error(err);
//         setMessage({ type: "danger", text: "Failed to load About data" });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAbout();
//   }, []);

//   const handleNewImages = (e) => {
//     const files = Array.from(e.target.files);
//     setNewImages(files);
//     const previews = files.map((file) => URL.createObjectURL(file));
//     setPreviewImages(previews);
//   };

//   const handleDeleteImage = (id) => {
//     setImagesToDelete((prev) => [...prev, id]);
//     setAboutData((prev) => ({
//       ...prev,
//       images: prev.images.filter((img) => img.id !== id),
//     }));
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     setMessage({ type: "", text: "" });

//     const formData = new FormData();
//     formData.append("Description", newDescription || "");

//     newImages.forEach((file) => formData.append("NewImages", file));

//     if (imagesToDelete.length > 0) {
//       formData.append("ImagesToDeleteIds", imagesToDelete.join(","));
//     }

//     try {
//       await api.put("/ProviderProfile/About", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const res = await api.get("/ProviderProfile/About");
//       const responseData = res.data || {};
//       const data = responseData.data || responseData;

//       setAboutData({
//         description: data.description || "",
//         images: Array.isArray(data.images) ? data.images : [],
//       });

//       setNewDescription(data.description || "");
//       setNewImages([]);
//       setPreviewImages([]);
//       setImagesToDelete([]);

//       setMessage({ type: "success", text: "About Us updated successfully!" });
//     } catch (err) {
//       console.error(err);
//       setMessage({ type: "danger", text: "Failed to update About Us" });
//     } finally {
//       setSaving(false);
//     }
//   };

//   // دالة لبناء رابط الصورة بأمان
//   const getImageUrl = (img) => {
//     const url = img.imageUrl1 || img.imageUrl || img.url || img.image || "";
//     if (!url) return null;
//     return `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-5">
//         <Spinner animation="border" variant="danger" />
//         <p className="mt-3">Loading About Us...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
//       <h2 className="mb-4 fw-bold text-dark">About Us</h2>

//       {message.text && (
//         <Alert variant={message.type} className="mb-4" dismissible onClose={() => setMessage({ type: "", text: "" })}>
//           {message.text}
//         </Alert>
//       )}

//       {/* Current About Content - تصميم بسيط وأنيق */}
//       <div className="card shadow-sm mb-5">
//         <div className="card-body p-5">
//           <h5 className="fw-bold mb-4">Our Story</h5>
//           <p className="lead text-muted" style={{ lineHeight: "1.9", fontSize: "1.1rem" }}>
//             {aboutData.description || "No description added yet."}
//           </p>

//           {/* Simple Gallery - max 3 صور في صف */}
//           {aboutData.images.length > 0 && (
//             <div className="row g-4 mt-5">
//               {aboutData.images.slice(0, 3).map((img, index) => {  // max 3 صور
//                 const imageUrl = getImageUrl(img);
//                 return (
//                   <div key={img.id || index} className="col-md-4">
//                     <div className="position-relative rounded overflow-hidden shadow-sm">
//                       <img
//                         src={imageUrl || "https://via.placeholder.com/400x300?text=No+Image"}
//                         alt="About"
//                         className="img-fluid w-100"
//                         style={{ height: "260px", objectFit: "cover" }}
//                         onError={(e) => {
//                           e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
//                         }}
//                       />
//                       <button
//                         className="btn btn-danger position-absolute top-2 end-2"
//                         style={{ width: "32px", height: "32px", padding: "0" }}
//                         onClick={() => handleDeleteImage(img.id)}
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Edit Form */}
//       <div className="card shadow-sm">
//         <div className="card-body p-5">
//           <h5 className="fw-bold mb-4">Edit About Us</h5>

//           <Form.Group className="mb-4">
//             <Form.Label>Description</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={7}
//               value={newDescription}
//               onChange={(e) => setNewDescription(e.target.value)}
//               placeholder="Write a nice description about your workshop..."
//             />
//           </Form.Group>

//           <Form.Group className="mb-4">
//             <Form.Label>Upload New Images (You can upload multiple)</Form.Label>
//             <Form.Control type="file" multiple accept="image/*" onChange={handleNewImages} />
//           </Form.Group>

//           {previewImages.length > 0 && (
//             <div className="mb-4">
//               <p className="mb-2">New Images Preview:</p>
//               <div className="d-flex flex-wrap gap-3">
//                 {previewImages.map((src, index) => (
//                   <img
//                     key={index}
//                     src={src}
//                     alt="preview"
//                     className="rounded shadow-sm"
//                     style={{ width: "140px", height: "140px", objectFit: "cover" }}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="d-flex justify-content-end">
//             <Button variant="danger" size="lg" onClick={handleSave} disabled={saving}>
//               {saving ? "Saving..." : "Save Changes"}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;



///////////////////////////////////////////////////////////////////




import React, { useState, useEffect } from "react";
import api from "../../api/axiosInstance";
import "./About.css";
import { Button, Form, Spinner, Alert } from "react-bootstrap";

const BASE_URL = "https://careboxapi.runasp.net";

const About = () => {
  const [aboutData, setAboutData] = useState({
    description: "",
    images: [],
  });

  const [newDescription, setNewDescription] = useState("");
  const [newImages, setNewImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isEditing, setIsEditing] = useState(false);   // ← للتحكم في ظهور الفورم

  // جلب البيانات
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await api.get("/ProviderProfile/About");
        const data = res.data?.data || res.data || {};

        setAboutData({
          description: data.description || "",
          images: Array.isArray(data.images) ? data.images : [],
        });
        setNewDescription(data.description || "");
      } catch (err) {
        console.error(err);
        setMessage({ type: "danger", text: "Failed to load About data" });
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  const handleNewImages = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);
    setPreviewImages(files.map(file => URL.createObjectURL(file)));
  };

//   const handleDeleteImage = (id) => {
//     setImagesToDelete(prev => [...prev, id]);
//     setAboutData(prev => ({
//       ...prev,
//       images: prev.images.filter(img => img.id !== id)
//     }));
//   };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: "", text: "" });

    const formData = new FormData();
    formData.append("Description", newDescription || "");

    newImages.forEach(file => formData.append("NewImages", file));

    if (imagesToDelete.length > 0) {
      formData.append("ImagesToDeleteIds", imagesToDelete.join(","));
    }

    try {
      await api.put("/ProviderProfile/About", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const res = await api.get("/ProviderProfile/About");
      const data = res.data?.data || res.data || {};

      setAboutData({
        description: data.description || "",
        images: Array.isArray(data.images) ? data.images : [],
      });

      setNewDescription(data.description || "");
      setNewImages([]);
      setPreviewImages([]);
      setImagesToDelete([]);
      setIsEditing(false);

      setMessage({ type: "success", text: "About Us updated successfully!" });
    } catch (err) {
      console.error(err);
      setMessage({ type: "danger", text: "Failed to update About Us" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-5"><Spinner animation="border" variant="danger" /></div>;
  }

  return (
    <div className="p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <h2 className="mb-4 fw-bold text-dark">About Us</h2>

      {message.text && (
        <Alert variant={message.type} className="mb-4" dismissible onClose={() => setMessage({ type: "", text: "" })}>
          {message.text}
        </Alert>
      )}

      {/* Main Content: وصف على الشمال + صورة على اليمين */}
      <div className="card shadow-sm mb-5">
        <div className="card-body p-5">
          <div className="row align-items-center">
            {/* الوصف - الشمال */}
            <div className="col-lg-7">
              <p className="lead text-muted" style={{ lineHeight: "1.9", fontSize: "1.15rem" }}>
                {aboutData.description || "No description added yet."}
              </p>
            </div>

            {/* مكان الصورة - اليمين */}
            <div className="col-lg-5 text-center">
              {aboutData.images.length > 0 ? (
                <img
                  src={`${BASE_URL}${aboutData.images[0].imageUrl1}`}
                  alt="About Us"
                  className="img-fluid rounded shadow"
                  style={{ maxHeight: "380px", objectFit: "cover", width: "100%" }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <div 
                  className="bg-light d-flex align-items-center justify-content-center rounded shadow"
                  style={{ height: "380px", border: "2px dashed #ddd" }}
                >
                  <p className="text-muted mb-0">No image available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* زرار Edit */}
      {!isEditing && (
        <div className="text-center mb-4">
          <Button 
            variant="outline-danger" 
            size="lg" 
            onClick={() => setIsEditing(true)}
          >
         Edit
          </Button>
        </div>
      )}

      {/* Form التعديل - يظهر فقط لما تضغط Edit */}
      {isEditing && (
        <div className="card shadow-sm">
          <div className="card-body p-5">
            <h5 className="fw-bold mb-4">Edit About Us</h5>

            <Form.Group className="mb-4">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={7}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Upload New Images</Form.Label>
              <Form.Control type="file" multiple accept="image/*" onChange={handleNewImages} />
            </Form.Group>

            {previewImages.length > 0 && (
              <div className="mb-4">
                <p>New Images Preview:</p>
                <div className="d-flex flex-wrap gap-3">
                  {previewImages.map((src, i) => (
                    <img key={i} src={src} alt="preview" style={{ width: "140px", height: "140px", objectFit: "cover" }} className="rounded" />
                  ))}
                </div>
              </div>
            )}

            <div className="d-flex gap-3 justify-content-end">
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;