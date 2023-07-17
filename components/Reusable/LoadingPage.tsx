import React from 'react';
import Loading from "../../public/icons/Loading";

const LoadingPage = ({loaded,children}:{loaded:boolean,children:any}) => {
    return (
        loaded ?
        children:
        <div className='flex-1 flex items-center justify-center' style={{minHeight: 'calc(100vh - 80px)'}}>
            <Loading/>
        </div>
    );
};

export default LoadingPage;