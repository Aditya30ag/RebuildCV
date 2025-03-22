import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import { PrivacyPage, TermsPage } from "./components/TermsPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <HomePage/>
        </>
      ),
    },
    {
      path: "/terms",
      element: (
        <>
          <TermsPage/>
        </>
      ),
    },
    {
      path: "/privacy",
      element: (
        <>
          <PrivacyPage/>
        </>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
