import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import MainContainer from "./components/layout/MainContainer";
import { routes } from "./utils/constants";

let router = createBrowserRouter(routes);

function App() {
  return (
    
      <MainContainer>
        <RouterProvider
          router={router}
          fallbackElement={<p>Loading...</p>}
        />
      </MainContainer>
  );
}

export default App;