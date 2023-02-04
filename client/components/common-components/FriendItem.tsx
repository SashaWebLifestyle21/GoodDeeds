import React from 'react';
import {IDeed} from "@/redux/reducers/user/userSlice";

interface IFriendItem {
    name: string
    email: string
    password: string,
    nickname: string
    _id: string,
    deeds: IDeed[],
}


const FriendItem = ({ _id, deeds, name, nickname, email, password}: IFriendItem) => {
    return (
        <div className='rounded-[5px] p-[15px] border border-primary border-solid max-w-[400px] w-[100%] flex items-center justify-center gap-x-[10px] mb-[10px]'>
            <div className='w-[60px] h-[60px] flex items-center justify-center bg-secondary rounded-full text-white text-3xl'>
                {`${name?.slice(0,1).toUpperCase()}${email?.slice(0,1).toUpperCase()}`}
            </div>
            <div className='w-2/3'>
                <p>Имя: {name}</p>
                <p>Email: {email}</p>
                <p className='text-grey'>Nickname: {nickname}</p>
                <p>Списки дел:</p>
                {deeds && deeds.map(deed => {
                    return <p className='text-secondary text-2xl'>{deed.text}</p>
                })}
            </div>
        </div>
    );
};

export default FriendItem;