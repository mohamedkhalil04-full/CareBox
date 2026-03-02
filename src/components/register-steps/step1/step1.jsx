import { useFormContext } from 'react-hook-form'; // عشان نربطه بالـ Form الكبير
import './step1.css'
const Step1=()=> {

  // 1. نسحب الـ setValue عشان نخزن الاختيار في الـ Form الرئيسي
  const { setValue, watch, register } = useFormContext();

  // 2. نراقب القيمة المختارة حالياً (عشان لو رجعنا للخطوة دي نلاقيها متعلمة)
  const currentSelection = watch('providerType');


  const services = [
    {
      id: 'repair',
      title: 'Car Repair',
      desc: 'Expert diagnostics',
      icon: '🔧', // أو ممكن تستخدم react-icons: <FaTools />
      color: '#dc3545', 
    },
    {
      id: 'wash',
      title: 'Car Wash',
      desc: 'Premium detailing',
      icon: '🧼',
      color: '#0d6efd', 
    },
    {
      id: 'emergency',
      title: 'Emergency',
      desc: '24/7 roadside help',
      icon: '⚠️',
      color: '#fd7e14', 
    },
    {
      id: 'parts',
      title: 'Spare Parts',
      desc: 'Genuine OEM parts & accessories',
      icon: '🛠️',
      color: '#198754', 
    },
  ];

    const handleSelect = (serviceTitle) => {
     // تحديث قيمة الـ Form الرئيسي
     setValue('providerType', serviceTitle, { shouldValidate: true });
    };


  return (
        <div>
      {/* حقل مخفي عشان الـ Validation بتاع Yup يشتغل صح */}
      <input type="hidden" {...register('providerType')} />

      <div className="row g-3 mb-5">
        {services.map((service) => (
          <div className="col-6" key={service.id}>
            <button
              type="button"
              // هنا بنقارن القيمة المختارة بالعنوان عشان نلون الزرار
              className={`service-type-btn btn w-100 h-100 text-start p-3 border rounded-3 transition-all ${
                currentSelection === service.title ? 'border-danger shadow-sm bg-light' : 'border-light'
              }`}
              onClick={() => handleSelect(service.title)} // إضافة حدث الضغط
            >
              <div className="d-flex flex-column align-items-center text-center ">
                <div
                  className="icon-container rounded-circle d-flex align-items-center justify-content-center mb-2"
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: `${service.color}15`,
                    fontSize: '2rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {service.icon}
                </div>
                <h5 className="mb-1 fw-bold" style={{ fontSize: '1.1rem' }}>
                  {service.title}
                </h5>
                <small className="text-muted">{service.desc}</small>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Step1;


