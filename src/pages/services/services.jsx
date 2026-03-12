import './services.css'

const Services=()=>{
    

    return(
        <>
        <h1>Services</h1>
        </>
    )
}

export default Services


// import React, { useState, useEffect } from "react";
// import api from "../../api/axiosInstance"; 
// import "./services.css";

// const Services = () => {
//   const [services, setServices] = useState([]);
//   const [formData, setFormData] = useState({
//     serviceName: "",
//     price: "",
//     description: "",
//   });
//   const [editingId, setEditingId] = useState(null);

//   // 1. جلب الخدمات
//   const fetchServices = async () => {
//     try {
//       const response = await api.get("/Services/my-list");
//       setServices(response.data || []); 
//     } catch (error) {
//       console.error("Error fetching services:", error);
//     }
//   };

//   useEffect(() => {
//     // fetchServices();
//   }, []);

//   // التعامل مع تغييرات الـ inputs
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // 2. إضافة أو تعديل خدمة
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // تحضير الداتا بالشكل اللي الباك اند طالبه بالظبط (تحويل السعر لرقم)
//     const payload = {
//       serviceName: formData.serviceName,
//       price: Number(formData.price),
//       description: formData.description
//     };

//     try {
//       if (editingId) {
//         // حالة التعديل
//         await api.put(`/Services/update/${editingId}`, payload);
//       } else {
//         // حالة الإضافة
//         await api.post("/Services/create", payload);
//       }

//       // إعادة تهيئة الفورم وتحديث القائمة
//       setFormData({ serviceName: "", price: "", description: "" });
//       setEditingId(null);
//       fetchServices();
      
//     } catch (error) {
//       console.error("Error saving service:", error);
//       // هنا ممكن تضيف Toast Notification لعرض الخطأ للمستخدم
//     }
//   };

//   // 3. تجهيز الفورم للتعديل
//   const handleEditClick = (service) => {
//     setEditingId(service.id); 
//     setFormData({
//       serviceName: service.serviceName || service.name, // تجنباً لأي اختلاف في المسمى الراجع
//       price: service.price,
//       description: service.description,
//     });
//   };

//   // إلغاء التعديل
//   const handleCancelEdit = () => {
//     setEditingId(null);
//     setFormData({ serviceName: "", price: "", description: "" });
//   };

//   // 4. حذف خدمة
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this service?")) return;

//     try {
//       await api.delete(`/Services/remove/${id}`);
//       fetchServices();
//     } catch (error) {
//       console.error("Error deleting service:", error);
//     }
//   };

//   return (
//     <div className="p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
//       <h2 className="mb-4 fw-bold text-dark">Services</h2>
      
//       <div className="row g-4">
//         {/* === القسم الأيسر: قائمة الخدمات === */}
//         <div className="col-lg-7 col-md-12">
//           <div className="bg-white rounded-3 shadow-sm p-4 h-100" style={{ border: "1px solid #eaeaea" }}>
//             <h5 className="mb-4 fw-bold">Existing Services</h5>
            
//             <div className="d-flex flex-column gap-3">
//               {services.length === 0 ? (
//                 <p className="text-muted">No services available. Add one!</p>
//               ) : (
//                 services.map((service) => (
//                   <div key={service.id} className="p-3 border rounded-3 position-relative">
//                     <div className="d-flex justify-content-between align-items-center mb-2">
//                       <h6 className="m-0 fw-bold">{service.serviceName || service.name}</h6>
//                       <span className="fw-bold" style={{ color: "#ff4d4f" }}>
//                         ${Number(service.price).toFixed(2)}
//                       </span>
//                     </div>
//                     <p className="text-muted small mb-3">{service.description}</p>
                    
//                     <div className="d-flex gap-3 border-top pt-2 mt-2">
//                       <button 
//                         onClick={() => handleEditClick(service)}
//                         className="btn btn-sm btn-link text-secondary text-decoration-none p-0 d-flex align-items-center gap-1"
//                       >
//                         <i className="bi bi-pencil"></i> Edit
//                       </button>
//                       <button 
//                         onClick={() => handleDelete(service.id)}
//                         className="btn btn-sm btn-link text-secondary text-decoration-none p-0 d-flex align-items-center gap-1"
//                       >
//                         <i className="bi bi-trash"></i> Delete
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>

//         {/* === القسم الأيمن: فورم الإضافة / التعديل === */}
//         <div className="col-lg-5 col-md-12">
//           <div className="bg-white rounded-3 shadow-sm p-4 sticky-top" style={{ top: "20px", border: "1px solid #eaeaea" }}>
//             <h5 className="mb-4 fw-bold">
//               {editingId ? "Update Service" : "Add New Service"}
//             </h5>
            
//             <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
//               <div>
//                 <label className="form-label small text-muted mb-1">Service Name</label>
//                 <input 
//                   type="text" 
//                   name="serviceName" // تم التعديل هنا
//                   value={formData.serviceName}
//                   onChange={handleChange}
//                   className="form-control" 
//                   placeholder="e.g. Transmission Flush" 
//                   required 
//                 />
//               </div>
              
//               <div>
//                 <label className="form-label small text-muted mb-1">Price</label>
//                 <input 
//                   type="number" 
//                   name="price"
//                   value={formData.price}
//                   onChange={handleChange}
//                   className="form-control" 
//                   placeholder="0.00" 
//                   step="0.01"
//                   min="0"
//                   required 
//                 />
//               </div>
              
//               <div>
//                 <label className="form-label small text-muted mb-1">Description</label>
//                 <textarea 
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   className="form-control" 
//                   placeholder="Describe what the service includes..."
//                   rows="4"
//                   required
//                 ></textarea>
//               </div>
              
//               <div className="d-flex gap-2 mt-2">
//                 <button 
//                   type="submit" 
//                   className="btn text-white w-100 py-2 fw-semibold" 
//                   style={{ backgroundColor: "#ff4d4f", border: "none" }}
//                 >
//                   {editingId ? "Save Changes" : "Add Service"}
//                 </button>
                
//                 {editingId && (
//                   <button 
//                     type="button" 
//                     onClick={handleCancelEdit}
//                     className="btn btn-light py-2 fw-semibold border"
//                   >
//                     Cancel
//                   </button>
//                 )}
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Services;




