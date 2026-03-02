import "./header.css";

const Head =()=>{



    return (
    // الهيدر بياخد عرض الجزء اللي هو جواه بس
    <header 
      className="d-flex align-items-center justify-content-between px-4 bg-white shadow-sm border-bottom" 
      style={{ height: '70px' }}
    >
      {/* الجزء اللي على الشمال في الهيدر (ممكن تحط فيه اسم الصفحة الحالية أو Search) */}
      <div>
        <h5 className="mb-0 fw-bold text-dark">Overview</h5>
      </div>

      {/* الجزء اللي على اليمين (بيانات المستخدم) */}
      <div className="d-flex align-items-center gap-3">
        <div className="text-end d-none d-md-block">
          <p className="mb-0 fw-bold" style={{ fontSize: '0.9rem' }}>Mohamed Salah</p>
          <small className="text-muted" style={{ fontSize: '0.8rem' }}>Admin</small>
        </div>
        {/* صورة المستخدم */}
        <div 
          className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center fw-bold" 
          style={{ width: '40px', height: '40px', fontSize: '1.2rem' }}
        >
          M
        </div>
      </div>
    </header>
  );
}

export default Head