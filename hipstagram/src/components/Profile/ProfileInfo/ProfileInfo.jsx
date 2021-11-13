import React from 'react';
import s from './ProfileInfo.module.css';

const ProfileInfo = () => {
    return (
        <div className={s.phonk}>
            <div className={s.avatar}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7F6t5qwIu2HSL5Ge-efXz_EH_h47yA5Ntwg&usqp=CAU" />
            </div>
            <img src="https://mir-s3-cdn-cf.behance.net/projects/original/4ef99a122206665.Y3JvcCwzNjcxLDI4NzIsNzA4LDA.png" />
        </div>
    )
}

export default ProfileInfo;