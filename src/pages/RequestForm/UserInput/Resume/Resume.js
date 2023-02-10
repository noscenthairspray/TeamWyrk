import { useState } from "react";
import { InputError } from "../../../../components/Alerts/Error";
import styles from "./Resume.module.css";

//Upload your resume text and Attach File Button
//You can use the primary button from src/components to save time

//button props are variant, type, onClick
const Resume = ({ formData, setFormData, setError }) => {
  const [uploadError, setUploadError] = useState("");

  //switch label button style when resume is uploaded by user
  const resumeBtnStyle = !formData?.resumeFile
    ? styles.attachLabelBtn
    : styles.replaceLabelBtn;

  const handleFileUpload = ({ target }) => {
    const file = target.files[0];
    const maxSize = 5 * 1024 * 1024; //5mb
    if (!file) {
      setUploadError("");
      setFormData((prev) => ({ ...prev, [target.name]: "" }));
      return;
    }
    if (file?.size > maxSize) {
      setUploadError("Your file size is larger than 5MB. Try again.");
      return;
    }
    //pdf & doc
    if (file?.type !== "application/pdf" && file?.type !== "application/doc") {
      setUploadError("File format is incorrect. Please upload .pdf or .doc.");
      return;
    }
    setUploadError("");
    setError((prev) => ({ ...prev, [target.name]: false }));
    setFormData((prev) => ({ ...prev, [target.name]: file }));
  };

  return (
    <>
      <p className={styles.resumeTitle}>
        Upload your resume (5MB size limit. Pdf or doc only.){" "}
        <span className={styles.redAsterick}>*</span>
      </p>
      <input
        accept=".pdf,.doc"
        id="outlined-button-file"
        name="resumeFile"
        multiple
        type="file"
        hidden
        onChange={handleFileUpload}
      />
      {formData.resumeFile && (
        <span className={styles.fileChosen}>{formData.resumeFile.name}</span>
      )}

      {!formData?.resumeFile ? (
        <label for="outlined-button-file" className={styles.attachLabelBtn}>
          <img
            src="/images/request_form/resume_icon.svg"
            alt="resume icon"
            className={styles.resumeIcon}
          />
          Attach a file
        </label>
      ) : (
        <label for="outlined-button-file" className={styles.replaceLabelBtn}>
          Replace
        </label>
      )}
      {uploadError ? <InputError text={uploadError} /> : null}
    </>
  );
};

export default Resume;
