import db from '@/config/db'

export const revalidate = 30;

const StaticPage = async () => {
    const [doctors] = await db.query("SELECT * FROM doctors");
    console.log(doctors);
    
    return (
    
        <>
            <ul>
                { 
                    doctors.map((doctor) => (
                        <li key={doctor.doctor_id}>
                            <h2>{doctor.first_name} {doctor.last_name}</h2>
                            <p>{doctor.specialization}</p>
                        </li>
                    ))
                }
            </ul>
        </>
  )
}

export default StaticPage