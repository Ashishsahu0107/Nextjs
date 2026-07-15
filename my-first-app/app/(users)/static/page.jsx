import db from "@/config/db";

const StaticData = async () => {
  const [doctors] = await db.query("SELECT * FROM doctors");

  return (
    <div>
      {doctors.map((doctor) => (
        <div key={doctor.doctor_id}>
          <h2>
            {doctor.first_name} {doctor.last_name}
          </h2>
          <p>{doctor.specialization}</p>
        </div>
      ))}
    </div>
  );
};

export default StaticData;