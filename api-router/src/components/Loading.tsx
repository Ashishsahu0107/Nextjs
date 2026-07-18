"use client";

import Loading1 from "@/assets/loading.gif";
import Image from "next/image";

const Loading = () => {
  return (
    <div>
      <div>
        <Image src={Loading1} alt="Loading..." width={200} />
      </div>
    </div>
  );
};

export default Loading;
