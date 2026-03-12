import "./reviews.css";
const Stars = ({ rating }) => {
  return (
    <div className="text-warning">
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </div>
  );
};
const reviews = [
  {
    name: "Ahmed Mohamed",
    time: "2 days ago",
    rating: 5,
    text: "Excellent service! They were quick, transparent about pricing, and my car runs perfectly now.",
  },
  {
    name: "Manal Ahmed",
    time: "1 week ago",
    rating: 4,
    text: "Good experience overall. The oil change was fast, but I had to wait longer than expected.",
  },
  {
    name: "Revan Taher",
    time: "2 weeks ago",
    rating: 5,
    text: "Honest mechanics are hard to find. These guys told me I didn't actually need a repair.",
  },
  {
    name: "Ziyad Niazy",
    time: "1 month ago",
    rating: 5,
    text: "Very professional workshop. The waiting area is clean and they explained everything.",
  },
  {
    name: "Saeed Mohamed",
    time: "1 month ago",
    rating: 3,
    text: "The repair work was solid, but communication could be better.",
  },
  {
    name: "Said Hamed",
    time: "2 months ago",
    rating: 5,
    text: "Fantastic team! Brought my SUV in for a major service and they handled it perfectly.",
  },
];

const Reviews = () => {
  return (
    <div className="container mt-5">
      <h2 className="mb-5 fw-bolder">Reviews</h2>

      <div className="row">
        {reviews.map((review, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card p-3 review-card">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="mb-2 fw-bold">{review.name}</h6>
                  <small className="text-muted">{review.time}</small>
                </div>

                <Stars rating={review.rating} />
              </div>

              <p className="mt-3 text-muted">"{review.text}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
