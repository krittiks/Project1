import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import  {Home} from "./components/Home";
import {Products} from "./components/Products";
import { Sales } from "./components/Sales";
import { Stores } from "./components/Stores";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
    path:'/'
  },
  {
    path: '/Products',
    element: <Products /> 
  },
  {
    path: '/Sales',
    element: <Sales />
  },
  {
    path: '/Stores',
    element: <Stores />
  }
];

export default AppRoutes;
