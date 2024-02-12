import React from "react";
import { Outlet } from "react-router-dom";

function RootLayout() {
    return (
        <>
            <div className="flex justify-center item-center">
                <Outlet />
            </div>
        </>
    );
}

export default RootLayout;
