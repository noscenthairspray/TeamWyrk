import React from 'react';
import {useState, useEffect} from 'react';

const AvatarSVGWithImage = ({imageURL}) => {
    return (
        <svg width="232" height="232" viewBox="0 0 232 232"  xmlns="http://www.w3.org/2000/svg">
            <defs>
                <clipPath id="avatarClip">
                    <circle cx="116" cy="116" r="116" />
                </clipPath>
            </defs>
            <circle cx="116" cy="116" r="116" fill="#CCCCCC"/>
            {<image x="0" y="0" width="232" height="232" href={imageURL} clipPath="url(#avatarClip)" />}
        </svg>

    )
}

export default AvatarSVGWithImage;