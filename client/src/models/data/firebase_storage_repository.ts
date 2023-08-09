import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/firebase_setup";
import { StorageRepository } from "../repositories/storage_repository";

class DataFirebaseStorageRepository implements StorageRepository {
  private _storageAvatarRef(fileName: string, userID: string) {
    return ref(storage, `/avatars/${fileName}-${userID}`);
  }
  private _storageMessageRef(fileName: string, userID: string) {
    return ref(storage, `/messages/${fileName}-${userID}`);
  }
  async uploadImage(file: File, userID: string): Promise<string | null> {
    let url: string | null = null;
    var upload = await uploadBytes(
      this._storageAvatarRef(file.name, userID),
      file
    );

    if (upload) {
      url = await getDownloadURL(upload.ref);
    }

    return url;
  }

  async uploadMessageImage(file: File, userID: string): Promise<string | null> {
    let url: string | null = null;
    var upload = await uploadBytes(
      this._storageMessageRef(file.name, userID),
      file
    );

    if (upload) {
      url = await getDownloadURL(upload.ref);
    }

    return url;
  }
}

export default DataFirebaseStorageRepository;
