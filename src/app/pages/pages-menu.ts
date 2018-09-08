import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Tableau de bord',
    icon: 'nb-grid-a-outline',
    link: '/pages/dashboard',
    //link: '/pages/under-construction',
    home: true,
  }, 
  {
    title: 'Tableau de bord 2',
    icon: 'nb-grid-a-outline',
    link: '/pages/dashboard2',
  }, 
  {
    title: 'Biens',
    icon: 'nb-home',
    link: '/pages/properties',
  },
  {
    title: 'Tarifs',
    icon: 'ion-ios-pricetag-outline',
    link: '/pages/tariff',
  },
  {
    title: 'Réservations',
    icon: 'lnr lnr-clock',
    link: '/pages/reservations',
  },
  {
    title: 'Calendriers',
    icon: 'lnr lnr-calendar-full',
    //link: '/pages/under-construction',
    link: '/pages/calendar'
  },
  {
    title: 'Services',
    icon: 'nb-gear',
    link: '/pages/categories',
  },
  {
    title: 'Finances',
    icon: 'nb-bar-chart',
    //link: '/pages/under-construction',
    link: '/pages/finances',
  },
  {
    title: 'Contacts',
    icon: 'ion-ios-people-outline',
    link: '/pages/contacts',
  },
  {
    title: 'Documents',
    icon: 'ion-ios-folder-outline',
    link: '/pages/documents',
  }
];

