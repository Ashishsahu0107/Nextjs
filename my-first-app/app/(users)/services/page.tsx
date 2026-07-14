import Image from "next/image";
import image from '../../../public/file.svg'
import photo from '../../../public/image.png'

const page = () => {
  return (
    <>
      <div className="flex gap-3 justify-center items-center h-[100vh] scroll-auto">
        <div className="w-70 h-80 bg-amber-300 flex flex-col justify-around items-center p-4 rounded hover:-translate-y-1.5 transition-all duration-300">
          <div className="w-20 h-20 relative bg-black rounded-full flex justify-center items-center text-white">
            <Image
              src={image}
              alt="Ashish"
              fill={true}
              quality={100}
              priority={false}
              placeholder="blur"
              blurDataURL="retr"
              className="w-full h-full rounded-full " />
          </div>
          <div className="text-center grid gap-2">
            <h3 className="text-2xl font-bold">Ashish Youtuber</h3>
            <p>Frontend Developer</p>
            <p>React & TypeScript</p>
          </div>
        </div>
        <div className="w-70 h-80 relative bg-amber-300 flex flex-col justify-around items-center p-4 rounded hover:-translate-y-1.5 transition-all duration-300">
           <Image
              src={photo}
              alt="Ashish"
              fill={true}
              quality={100}
              priority={false}
              placeholder="blur"
              blurDataURL=""
              />
        </div>
      </div>
    </>
  );
};

export default page;
