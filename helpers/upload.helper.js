const {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} = require("firebase/storage");

const storage = getStorage();

const uploader = async (file) => {
  const storageRef = ref(storage, file.originalname);
  const metadata = { contentType: file.mimetype };
  const snapshot = await uploadBytesResumable(
    storageRef,
    file.buffer,
    metadata
  );
  const url = await getDownloadURL(snapshot.ref);
  return url;
};

module.exports = { uploader };
