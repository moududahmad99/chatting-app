import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Login from './Pages/Login';
import Registration from './Pages/Registration';

function App() {
    
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route path='/registration' element={<Registration />} />
                <Route path='/login' element={<Login />} />
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
