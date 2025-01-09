import { ReactNode } from "react";

export interface RouteType {
    id: number;
    path: string;
    element: ReactNode;
}