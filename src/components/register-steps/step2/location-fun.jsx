import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import { FormGroup, FormControl, FormText } from 'react-bootstrap';

export default function Location() {
  const { register, setValue, watch, formState: { errors } } = useFormContext();

  // مراقبة حقل الـ location (الرابط)
  const locationUrl = watch('location');

  useEffect(() => {
    if (!locationUrl || typeof locationUrl !== 'string' || locationUrl.trim() === '') {
      // لو الخانة فضيت، نصفر الإحداثيات
      setValue('latitude', '');
      setValue('longitude', '');
      return;
    }

    const url = locationUrl.trim();

    // عبقرية الـ Regex هنا: بنحاول نصطاد الأرقام بعد علامة @ أو بعد !3d و !4d
    const regexPatterns = [
      /@(-?\d+\.\d+),(-?\d+\.\d+)/, // التنسيق القياسي للمتصفح
      /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/, // تنسيق الـ Share/Embed
      /q=(-?\d+\.\d+),(-?\d+\.\d+)/ // تنسيق البحث
    ];

    let found = false;

    for (let pattern of regexPatterns) {
      const match = url.match(pattern);
      if (match && match[1] && match[2]) {
        const lat = match[1];
        const lng = match[2];

        // تحديث القيم في الـ Form تلقائياً
        setValue('latitude', lat, { shouldValidate: true });
        setValue('longitude', lng, { shouldValidate: true });
        
        console.log('✅ Coordinates Extracted:', { lat, lng });
        found = true;
        break; // نكتفي بأول نمط ينجح
      }
    }

    if (!found) {
      // لو اللينك مش مفهوم (زي اللينكات المختصرة جداً)، بنصفر القيم عشان ما نبعتش داتا قديمة غلط
      setValue('latitude', '');
      setValue('longitude', '');
    }

  }, [locationUrl, setValue]);

  return (
    <FormGroup className="form-floating mb-3">
      <FormControl
        id="locationInput"
        type="url"
        placeholder="Paste Google Maps Link here"
        {...register('location')}
        isInvalid={!!errors.location}
      />
      <label htmlFor="locationInput">Google Maps URL</label>
      
      {/* عرض الإحداثيات للمستخدم (اختياري) عشان يتطمن إن السيستم قرأها
      <div className="d-flex gap-2 mt-2">
         {watch('latitude') && (
           <small className="badge bg-light text-dark border">
             Lat: {watch('latitude')}
           </small>
         )}
         {watch('longitude') && (
           <small className="badge bg-light text-dark border">
             Long: {watch('longitude')}
           </small>
         )}
      </div> */}

      {errors.location && (
        <FormText className="text-danger">
          {errors.location.message}
        </FormText>
      )}
      
      <FormText className="text-muted d-block mt-1" style={{fontSize: '0.8rem'}}>
        Tip: Open the location on Google Maps and copy the full URL from the browser.
      </FormText>
    </FormGroup>
  );
}