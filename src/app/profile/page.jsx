"use client"
import NewPageLayout from "@/components/NewPageLayout";
import avatar from '../../../public/assets/images/avatar.png'
import Image from "next/image";
// import Text from "@/components/Input/Text";
import Link from "next/link";
const Profile = () => {
    return <>
        <NewPageLayout title={''} isNativeBack hasBackURL={false}>
            <div className="bg-gray-100 rounded-xl flex flex-col items-center ">
                <div className=" h-44 w-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-t-xl">

                </div>
                <div className=" -mt-32 bg-transparent w-full flex flex-col  md:items-center p-3 relative">
                    <Link href={'profile/user-id-66'} className="absolute top-28 right-5 md:right-72 btn-info btn">
                        Edit
                    </Link>
                    <Image src={avatar} height={230} width={230} className="rounded-full" />
                    <span className=" md:mt-10 text-6xl md:text-7xl font-semibold text-slate-700 absolute -top-10 right-3 md:right-0 md:relative">20</span>
                    <span className="absolute right-3 md:relative md:right-0 md:-top-10">Kegiatan</span>
                    <h1 className="bg-gradient-to-r from-slate-900 to-blue-500 bg-clip-text text-transparent font-bold text-3xl mt-4 md:-mt-4">Ilham, S.Si.,</h1>
                    <h2 className="font-semibold text-gray-400 flex gap-1 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm5-2V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-4 5v.01"></path><path d="M3 13a20 20 0 0 0 18 0"></path></g></svg>
                        Peserta KKN
                    </h2>
                    <h3 className="flex gap-1 items-center text-gray-400 mt-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m12 .856l10 5.556V9H2V6.412zM5.06 7h13.88L12 3.144zM7 11v8H5v-8zm6 0v8h-2v-8zm6 0v8h-2v-8zM2 21h20v2H2z"></path></svg>
                        Universitas Hasanuddin
                    </h3>
                    <h3 className="flex gap-1 items-center text-gray-400 ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V3q0-.425.288-.712T7 2t.713.288T8 3v1h8V3q0-.425.288-.712T17 2t.713.288T18 3v1h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5zM5 8h14V6H5zm0 0V6zm7 6q-.425 0-.712-.288T11 13t.288-.712T12 12t.713.288T13 13t-.288.713T12 14m-4 0q-.425 0-.712-.288T7 13t.288-.712T8 12t.713.288T9 13t-.288.713T8 14m8 0q-.425 0-.712-.288T15 13t.288-.712T16 12t.713.288T17 13t-.288.713T16 14m-4 4q-.425 0-.712-.288T11 17t.288-.712T12 16t.713.288T13 17t-.288.713T12 18m-4 0q-.425 0-.712-.288T7 17t.288-.712T8 16t.713.288T9 17t-.288.713T8 18m8 0q-.425 0-.712-.288T15 17t.288-.712T16 16t.713.288T17 17t-.288.713T16 18"></path></svg>
                        Bulukumba, 6 November 1997
                    </h3>
                    <h3 className="flex gap-1 items-center text-gray-400 ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z"></path></svg>
                        0611mrx@gmail.com
                    </h3>
                </div>
            </div>
        </NewPageLayout>
    </>
}

export default Profile;