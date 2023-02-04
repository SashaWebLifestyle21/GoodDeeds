import React from 'react';
import Button from "@/components/common-components/Button";
import {useAppDispatch} from "@/hooks/redux";
import {removeDeed, updateDeed} from "@/redux/reducers/user/userSlice";

interface IDeedItem {
    text: string
    id: string
    userId: string
    handleUpdate: (id: string) => void
}

const DeedItem = ({id, text, userId, handleUpdate}: IDeedItem) => {

    const dispatch = useAppDispatch()

    const handleRemove = () => {
        dispatch(removeDeed({id, userId}))
    }

    return (
        <div className='border-primary border border-solid bg-lightGrey p-[10px] rounded-[15px] mb-[10px] flex items-center justify-between'>
            <p>{text}</p>
            <div>
                <button onClick={() => handleUpdate(id)}>Изм</button>
                <Button onClick={handleRemove}>X</Button>
            </div>
        </div>
    );
};

export default DeedItem;