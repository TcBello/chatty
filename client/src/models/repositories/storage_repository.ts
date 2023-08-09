export interface StorageRepository {
  uploadImage(file: File, userID: string): Promise<string | null>;
  uploadMessageImage(file: File, userID: string): Promise<string | null>;
}
