import { ImageResponse } from "next/og";
import Image from 'next/image';
import icon from './logo_train.png';

export const runtime = "edge";
export const size = {
    width: 800,
    height: 800
};
export const conentType = "image/png";

export default function Icon(){
    return new ImageResponse(
        <Image
            src={icon}
            alt="logo"
            width={size.width}
            height={size.height}
            style={{ background: "#008" }}
        />,
        { ...size }
    );
}
