import React from 'react';

import { useNavigate } from 'react-router-dom';

const BackToAdmin = () => {

    const navigate = useNavigate();

    return (
        <button
            className='btn_backToAdmin'
            onClick={() => navigate('/admin')}
        >Tilbage til admin forsiden.</button>
    )
}

export default BackToAdmin