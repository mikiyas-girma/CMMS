import React, { useEffect, useState } from "react";
import SidebarWithHeader from "../components/sidebar/SidebarWithHeader";
import UpdatePassword from "../components/settings/UpdatePassword";


const Settings = () => {
    return (
        <SidebarWithHeader>
            <UpdatePassword />
        </SidebarWithHeader>
    );
    }

export default Settings;
