import Link from 'next/link';
import '../app/globals.css'

const Navigation = () => {
  return (
      <nav className="flex justify-between items-center p-4 h-[60px] bg-gray-800 text-white">
        <h1 className='text-2xl'>Logo</h1>
          <ul className="flex gap-3 text-lg">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/clientComp">Client</Link></li>
              <li><Link href="/serverComp">Server</Link></li>
              <li><Link href="/contact">Contact</Link></li>     
              <li><Link href="/service">Services</Link></li>     
          </ul>
        </nav>
    );
};

export default Navigation;