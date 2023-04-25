import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import NotLoggedIn from './PrivateRouter/NotLoggedIn';
import LoggedIn from './PrivateRouter/userLoggedIn';
import ForgotPassword from './Pages/ForgotPassword';
import RootLayout from './Layout';

function App() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route element={<LoggedIn />}>
                    <Route element={<RootLayout />}>
                        <Route path='/' element={<Home />} />
                    </Route>
                </Route>
                <Route element={<NotLoggedIn />}>
                    <Route path='/registration' element={<Registration />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/forgotpassword' element={<ForgotPassword />} />
                </Route>
            </Route>
        )
    )

    return (
        <React.Fragment>
            <RouterProvider router={router}></RouterProvider>
        </React.Fragment>
    );
}

export default App;
