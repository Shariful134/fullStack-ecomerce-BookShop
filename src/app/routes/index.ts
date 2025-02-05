import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { authRoutes } from '../modules/auth/auth.route';
import { BookRoutes } from '../modules/Book/book.routes';
import { adminRoutes } from '../modules/admin/admin.routes';
import { OrderRoutes } from '../modules/Order/order.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/admin',
    route: adminRoutes,
  },
  {
    path: '/book',
    route: BookRoutes,
  },
  {
    path: '/order',
    route: OrderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
