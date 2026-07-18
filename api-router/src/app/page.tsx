"use client";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

interface params { 
  user: {
    name: string;
    age: number;
  }
}


function page() {
  // ssr -> server side rendering
  // let res = await fetch("http://localhost:3000/api/user", {
  //   cache: 'no-store',
  // });
  // let data = await res.json();
  // console.log(data);

  // ssg -> static site generation
  // let res = await fetch("http://localhost:3000/api/user", {
  //   cache: "force-cache",
  // });
  // let data = await res.json();
  // console.log(data);

  //isr -> incremental static regeneration
  // let res = await fetch("http://localhost:3000/api/user", {
  //   next : { revalidate: 12 }  // revalidate every 10 seconds
  // });
  // let data = await res.json();
  // console.log(data);


  // client side rendering
    const [data, setData] = useState(false);

   const handleApi = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/user", {
        cache: "no-store", // Always fetch latest data
      });

      const result = await res.json();
      setData(result);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleApi();
  }, []);

  if(!data){
    return(
      <div>
        <Loading/>
      </div>
    )
  }

  return (
    <div>
      <h1>API Data</h1>
      <p>Name: {data.name}</p>
      <p>Age: {data.age}</p>
    </div>
  );
}

export default page;
