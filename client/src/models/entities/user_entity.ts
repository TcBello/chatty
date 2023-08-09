import { ChattingState } from "../../components/enums";
import { PreferenceEntity } from "./preference_entity";

export interface UserEntity {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  birthday: string;
  gender: string;
  country: string;
  image: string | null;
  chattingState: ChattingState;
  preferences: PreferenceEntity;
  createdAt: Date;
}
