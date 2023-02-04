import React from 'react';
import {addFriend, IDeed, IUser} from "@/redux/reducers/user/userSlice";
import Title from "@/components/common-components/Title";
import {useAppDispatch, useAppSelector} from "@/hooks/redux";

interface IUserItem {
    name: string
    email: string
    password: string,
    nickname: string
    _id: string,
    deeds: IDeed[],
}

const UserItem = ({ _id, email, nickname, name, deeds, password }: IUserItem) => {

    const {currentUser} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()

    const handleAddFriend = () => {
        dispatch(addFriend({nickname, id: currentUser._id}))
    }

    return (
        <div className='rounded-[5px] p-[15px] border border-primary border-solid max-w-[400px] w-[100%] flex items-center justify-center gap-x-[10px] mb-[10px]'>
            <div className='w-[60px] h-[60px] flex items-center justify-center bg-secondary rounded-full text-white text-3xl'>
                {`${name?.slice(0,1).toUpperCase()}${email?.slice(0,1).toUpperCase()}`}
            </div>
            <div className='w-2/3'>
                <p>Имя: {name}</p>
                <p>Email: {email}</p>
                <p className='text-grey'>Nickname: {nickname}</p>
            </div>
            <button
                className='p-[5px] bg-primary rounded-[10px] text-white'
                onClick={handleAddFriend}
            >
                В друзья
            </button>
        </div>
    );
};

export default UserItem;