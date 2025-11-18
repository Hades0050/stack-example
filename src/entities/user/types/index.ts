export type TUserRole = 'admin' | 'user' | 'moderator';
export type TUserStatus = 'active' | 'inactive';

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: TUserRole;
  status: TUserStatus;
  registrationDate: string;
  lastActivity: string;
  avatar: string | null;
  loginCount?: number;
  postsCount?: number;
  commentsCount?: number;
}

export type TCreateUserDto = Pick<IUser, 'name' | 'email' | 'role'> & {
  sendWelcomeEmail?: boolean;
};

export type TUpdateUserDto = Partial<Pick<IUser, 'name' | 'email' | 'role'>>;

