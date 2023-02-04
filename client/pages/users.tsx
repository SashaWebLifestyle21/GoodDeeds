import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import Header from "../components/containers/Header";
import {IUser} from "../redux/reducers/user/userSlice";
import UserItem from "@/components/common-components/UserItem";

const Users = () => {

    const {users} = useAppSelector(state => state.usersReducer)
    const [customers, setCustomers] = useState<IUser[]>(users)

    return (
        <>
            <Header />
            <div className='container'>
                <div className='flex items-center justify-center flex-col gap-y-[10px]'>
                    {customers && customers.map(customer => {
                        return (
                            <UserItem
                                key={customer._id}
                                name={customer.name}
                                email={customer.email}
                                password={customer.password}
                                nickname={customer.nickname}
                                _id={customer._id}
                                deeds={customer.deeds}
                            />
                        )
                    }) }
                </div>
            </div>
        </>
    );
};

export default Users;