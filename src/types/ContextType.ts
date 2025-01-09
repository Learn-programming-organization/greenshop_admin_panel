import React, { SetStateAction } from "react";

export interface ContextType {
    token: string | null;
    setToken: React.Dispatch<SetStateAction<string | null>>
}