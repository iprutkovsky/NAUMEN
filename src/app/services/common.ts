export interface UserLayout {
  id: string;
  name: string;
  email: string;
  active: boolean;
};

export const languageLayout: any = {
  'eng': {
    'mainTitle': 'Users',
    'extraInfoField': 'User information',
    'userStatus': {
      'all': 'All',
      'active': 'Active',
      'inactive': 'Inactive'
    }
  },
  'rus': {
    'mainTitle': 'Пользователи',
    'extraInfoField': 'Данные пользователя',
    'userStatus': {
      'all': 'Все',
      'active': 'Активные',
      'inactive': 'Неактивные'
    }
  }
};