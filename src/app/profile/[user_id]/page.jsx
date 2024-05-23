"use client"
import NewPageLayout from "@/components/NewPageLayout";
import DivCard from "@/components/DivCard";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ['latin'] })
import { useRouter } from "next/navigation";
import Text from "@/components/Input/Text";
import Date from "@/components/Input/Date";
import Select from "@/components/Input/Select";
import { useState } from "react";
import SubmitButton from "@/components/Button/SubmitButton";
import { formService } from "@/services/form.service";
import Loader from "@/components/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSWR from 'swr'
import AsyncSelect from "react-select/async"
import { useRef } from "react";
import Checkbox from "@/components/Input/Checkbox";
import Link from "next/link";

const Edit = () => {
    const router = useRouter();
    const [photo, setPhoto] = useState()
    const [errors, setErrors] = useState();
    const [loading, setLoading] = useState();
    const controller = new AbortController();
    const [modalActive, setModalActive] = useState(false);
    const signal = controller.signal;
    const fetcher = url => fetch(process.env.API + url, {
        method: 'GET',
        signal: signal
    }).then((res) => res.json())

    const { data: religions, isLoading: religionsLoading } = useSWR('/api/reference/religion/index', fetcher)
    const { data: maritalStatuses, isLoading: maritalStatusesLoading } = useSWR('/api/reference/marital-status/index', fetcher)
    const { data: workUnits, isLoading: workUnitsLoading } = useSWR('/api/reference/work_unit/list', fetcher)
    const genders = [
        {
            id: 'Laki-laki',
            name: 'Laki-laki'
        },
        {
            id: 'Perempuan',
            name: 'Perempuan'
        }
    ]

    let filterTimeout;
    const getVillageOptions = (searchTerm, callback) => {
        clearTimeout(filterTimeout)
        filterTimeout = setTimeout(() => {
            fetch(process.env.API + '/api/reference/village/search?terms=' + searchTerm, {
                method: 'GET',

            }).then((res) => res.json()).then((data) => callback(data.data))
        }, 1000)

    }

    const village_id = useRef()
    const handleVillageChange = (e) => {
        village_id.current = e;
    }

    const photoHandler = (e) => {
        setPhoto(e.target.files[0]);
        if (e.target.files[0].size > 2097152) {
            alert("File tidak boleh lebih dari 2 MB!");
            e.target.value = "";
        };
    }



    let postData = new FormData();
    const handleSubmit = event => {
        event.preventDefault();
        setLoading(true);
        postData.append('name', formService.getText('name'))
        postData.append('id_number', formService.getText('id_number'))
        postData.append('id_number', formService.getText('id_number'))
        postData.append('reference_religion_id', formService.getText('reference_religion_id'))
        postData.append('reference_marital_status_id', formService.getText('reference_marital_status_id'))
        postData.append('reference_work_unit_id', formService.getText('reference_work_unit_id'))
        postData.append('study_program', formService.getText('study_program'))
        postData.append('village_id', village_id.current.value)
        postData.append('zip_code', formService.getText('zip_code'))
        postData.append('address', formService.getText('address'))
        postData.append('birth_place', formService.getText('birth_place'))
        postData.append('birth_date', formService.getText('birth_date'))
        postData.append('gender', formService.getText('gender'))
        postData.append('phone_number', formService.getText('phone_number'))
        postData.append('email', formService.getText('email'))
        postData.append('password', formService.getText('password'))
        postData.append('password_verification', formService.getText('password_verification'))
        postData.append('is_japan', formService.getChecked('is_japan'))
        postData.append('is_japan_visa', formService.getChecked('is_japan_visa'))
        postData.append('parent_phone_number', formService.getText('parent_phone_number'))
        postData.append('parent_name', formService.getText('parent_name'))

        if (photo) postData.append('profile_picture', photo)

        fetch(process.env.API + '/api/auth/register', {
            method: 'POST',
            body: postData
        }).then((res) => res.json()).then((data) => {
            setLoading(false);
            if (data.success) {
                setErrors([])
                toast.success('Berhasil Menambah Data', {
                    position: 'bottom-right'
                })
                // router.push('/auth/login');
                // setModalActive(true);
                document.getElementById('my_modal_6').checked = true
            } else {
                toast.error(data.data?.error, {
                    position: 'bottom-right'
                })
                toast.error('Periksa kembali form isian', {
                    position: 'bottom-right'
                })
                setErrors(data.data)
            }
        })
    }
    return <>
        <NewPageLayout title={''} isNativeBack>
            <form onSubmit={handleSubmit}>
                <h1 className="text-3xl font-semibold">Data Pribadi</h1>

                <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3 items-center">
                    <Text id={'name'} label={'Nama'} placeholder={'Masukkan nama'} isRequired errors={errors} />
                    <Text id={'phone_number'} label={'Nomor HP'} placeholder={'Masukkan nomor hp'} isRequired errors={errors} />
                    <Text id={'id_number'} label={'NIK'} placeholder={'Masukkan 16 digit NIK'} isRequired errors={errors} />
                </div>
                <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3 items-center">
                    <Text id={'birth_place'} label={'Tempat Lahir'} placeholder={'Masukkan tempat lahir'} isRequired errors={errors} />
                    <Date id={'birth_date'} label={'Tanggal Lahir'} isRequired errors={errors} />
                </div>
                <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3 items-center">
                    <Select id={'gender'} label={'Jenis Kelamin'} placeholder={'Pilih jenis kelamin'} options={genders} isRequired errors={errors} />
                    <Select id={'reference_religion_id'} label={'Agama'} placeholder={'Pilih agama'} options={religions?.data} isRequired errors={errors} />
                    <Select id={'reference_marital_status_id'} label={'Status Pernikahan'} placeholder={'Pilih status pernikahan'} options={maritalStatuses?.data} isRequired errors={errors} />
                </div>
                <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3 items-center">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Kelurahan / Desa</span>
                            <span className="label-text-alt text-red-500 font-semibold">* Wajib</span>
                        </label>
                        <AsyncSelect
                            cacheOptions
                            onChange={handleVillageChange}
                            loadOptions={getVillageOptions}
                            placeholder={"Pilih Kelurahan / Desa (Cari Kelurahan / Desa)"}
                            defaultOptions
                        />
                        <label className="label">
                            <span className="text-xs italic text-red-500">{(errors?.hasOwnProperty("village_id")) ? errors.village_id[0] : ''}</span>
                            {/* <span className="label-text-alt">Alt label</span> */}
                        </label>
                    </div>
                    <Text id={'address'} label={'Alamat'} placeholder={'Masukkan alamat lengkap'} isRequired errors={errors} />
                </div>
                <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3 items-center">
                    <Text id={'zip_code'} label={'Kode Pos'} placeholder={'Masukkan kode pos'} isNumber isRequired errors={errors} />
                    <Select id={'reference_work_unit_id'} label={'Fakultas'} placeholder={'Pilih fakultas'} options={workUnits?.data} isRequired errors={errors} />
                    <Text id={'study_program'} label={'Program Studi'} placeholder={'Masukkan program studi'} isRequired errors={errors} />
                </div>
                <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3 items-center">
                    <Text isEmail id={'email'} label={'Email'} placeholder={'Masukkan email'} isRequired errors={errors} />
                    <Text isPassword id={'password'} label={'Password'} placeholder={'Masukkan password'} isRequired errors={errors} />
                    <Text isPassword id={'password_verification'} label={'Verifikasi Password'} placeholder={'Masukkan password'} isRequired errors={errors} />
                </div>
                <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3 items-center">
                    <Checkbox id={'is_japan'} label={'Apakah sudah pernah ke jepang ?'} />
                </div>
                <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3 items-center">
                    <Checkbox id={'is_japan_visa'} label={'Apakah memiliki visa jepang / visa masih aktif ?'} />
                </div>
                <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3 items-center">
                    <div className="form-control w-full mt-5">
                        <label className="block">
                            <label className="label">
                                <span className="label-text font-semibold">Foto Profil</span>
                                {/* <span className="label-text-alt text-red-500 font-semibold">* Wajib</span> */}
                            </label>
                            <input accept="image/png, image/jpeg, image/jpg" type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" onChange={photoHandler} />
                            <label className="label">
                                <span className="label-text-alt">File Berekstensi *.jpg, *.png Dengan Maksimal Size 2MB</span>
                                <span className="text-xs italic text-red-500">{(errors?.hasOwnProperty("profile_picture")) ? errors['profile_picture'][0] : ''}</span>
                            </label>
                        </label>
                    </div>
                </div>
                <h1 className="text-3xl font-semibold mt-8">Data Orang Tua</h1>
                <div className="flex flex-col md:flex-row lg:flex-row md:gap-3 lg:gap-3 items-center">
                    <Text id={'parent_name'} label={'Nama Orang Tua (Ayah / Ibu)'} placeholder={'Masukkan nama orang tua'} isRequired errors={errors} />
                    <Text id={'parent_phone_number'} label={'Nomor HP orang tua'} placeholder={'Masukkan nomor hp'} isRequired errors={errors} />
                </div>
                <SubmitButton backUrl={'/profile'} />
            </form>
        </NewPageLayout>
    </>
}
export default Edit;