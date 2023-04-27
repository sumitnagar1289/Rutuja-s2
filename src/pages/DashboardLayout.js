import React from 'react';
import { Outlet } from "react-router-dom";
import SideList2 from './dashboard/SideList2';

const DashboardLayout = () => {
    return (
        <div>
            <SideList2>
                <Outlet />
            </SideList2>
        </div>
    );
}

export default DashboardLayout;
