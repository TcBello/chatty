import { UserEntity } from "../entities/user_entity";

export interface AuthRepository {
  login(email: string, password: string): Promise<UserEntity | null>;
  signup(userEntity: UserEntity, password: string): Promise<UserEntity | null>;
  forgotPassword(email: string): Promise<void>;
  logout(): Promise<void>;
}
