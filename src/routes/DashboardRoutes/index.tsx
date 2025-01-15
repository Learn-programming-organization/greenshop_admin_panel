import { Route, Routes } from "react-router-dom";
import { Categories, Home, Products, ProductsCrud, ProductsMore, Profile, Users } from "../../pages";
import { RouteType } from "../../types/RouteType";
import NavbarMenu from "../../components/NavbarMenu";
import { PATH } from "../../hooks/usePath";

const DashboardRoutes = () => {
  const routes: RouteType[] = [
    {
      id: 1,
      path: PATH.home,
      element: <Home />,
    },
    {
      id: 2,
      path: PATH.profile,
      element: <Profile />,
    },
    {
      id: 3,
      path: PATH.products,
      element: <Products />,
    },
    {
      id: 4,
      path: PATH.productCreate,
      element: <ProductsCrud />,
    },
    {
      id: 5,
      path: PATH.categories,
      element: <Categories />,
    },
    {
      id: 6,
      path: PATH.users,
      element: <Users />,
    },
    {
      id: 7,
      path: PATH.productMore,
      element: <ProductsMore />,
    },
    {
      id: 8,
      path: PATH.productEdit,
      element: <ProductsCrud />,
    },
  ];

  return (
    <div className="flex justify-between">
      <NavbarMenu />
      <div className="w-[80%] h-[100vh] overflow-y-auto">
        <Routes>
          {routes.map((item: RouteType) => (
            <Route key={item.id} path={item.path} element={item.element} />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default DashboardRoutes;
