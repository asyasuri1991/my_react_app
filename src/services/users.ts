import axios from 'axios';

export interface UserProps {
  map(arg0: (user: any) => void): import('react').ReactNode;
  id: number;
  role: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export async function fetchData() {
  try {
    const response = await axios.get('https://8db0266ee564afd2.mokky.dev/users');
    return response.data;
  } catch (error) {
    console.error('Ошибка получения пользователей', error);
  }
}
