'use client';

import React from 'react';
import ReactLoading from 'react-loading';

const Loading = ({ color }:{ color:string }) => (
    <ReactLoading type={"spinningBubbles"} color={color} height={'100%'} width={'100%'} />
);
 
export default Loading;