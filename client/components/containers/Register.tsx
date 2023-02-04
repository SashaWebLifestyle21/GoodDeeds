import Title from "@/components/Title";
import {BaseSyntheticEvent, Dispatch, FC, SetStateAction, useCallback, useEffect, useState} from "react";
import FormGroup from "@/components/FormGroup";
import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {registerUser} from "@/redux/reducers/user/userSlice";
import {validEmail, validOnlyLetter, validPassword} from "@/api/validation";
import Button from "@/components/common-components/Button";
import {toast} from "react-toastify";

interface IRegister {
    handleRegister: Dispatch<SetStateAction<boolean>>
}

const Register= ({ handleRegister }: IRegister) => {
    const { status, isLoading } = useAppSelector(state => state.userReducer)
    useEffect(() => {
        if(status) toast(status)
    }, [status])

    const dispatch = useAppDispatch()

    const [username, setUsername] = useState({
        value: '',
        error: true,
        dirty: false
    })

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
    const [nickname, setNickname] = useState({
        value: '',
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

    const registerHandler = async () => {
        try {
            if(validPassword(password.value) && validEmail(email.value) && validOnlyLetter(username.value)){
                dispatch(registerUser({
                    name: username.value,
                    email: email.value,
                    password: password.value,
                    nickname: nickname.value
                }))
                setUsername({
                    value: '',
                    error: true,
                    dirty: false
                })
                setPassword({
                    value: '',
                    error: true,
                    dirty: false
                })
                setEmail({
                    value: '',
                    error: true,
                    dirty: false
                })
                setNickname({
                    value: '',
                    error: true,
                    dirty: false
                })
            }
        } catch (e) {
            console.log('err register ', e)
        }
    }

    return (
        <div>
            <form
                onSubmit={(e) => e.preventDefault()}
                className='m-auto border-2 border-solid w-96 border-primary rounded-[15px] p-[15px] mb-[20px]'
            >
                <Title className='mb-[15px]'>Регистрация</Title>
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
                    placeholder={'123456'}
                    value={password.value}
                    error={'Минимальная длина пароля 6 символов'}
                    displayError={password.error && password.dirty}
                    onBlur={blurHandler}
                    onChange={handlePassword}
                />
                <div className='flex gap-x-[10px] justify-center'>
                    <Button
                        className={`bg-primary text-white`}
                        onClick={registerHandler}

                    >
                        Подтвердить
                    </Button>
                    <Button
                        className={`bg-secondary text-white`}
                        onClick={() => handleRegister(false)}
                        disabled={isLoading}
                    >
                        Авторизация
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Register;