export interface NavItem {
  route: string;
  title: string;
  permissions?: string[];
  icon?: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    route: '/profile/my-profile',
    title: 'Mi perfil',
    icon: 'person',
  },
  // Admin routes
  {
    route: '/accounts/manage-accounts',
    title: 'Cuentas',
    permissions: ['admin'],
    icon: 'settings',
  },
  // Doctor routes
  {
    route: '/calendar/my-calendar',
    title: 'Agenda',
    permissions: ['doctor'],
    icon: 'calendar_month',
  },
  {
    route: '/patients/patients-list',
    title: 'Mis pacientes',
    permissions: ['doctor'],
    icon: 'groups',
  },
  {
    route: '/receptionists/receptionists-list',
    title: 'Recepcionistas',
    permissions: ['doctor'],
    icon: 'support_agent',
  },
  {
    route: '/notes/notes-list',
    title: 'Notas',
    permissions: ['doctor'],
    icon: 'description',
  },
  // Receptionist routes
  {
    route: 'doctors/doctors-list',
    title: 'Mis doctores',
    permissions: ['receptionist'],
    icon: 'groups',
  }
];
