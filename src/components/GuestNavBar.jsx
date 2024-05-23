import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const GuestNavBar = ({isScrollable = true}) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > window.innerHeight) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return <>
        <div className={`navbar z-50 ${isScrolled || !isScrollable ? 'bg-white shadow-lg' : 'bg-white/80'}   fixed top-0`}>
            <div className="navbar-start">
                <Image src={'/favicon/android-icon-144x144.png'} width={65} height={65} alt='favicon' />
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost normal-case font-bold text-sky-500 text-2xl md:text-4xl  md:block lg:block">{process.env.APP_NAME}</a>
            </div>
            <div className="navbar-end">
                {/* <Link href={'/auth/register'}>
                    <button className='btn  bg-sky-500 border-sky-500 mr-3'>
                        Daftar
                    </button>
                </Link>
                <Link href={'/auth/login'}>
                    <button className='btn border-sky-500 text-sky-500 bg-transparent mr-3'>
                        Masuk
                    </button>
                </Link> */}
            </div>
        </div>
    </>
}

export default GuestNavBar;