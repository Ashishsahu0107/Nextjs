import db from "@/config/db";

const staticData = async () => {
  const doctors = await db.query("SELECT * FROM doctors");
  console.log(doctors);

  return (
    <div>
      {doctors.map((item, idx) => { 
        <div key={idx}>{item.first_name} <span>{item.last_name}</span>
          <p>{item.specialization}</p>
        </div>
      })}
    </div>
  );
};

export default staticData;
