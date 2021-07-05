import {
  AuthPage,
  AdminPage,
  ItemPage,
  MainPage,
  CartPage,
  RegistrationPage,
} from './components/pages';
import {
  ADMIN_ROUTE,
  CART_ROUTE,
  DEVICE_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from './utils/consts';

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: AdminPage,
  },
];

export const publickRoutes = [
  {
    path: SHOP_ROUTE,
    Component: MainPage,
  },
  {
    path: LOGIN_ROUTE,
    Component: AuthPage,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: RegistrationPage,
  },
  {
    path: DEVICE_ROUTE + '/:id',
    Component: ItemPage,
  },
  {
    path: CART_ROUTE,
    Component: CartPage,
  },
];
