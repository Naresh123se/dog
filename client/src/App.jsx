import { ToastContainer, Bounce } from "react-toastify";

import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
   <Outlet />
      <ToastContainer
        position="middle-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}

export default App;
