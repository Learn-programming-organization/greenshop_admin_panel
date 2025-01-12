import { ReactNode } from "react";

export interface UserType {
    key: number | string;
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    bio: string;
    image_url: string[];
    role: string;
    access_token: string;
    refresh_token: string;
    action: ReactNode
}