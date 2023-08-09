import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/firebase_setup";
import { UserEntity } from "../entities/user_entity";
import { AuthRepository } from "../repositories/auth_repository";
import axios from "axios";
import { apiHost } from "../../components/constants";

class DataFirebaseAuthRepository implements AuthRepository {
  async logout(): Promise<void> {
    try {
      await auth.signOut();
    } catch (e) {
      console.log((e as Error).message);
    }
  }

  async login(email: string, password: string): Promise<UserEntity | null> {
    try {
      let userEntity: UserEntity | null = null;
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      if (userCred) {
        userEntity = await this.getUserData(userCred.user.uid);
      }

      return userEntity;
    } catch (e) {
      return null;
    }
  }
  async signup(user: UserEntity, password: string): Promise<UserEntity | null> {
    try {
      let userEntity: UserEntity | null = null;
      const userCred = await createUserWithEmailAndPassword(
        auth,
        user.email,
        password
      );

      if (userCred) {
        user.id = userCred.user.uid;
        var result = await axios.post(`${apiHost}/user/sign-up`, user);

        if (result.status == 201) {
          userEntity = await this.getUserData(userCred.user.uid);
        }
      }

      return userEntity;
    } catch (e) {
      console.log((e as Error).message);
      return null;
    }
  }

  async forgotPassword(email: string): Promise<void> {
    return await sendPasswordResetEmail(auth, email);
  }

  async getUserData(id: string): Promise<UserEntity | null> {
    var user: UserEntity | null = null;

    try {
      var result = await axios.get(`${apiHost}/user/${id}`);

      if (result.status == 200) {
        user = result.data.data as UserEntity;
        return user;
      }
    } catch (error) {
      console.log((error as Error).message);
    }

    return user;
  }
}

export default DataFirebaseAuthRepository;
