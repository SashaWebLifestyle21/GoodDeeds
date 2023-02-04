import React, {BaseSyntheticEvent, Dispatch, SetStateAction, useCallback, useEffect, useState} from 'react';

import { toast} from "react-toastify";
import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {validEmail, validPassword} from "@/api/validation";
import {loginUser} from "@/redux/reducers/user/userSlice";
import FormGroup from "@/components/FormGroup";
import Button from "@/components/common-components/Button";
import Title from "@/components/common-components/Title";
import { useRouter } from 'next/router'

interface ILogin {
    handleLogin: Dispatch<SetStateAction<boolean>>
}

const Login = ({ handleLogin }: ILogin) => {

    const { status, token, currentUser } = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const isAuth = Boolean(token)

    useEffect(() => {
        if(status) toast(status)
        if(isAuth) router.push('/user')
    }, [status,  isAuth])

    const [email, setEmail] = useState({
        value: '',
        error: true,
        dirty: false
    })

    const [password, setPassword] = useState({
        value: '',
        error: true,
        dirty: false
    })

    const handleEmail = useCallback((event: React.FormEvent<HTMLInputElement>) => {
        !validEmail(event.currentTarget.value)
            ? setEmail({...email, value: event.currentTarget.value, error: true})
            : setEmail({...email, value: event.currentTarget.value, error: false})
    },[email])

    const handlePassword = useCallback((event: React.FormEvent<HTMLInputElement>) => {
        !validPassword(event.currentTarget.value)
            ? setPassword({...password, value: event.currentTarget.value, error: true})
            : setPassword({...password, value: event.currentTarget.value, error: false})
    },[password])


    const blurHandler = (e: BaseSyntheticEvent) => {
        switch (e.target.name) {
            case 'email':
                setEmail({...email, dirty: true})
                break
            case 'password':
                setPassword({...password, dirty: true})
                break
        }
    }

    const loginHandler = async () => {
        try {
            if(validPassword(password.value) && validEmail(email.value)){
                dispatch(loginUser({
                    email: email.value,
                    password: password.value
                }))
            }
        } catch (e) {
            console.log('err', e)
        }
    }

    return (
        <div className='w-[411px] m-auto border-2 border-solid border-primary rounded-[15px] p-[15px] mb-[20px]'>
            <form onSubmit={(e) => e.preventDefault()}>
                <Title className='mb-[15px]'>Авторизация</Title>
                <FormGroup
                    labelName={'email'}
                    labelText={'Email'}
                    inputName={'email'}
                    inputType={'email'}
                    placeholder={'sasha.svetogor@gmail.com'}
                    value={email.value}
                    onChange={handleEmail}
                    onBlur={blurHandler}
                    error={'неккоректный email'}
                    displayError={email.error && email.dirty}
                />
                <FormGroup
                    labelName={'password'}
                    labelText={'Password'}
                    inputName={'password'}
                    inputType={'text'}
                    placeholder={'Password'}
                    value={password.value}
                    onChange={handlePassword}
                    onBlur={blurHandler}
                    error={'Минимальная длина пароля 6 символов'}
                    displayError={password.error && password.dirty}
                />
            </form>
            <div className='flex gap-x-[10px] justify-center'>
                <Button
                    className={'bg-primary text-white'}
                    onClick={loginHandler}
                >
                    Войти
                </Button>
                <Button
                    className={'bg-secondary text-white'}
                    onClick={() => handleLogin(true)}
                >
                    Регистрация
                </Button>
            </div>
        </div>
    );
};

export default Login;