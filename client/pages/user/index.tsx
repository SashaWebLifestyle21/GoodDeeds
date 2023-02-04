import Register from "@/components/containers/Register";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import Title from "@/components/common-components/Title";
import Header from "@/components/containers/Header";
import React, {useEffect, useState} from "react";
import {getAllUsers} from "@/redux/reducers/users/usersSlice";
import DeedItem from "@/components/common-components/DeedItem";
import FormGroup from "@/components/FormGroup";
import Button from "@/components/common-components/Button";
import {addDeed, getFriends, updateDeed} from "@/redux/reducers/user/userSlice";
import UserItem from "@/components/common-components/UserItem";
import ChangeUser from "@/components/containers/ChangeUser";
import FriendItem from "@/components/common-components/FriendItem";


export default function Home() {

    const { currentUser } = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(getFriends(currentUser._id))
    },[])

    const [newDeed, setNewDeed] = useState('')

    const handleDeed = () => {
        dispatch(addDeed({
            deed: {
                text: newDeed
            },
            userId: currentUser._id
        }))
    }

    const handleUpdateDeed = (id: string) => {
        dispatch(updateDeed({
            deed: {id, text: newDeed},
            userId: currentUser._id
        }))
    }


    return (
        <>
            <Header />
            <div className='container'>
                <div className='flex justify-center gap-x-[10px]'>
                    <div className='w-1/3'>
                        <Title>Управление аккаунтом</Title>
                        <p>Nickname: {currentUser?.nickname}</p>
                        <p>Email: {currentUser?.email}</p>
                        <p className='text-center'>Редактирование данных:</p>
                        <ChangeUser />
                    </div>
                    <div className='w-1/3 border-2 border-solid border-primary p-[20px] rounded-[15px]'>
                        <Title>Добро пожаловать, {currentUser?.name}</Title>
                        <Title>Ваш список добрых дел:</Title>
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className='p-[10px] border-2 border-solid border-primary mb-[15px] rounded-2xl'
                        >
                            <div className='flex items-center justify-center'>
                                <FormGroup
                                    labelName={'deed'}
                                    labelText={'Новое дело'}
                                    inputName={'deed'}
                                    inputType={'text'}
                                    placeholder={''}
                                    value={newDeed}
                                    onChange={e => setNewDeed(e.currentTarget.value)}
                                />
                                <Button onClick={handleDeed}>Добавить</Button>
                            </div>

                        </form>
                        {currentUser.deeds.length === 0 && <p className='text-center'>Список пуст</p>}
                        {currentUser.deeds.map(deed => {
                            return <DeedItem key={deed._id} text={deed.text} id={deed._id} userId={currentUser._id} handleUpdate={() => handleUpdateDeed(deed._id)}/>
                        })}
                    </div>
                    <div className='w-1/3'>
                        <Title>Ваши друзья</Title>
                        {currentUser.friends.map(friend => {
                            return <FriendItem
                                name={friend.name}
                                email={friend.email}
                                password={friend.password}
                                nickname={friend.nickname}
                                _id={friend._id}
                                deeds={friend.deeds}
                            />
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
