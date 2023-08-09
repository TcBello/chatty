import { UserEntity } from "./user_entity";

export interface ChatRoomEntity {
  id: string;
  participants: UserEntity[];
  isActive: boolean;
  createdAt: Date | null;
}
