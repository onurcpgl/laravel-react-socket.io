import { Routes, Route } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Chat from "../pages/Chat/Chat";

function AppRoute() {
    return (
        <Routes>
            <Route>
                <Route path="" element={<RootLayout />}>
                    <Route path="/" element={<Chat />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default AppRoute;
