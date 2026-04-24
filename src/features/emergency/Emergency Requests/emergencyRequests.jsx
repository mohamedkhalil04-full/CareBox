import React, { useState } from "react";
import "./emergencyRequests.css";

const EmergencyRequests = () => {
  // 1. State عشان نبدل بين الشاشات
  const [view, setView] = useState("list"); // list or details

  // 2. State عشان نتحكم في الخطوة الحالية في التايملاين (من 0 لـ 4)
  const [currentStep, setCurrentStep] = useState(0);

  const steps = ["Pending", "Accepted", "On the way", "Arrived", "Completed"];

  const requests = [
    {
      id: 1,
      title: "Battery Dead",
      car: "Hyundai Elantra 2010",
      location: "Obour City , Cairo",
      distance: "2.4 km away",
      desc: "Car won't start, clicking noise when turning the key.",
      time: "00:29",
    },
  ];

  // دالة تحديث الخطوة
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // شاشة الطلبات (اللي كانت معاك)
  const renderList = () => (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Incoming Requests :-</h2>
          <p className="mb-0 text-danger">
            Respond quickly to secure the job !
          </p>
        </div>
        <div className="fs-6 receiving-btn d-flex align-items-center px-3 py-2">
          <span className="dot me-2"></span> Receiving Requests
        </div>
      </div>

      {requests.map((item) => (
        <div
          key={item.id}
          className="card custom-border mb-4 shadow-sm border-0 position-relative"
        >
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="badge bg-warning text-dark">{item.title}</span>
              <div className="text-end m-2">
                <small className="text-muted me-2 fs-5 p-2">
                  <i className="fa-regular fa-clock me-1"></i>
                  {item.time}
                </small>
                <div
                  style={{
                    height: "4px",
                    width: "100px",
                    background: "orange",
                    borderRadius: "10px",
                  }}
                ></div>
              </div>
            </div>

            <h3 className="fw-bold fst-italic">
              <i className="fa-solid fa-car-on me-2" />
              {item.car}
            </h3>

            <div className="row mt-3">
              <div className="col-md-6">
                <h5>
                  <i className="fas fa-location-dot mx-2"></i>Location
                </h5>
                <p className="mx-4 text-muted">{item.location}</p>
                <div className="m-2 p-2">
                  <i className="fa-solid fa-location-arrow mx-1" />
                  <small className="text-primary">{item.distance}</small>
                </div>
              </div>
              <div className="col-md-6">
                <p className="mb-1 p-3 fw-semibold">
                  <i className="fa-solid fa-triangle-exclamation mx-2"></i>
                  Problem Description :-
                </p>
                <small className="text-muted">{item.desc}</small>
              </div>
            </div>

            <div className="d-flex gap-3 mt-4">
              {/* لما ندوس هنا بننقل للشاشة التانية وبنبدأ أول خطوة */}
              <button
                className="btn btn-primary flex-fill"
                onClick={() => {
                  setView("details");
                  setCurrentStep(1);
                }}
              >
                <i className="fa-solid fa-check me-2" /> Accept Request
              </button>
              <button className="btn btn-outline-secondary flex-fill">
                <i className="fa-solid fa-xmark me-2" /> Reject
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // شاشة التفاصيل (التايملاين)
  const renderDetails = () => (
    <div className="container py-5">
      <button
        className="btn btn-light bg-info fs-5 mb-4 fst-italic fw-bold"
        onClick={() => setView("list")}
      >
        <i className="fa-solid fa-left-long me-2" />
        Back to Requests
      </button>

      <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
        <h4 className="fw-bold mb-4">Request Progress</h4>

        {/* التايملاين البسيط */}
        <div className="d-flex justify-content-between position-relative mb-5">
          {/* الخط اللي ورا */}
          <div
            className="position-absolute top-50 start-0 end-0 translate-middle-y"
            style={{ height: "2px", background: "#e0e0e0", zIndex: 0 }}
          ></div>
          {/* الخط الأزرق اللي بيمشي */}
          <div
            className="position-absolute top-50 start-0 translate-middle-y"
            style={{
              height: "2px",
              background: "#0d6efd",
              zIndex: 0,
              width: `${(currentStep / (steps.length - 1)) * 100}%`,
              transition: "0.3s",
            }}
          ></div>

          {steps.map((s, index) => (
            <div
              key={index}
              className="text-center position-relative"
              style={{ zIndex: 1 }}
            >
              <div
                className={`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2`}
                style={{
                  width: "30px",
                  height: "30px",
                  background: index <= currentStep ? "#0d6efd" : "#fff",
                  border: `2px solid ${index <= currentStep ? "#0d6efd" : "#e0e0e0"}`,
                  color: index <= currentStep ? "#fff" : "#000",
                  fontSize: "12px",
                }}
              >
                {index < currentStep ? "✓" : index + 1}
              </div>
              <small
                className={`fw-bold ${index <= currentStep ? "text-primary" : "text-muted"}`}
              >
                {s}
              </small>
            </div>
          ))}
        </div>

        {currentStep < steps.length - 1 ? (
          <button
            className="btn btn-primary d-block mx-auto px-5"
            onClick={handleNextStep}
          >
            Update Status to: <strong>{steps[currentStep + 1]}</strong>
          </button>
        ) : (
          <div className="alert alert-success text-center fw-bold">
            Job Completed Successfully! ✅
          </div>
        )}
      </div>
      <div className="row g-4 mt-2">
        {/* الجزء الأيسر: الخريطة وتفاصيل الموقع (col-8) */}
        <div className="col-md-8">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            {/* منطقة الخريطة - تقدر تحط فيها مكتبة Google Maps لاحقاً */}
            <div
              className="map-placeholder bg-light position-relative"
              style={{ height: "350px" }}
            >
              {/* دي صورة تجريبية عشان تدي نفس شكل الخط المنقط في التصميم بتاعك */}
              <div className="d-flex align-items-center justify-content-center h-100">
                <i className="fa-solid fa-map-location-dot fa-3x text-muted opacity-25"></i>
                <p className="position-absolute bottom-0 start-0 m-3 fw-bold">
                  <i className="fa-solid fa-location-dot text-primary me-2"></i>
                  New Cairo, Cairo
                </p>
                <button className="btn btn-white shadow-sm position-absolute bottom-0 end-0 m-3 border rounded-pill px-3">
                  <i className="fa-solid fa-location-arrow me-2 text-primary"></i>
                  Start Navigation
                </button>
              </div>
            </div>

            {/* تفاصيل العميل تحت الخريطة */}
            <div className="card-body bg-white border-top">
              <div className="row text-center">
                <div className="col-6 border-end text-start">
                  <small className="text-muted d-block">Vehicle</small>
                  <span className="fw-bold">Hyundai Elantra 2010</span>
                </div>
                <div className="col-6 text-start ps-4">
                  <small className="text-muted d-block">Customer</small>
                  <span className="fw-bold">Ziyad Niazy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* الجزء الأيمن: الفني والملاحظات (col-4) */}
        <div className="col-md-4">
          {/* صندوق تعيين الفني */}
          <div className="card border-0 shadow-sm rounded-4 p-3 mb-4">
            <h6 className="fw-bold mb-3">
              <i className="fa-solid fa-user-gear me-2 text-primary"></i>
              Assigned Technician
            </h6>
            <select className="form-select mb-3 border-light bg-light">
              <option>Select a technician...</option>
              <option>Mohamed Ahmed</option>
              <option>Ahmed Yasser</option>
            </select>
            <button className="btn btn-primary w-100 rounded-3 py-2">
              Assign
            </button>
          </div>

          {/* صندوق ملاحظات الخدمة */}
          <div className="card border-0 shadow-sm rounded-4 p-3">
            <h6 className="fw-bold mb-3">Service Handling</h6>
            <label className="small text-muted mb-2">Internal Notes</label>
            <textarea
              className="form-control border-light bg-light rounded-3"
              rows="4"
              placeholder="Add internal notes about the service..."
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );

  return view === "list" ? renderList() : renderDetails();
};

export default EmergencyRequests;
