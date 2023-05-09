import React, { useState, useEffect, useRef } from "react";
import styles from "./Profile.module.css";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { storage } from "../../../firebase";


const Profile = ({ userData }) => {
  const { displayName, metadata } = userData;
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("https://picsum.photos/200/300");
  const createdAtDate = new Date(parseInt(metadata.createdAt, 10));
  const fileInputRef = useRef(this);
  const monthIdx = createdAtDate.getMonth() + 1; // Months are 0-indexed in JavaScript, so add 1 to get the correct month
  const year = createdAtDate.getFullYear();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    if (userData?.photoURL){
      setPhotoURL(userData.photoURL);
    }
  }, [userData])
  

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
      uploadImageToStorage(e.target.files[0], userData, setLoading);
    }
  }
  const handleButtonClick = () => {
    fileInputRef.current.click();
  }


  return (
    <div className={styles.profileContainer}>
      <div className={styles.imageContainer}>
        <img
          src={photoURL}
          alt="ProfileImage"
          className={styles.profileImage}
        />
        <div>
          <input type = "file"
          style={{display:'none'}}
          ref={fileInputRef} 
          onChange={handleChange}/> 
        </div>
        <button
          disabled = {loading} 
          className={styles.editIconButton}
          onClick={handleButtonClick}>
          <img
            src={"/icons/profile-edit.svg"}
            alt="Edit"
            className={styles.editIcon}
          />
        </button>
      </div>
      <div className={styles.profileTextWrapper}>
        <div className={styles.name}>{displayName}</div>
        <p clasName={styles.memberText}>{`Member Since ${
          monthNames[monthIdx]
        }${" "}${year}`}</p>
      </div>
    </div>
  );
};

export default Profile;

export async function uploadImageToStorage(file, userData, setLoading) {
  const env = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
  const { displayName } = userData;
  const filePath = `gs://${env}/profile-image/${displayName}`;
  const storageRef = ref(storage, filePath);
  setLoading(true);
  //UploadTask stores the file in the cloud
  const uploadTask = await uploadBytes(storageRef, file);
  //
  const photoURL = await getDownloadURL(storageRef);

  updateProfile(userData, {photoURL});

  setLoading(false);
  alert("Uploaded file!")
}
