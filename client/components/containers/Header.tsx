import React from 'react';
import Link from "next/link";
import {useAppDispatch} from "@/hooks/redux";
import {logout} from "@/redux/reducers/user/userSlice";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

const Header = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('userToken')
        toast('Вы вышли из системы')
        router.push('/')
    }

    return (
        <header className='bg-grey p-[10px] mb-[20px]'>
            <div className='container'>
                <ul className='flex items-center gap-x-[20px]'>
                    <li className='p-[5px]'>
                        <Link href={'/user'}>Главная</Link>
                    </li>
                    <li>
                        <Link href={'/users'}>Пользователи</Link>
                    </li>
                </ul>
                <button onClick={logoutHandler}>Выйти</button>
            </div>
        </header>
    );
};

export default Header;