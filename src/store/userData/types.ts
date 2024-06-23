export type AuthFormData = {
  email: string;
  password: string;
};

export type AuthResponse = {
  data: {
    id: number;
    role: string;
    fullName: string;
    avatar: string;
    email: string;
  };
  token: string;
};
