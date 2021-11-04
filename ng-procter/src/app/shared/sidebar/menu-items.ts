import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '/component/plannings',
    title: 'Planeación',
    icon: 'mdi mdi-clipboard-text',
    class: '',
    extralink: false,
    submenu: []
  }, {
    path: '/component/rejects',
    title: 'Rechazo',
    icon: 'mdi mdi-grid-off',
    class: '',
    extralink: false,
    submenu: []
  }, {
    path: '/component/returns',
    title: 'Devolución',
    icon: 'mdi mdi-file-restore',
    class: '',
    extralink: false,
    submenu: []
  }, {
    path: '/component/accessories',
    title: 'Accesorio',
    icon: 'mdi mdi-widgets',
    class: '',
    extralink: false,
    submenu: []
  }
];
