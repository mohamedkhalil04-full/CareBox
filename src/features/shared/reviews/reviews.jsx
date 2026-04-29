import React, { useState, useEffect } from "react";
import api from "../../../api/axiosInstance";
import { timeAgo } from "../../../utils/timeAgo";
import "./reviews.css";
import LoadingStyle from "../../../utils/loadingStyle";
const Stars = ({ rating }) => {
  return (
    <div className="text-warning fs-5">
      {"★".repeat(Math.floor(rating))}
      {rating % 1 !== 0 && "½"}
      {"☆".repeat(5 - Math.floor(rating))}
    </div>
  );
};

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get("/Reviews/ProvidertReviews");

        let data = res.data;
        // التعامل مع wrapped response
        if (data && typeof data === "object" && !Array.isArray(data)) {
          data = data.data || data.reviews || data.result || [];
        }

        const safeReviews = Array.isArray(data) ? data : [];
        setReviews(safeReviews);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("an error occurs while fetching reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h2 className="fw-bold">Reviews</h2>
        <span className="text-muted">
          {reviews.length} reviews
        </span>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center py-5">
          <LoadingStyle/>
          <p className="mt-3">loading reviews...</p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-5 text-muted">
          <h5>No reviews yet</h5>
        </div>
      ) : (
        <div className="row g-4">
          {reviews.map((review, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div className="card h-100 review-card shadow-sm border-0">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h6 className="fw-bold mb-1">{review.clientName || "client"}</h6>
                      <small className="text-muted">
                        {timeAgo(review.createdAt)}
                      </small>
                    </div>
                    <Stars rating={review.rating || 0} />
                  </div>

                  <p className="text-muted mb-0 review-text">
                    "{review.comment || "no comment"}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;