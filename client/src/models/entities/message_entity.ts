import { MessageType } from "../../components/enums";
import { SenderEntity } from "./sender_entity";

export interface MessageEntity {
  id: string;
  chatRoomID: string;
  sender: SenderEntity;
  text: string | null;
  type: MessageType;
  imageURL: string | null;
  createdAt: Date;
}
