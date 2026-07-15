import db from "@/config/db";
import { cache } from "react";

export const revalidate = 30;

const DynamicPage = async () => {
   const doctors = await getAllDoctors();

  return (
    <>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.doctor_id}>
            <h2>
              {doctor.first_name} {doctor.last_name}
            </h2>
            <p>{doctor.specialization}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default DynamicPage;

const DoctorLists = async () => {
    const doctors = await getAllDoctors();

  return (
    <>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.doctor_id}>
            <h2>
              {doctor.first_name} {doctor.last_name}
            </h2>
            <p>{doctor.specialization}</p>
          </li>
        ))}
      </ul>
    </>
  );
};


const getAllDoctors = cache(async () => { 
    const [doctors] = await db.query("SELECT * FROM doctors");
    console.log("fetching doctors");
    return doctors;
})
