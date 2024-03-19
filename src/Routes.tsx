import { memo, Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FullScreenLoader from "mngo-project-tools/comps/FullScreenLoader";

//lazy loading split the main bundle into many chunks
const Register = lazy(() => import('./pages/Register'));
const Home = lazy(() => import('./pages/Home'));

function Routes() {

    const router = createBrowserRouter([
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "*",
            element: <Home />,
        }
    ]);

    return (
        <Suspense fallback={<FullScreenLoader styles={{ loaderClassName: "mngo-loader", className: "mngo-quiz-background" }} />}>
            <RouterProvider router={router} />
        </Suspense>
    )
}

export default memo(Routes);