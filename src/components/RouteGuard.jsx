"use client"
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { storageService } from '../services/storage.service';
import { NextRequest } from 'next/server';
// import { userService }
export { RouterGuard };

function RouterGuard({ children }) {
    const router = useRouter();
    const pathname = usePathname()

    const [authorized, setAuthorized] = useState(false);
    // const routerChangeHandler = useNav
    useEffect(() => {
        
        // on initial load - run auth check 
        authCheck(pathname, router);
        // console.log(pathname.startsWith("/team/"))
        // on route change start - hide page content by setting authorized to false  
        const hideContent = () => setAuthorized(false);
        // router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check 
        // router.events.on('routeChangeComplete', authCheck)
        window.addEventListener('load', authCheck);


        // unsubscribe from events in useEffect return function
        return () => {
            // router.events.off('routeChangeStart', hideContent);
            window.removeEventListener('popstate', hideContent);
            // router.events.off('routeChangeComplete', authCheck);
            window.removeEventListener('load', authCheck);
        }
    }, [authCheck, router]);

    function authCheck(url, xrouter) {
        const publicPaths = ['/auth/login', '/', '/auth/register', '/team/2', 'team/3', '/career'];
        const wildCardPaths = ['/news', '/blog'];
        // console.log(path.includes(cek))
        // localStorage.setItem('users', JSON.stringify(res.data.data))
        const userString = storageService.get("user")
        var user = null
        if (userString) {
            user = JSON.parse(storageService.get("user"));
        }

        const isInPublicPaths = publicPaths.some(publicPath => publicPaths.includes(pathname));
        const isInWildCardPaths = wildCardPaths.some(wildCardPath => pathname.includes(wildCardPath));
        // console.log(pathname.includes('//register'));
        // console.log(pathname);
        // console.log(isInWildCardPaths);
        if (!user && !isInPublicPaths && !isInWildCardPaths) {
            // console.log('redirect la');
            setAuthorized(false);
            // router.push({
            //     pathname: '/auth/login',
            //     query: { returnUrl: router.asPath }
            // })
            router.push(`/auth/login?returnUrl=${pathname}`);

            //dev --disable when add login
            // setAuthorized(true)
        } else {
            setAuthorized(true)
            if(user) {
                let role = storageService.checkRole(user.role_id);
                if (role == 'Administrator') {
                    if (pathname.startsWith('/lecturer') || pathname.startsWith('/participant') || pathname.startsWith('/headoffice')) {
                        router.push('/administrator')
                    }
                } else if (role == 'Lecturer') {
                    if (pathname.startsWith('/administrator') || pathname.startsWith('/participant') || pathname.startsWith('/headoffice') ) {
                        router.push('/lecturer')
                    }
                } else if (role == 'Participant') {
                    if (pathname.startsWith('/administrator') || pathname.startsWith('/lecturer') || pathname.startsWith('/headoffice')) {
                        router.push('/participant')
                    }
                } else if (role == 'Ketua') {
                    if (pathname.startsWith('/administrator') || pathname.startsWith('/lecturer') || pathname.startsWith('/lecturer')) {
                        router.push('/headoffice')
                    }
                }




                // else if (role == 'Kepala Sekolah') {
                //     if (pathname.startsWith('/teacher') || pathname.startsWith('/administrator') || pathname.startsWith('/education-authorities') || pathname.startsWith('/ministry') || pathname.startsWith('/leader')) {
                //         router.push('/headmaster')
                //     }
                // } else if (role == 'Tenaga Kesehatan') {
                //     if (pathname.startsWith('/teacher') || pathname.startsWith('/administrator') || pathname.startsWith('/education-authorities') || pathname.startsWith('/headmaster') || pathname.startsWith('/leader')) {
                //         router.push('/ministry')
                //     }
                // } else if (role == 'Bunda Paud') {
                //     if (pathname.startsWith('/teacher') || pathname.startsWith('/administrator') || pathname.startsWith('/education-authorities') || pathname.startsWith('/headmaster') || pathname.startsWith('/ministry')) {
                //         router.push('/leader')
                //     }
                // }
            }
           
        }

        // const user = storageService.get("user")

    }
    return (authorized && children);
}