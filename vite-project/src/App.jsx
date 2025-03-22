import { Route, createRoutesFromElements, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import JobPage from "./pages/JobPage";
import NotFound from "./pages/NotFound";
import Jobs from "./pages/Jobs";
import AddJob from "./pages/AddJob";
import EditJob, { loader as editJobLoader } from "./pages/EditJob";

const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
    });
    return;
};

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/jobs" element={<JobPage />} />
            <Route path="/add-job" element={<AddJob />} />
            <Route 
                path="/edit-job/:id" 
                element={<EditJob />} 
                loader={editJobLoader} // Attach the loader to the route
            />
            <Route 
                path="/jobs/:id" 
                element={<Jobs deleteJob={deleteJob} />} 
            />
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

const App = () => {
    return (
        <RouterProvider router={router} />
    );
};

export default App;