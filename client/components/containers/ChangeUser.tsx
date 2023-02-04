import React, {BaseSyntheticEvent, useCallback, useState} from 'react';
import FormGroup from "@/components/FormGroup";
import {validEmail, validOnlyLetter, validPassword} from "@/api/validation";
import Button from "@/components/common-components/Button";
import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {registerUser, updateUser} from "@/redux/reducers/user/userSlice";

const ChangeUser = () => {

    const {currentUser} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()

    const [username, setUsername] = useState({
        value: currentUser.name,
        error: true,
        dirty: false
    })

    const [email, setEmail] = useState({
        value: currentUser.email,
        error: true,
        dirty: false
    })

    const [password, setPassword] = useState({
        value: '',
        error: true,
        dirty: false
    })
    const [nickname, setNickname] = useState({
        value: currentUser.nickname,
        error: true,
        dirty: false
    })

    const blurHandler = (e: BaseSyntheticEvent) => {
        switch (e.target.name) {
            case 'username':
                setUsername({...username, dirty: true})
                break
            case 'email':
                setEmail({...email, dirty: true})
                break
            case 'password':
                setPassword({...password, dirty: true})
                break
        }
    }

    const handleUserName = useCallback((event: React.FormEvent<HTMLInputElement>) => {
        !validOnlyLetter(event.currentTarget.value)
            ? setUsername({...username, value: event.currentTarget.value, error: true})
            : setUsername({...username, value: event.currentTarget.value, error: false})
    }, [username])

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

    const handleNickname = useCallback((event: React.FormEvent<HTMLInputElement>) => {
        setNickname({...nickname, value: event.currentTarget.value})
    },[nickname])

    const updateHandler = async () => {
        try {
            if(validPassword(password.value) && validEmail(email.value) && validOnlyLetter(username.value)){
                dispatch(updateUser({
                    name: username.value,
                    email: email.value,
                    password: password.value,
                    nickname: nickname.value,
                    _id: currentUser._id
                }))
            }
        } catch (e) {
            console.log('err register ', e)
        }
    }

    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <FormGroup
                    labelName={'username'}
                    labelText={'Username'}
                    inputName={'username'}
                    inputType={'text'}
                    placeholder={'Alexandr'}
                    value={username.value}
                    error={'Username должно содержать только буквы'}
                    displayError={username.error && username.dirty}
                    onBlur={blurHandler}
                    onChange={handleUserName}
                />
                <FormGroup
                    labelName={'nickname'}
                    labelText={'Nickname'}
                    inputName={'nickname'}
                    inputType={'text'}
                    placeholder={'Уникальный nickname'}
                    value={nickname.value}
                    // error={'Username должно содержать только буквы'}
                    // displayError={username.error && username.dirty}
                    // onBlur={blurHandler}
                    onChange={handleNickname}
                />
                <FormGroup
                    labelName={'email'}
                    labelText={'Email'}
                    inputName={'email'}
                    inputType={'text'}
                    placeholder={'user@mail.com'}
                    value={email.value}
                    error={'Неккоректный email'}
                    displayError={email.error && email.dirty}
                    onBlur={blurHandler}
                    onChange={handleEmail}
                />
                <FormGroup
                    labelName={'password'}
                    labelText={'Пароль'}
                    inputName={'password'}
                    inputType={'text'}
                    placeholder={'Новый пароль'}
                    value={password.value}
                    error={'Минимальная длина пароля 6 символов'}
                    displayError={password.error && password.dirty}
                    onBlur={blurHandler}
                    onChange={handlePassword}
                />
                <Button
                    className={`bg-primary text-white`}
                    onClick={updateHandler}
                >
                    Изменить
                </Button>
            </form>
        </div>
    );
};

export default ChangeUser;