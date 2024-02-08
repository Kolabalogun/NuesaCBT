import { RouterProvider } from "react-router-dom";
import router from "./router";
import { AppProvider } from "./functions/context";

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
