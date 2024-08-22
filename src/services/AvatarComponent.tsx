import React from 'react';

interface AvatarProps {
    email: string;
    bg: string
}

const getRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const Avatar: React.FC<AvatarProps> = ({ email, bg }) => {
    const initials = email.substring(0, 2).toUpperCase();

    return (
        <div
            style={{
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                backgroundColor: bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                color: '#FFF',

            }}
        >
            {initials}
        </div>
    );
};

export default Avatar;
