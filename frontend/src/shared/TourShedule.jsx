import React, { useState } from 'react';
import './tourSchedule.css'

const TourSchedule = ({ schedule }) => {
  const [day, setDay] = useState(0);

  const handleDayClick = (index) => {
    setDay(index);
  };

  return (
    <div className='tour__schedule_day'>
      <h2>Lịch trình tour</h2>

      {/* Phần chứa các ngày */}
      <div className="day__buttons">
        {schedule && schedule.map((item, index) => (
          <button
            key={index}
            className={day === index ? 'active' : ''}
            onClick={() => handleDayClick(index)}
          >
            Ngày {index + 1}
          </button>
        ))}
      </div>
      <br />

      {/* Lịch trình của ngày */}
      <div className="day__content">
        {day !== null && schedule &&(
          <div>
            <p>
              <i className="ri-arrow-drop-right-fill"></i>
              {schedule[day].time}
            </p>
            {schedule[day].content.map((item, index) => (
              <p className='day__content_p' key={index}>{item}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TourSchedule;