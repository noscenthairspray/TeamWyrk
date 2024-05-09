import styles from "./InsiderAcceptModal.module.css";
import { ReactComponent as Avatar } from "./Avatar.svg";
import AvatarSVGWithImage from "./AvatarSVGWithImage";
import { ReactComponent as LinkedInLogo } from "./LinkedInLogo.svg";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../../../firebase";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, updateDoc, update, ref } from "firebase/firestore";
import DeclinedEmailTemplate from "./DeclinedEmailTemplate";
import AcceptanceEmailTemplate from "./AcceptanceEmailTemplate";
import { FirebaseError } from "firebase/app";

// import { Block } from "@mui/icons-material";

//TODO: PASS INSIDER INFO AS PROP TO SHOW ON MODAL
//TODO: FINISH UP STYLING FOR MODAL

//TODO: ADD IN FUNCTIONALITY TO SHOW ALERT TOAST WHEN DECLINE BUTTON IS CLICKED

// TODO: Change the pill state after declined/accept

/**
 * InsiderAcceptModel is a React component that display a modal dialog
 * allows users to see the Insider that matched with their request
 * and decided whether to accept or declined the Insider's help.
 *
 * Props:
 * - setOpenModal: Function to update the 'open' state
 * - insiderID: A string of the Insider's ID
 * - requestData: Object that holds the request information
 */

const InsiderAcceptModal = ({
  setOpenAcceptModal,
  insiderID,
  requestData,
  setRequestStatus,
}) => {
  // State to hold the Insider's info (includes email, name, profile image, role)
  const [insiderInfo, setInsiderInfo] = useState([]);
  // console.log(requestData);
  // console.log(insiderID);

  // apply capitalization to service from backend for viewing correctly on the frontend
  //split by hyphen and capitalize each word function
  const capitalize = (str) => {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  let service = capitalize(requestData.services);
  // console.log(service);

  /** Effect hook to get the Insider's info from Firebase using the Insider's ID prop */
  useEffect(() => {
    const fetchInsiderInfo = async () => {
      const docRef = doc(db, "user", insiderID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setInsiderInfo(docSnap.data());
      }
    };

    // Catches if no Insider is matched to the request
    if (insiderID !== null) {
      fetchInsiderInfo();
    }
  }, []);

  const createConversation = async () => {

    //create a new conversation document with a unique id
    const conversationRef = collection(db, "conversations");
    const newConversation = await addDoc(conversationRef, {
      messages: [],
    });

    const usersArray = [
      {uid: requestData.uid, receiverID: insiderID, relationship: "Insider"}, {uid: insiderID, receiverID: requestData.uid, relationship: "Requester"}
    ];


    for(const user of usersArray){
      //create a new conversationLog for the the user (requester/insider)
      const conversationLog = {
        conversationID: newConversation.id,
        lastMessage: "",
        receiverID: user.receiverID,
        updatedAt: new Date(),
        lastMessageRead: false,
        receiverRelationship: `${user.relationship} for a ${service}`,
      }

      const userConversationRef = doc(db, "userConversationLogs", user.uid);
      const userConversationSnap = await getDoc(userConversationRef);
      if(userConversationSnap.exists()){
        const userConversationData = userConversationSnap.data();
        const updatedConversationLog = [...userConversationData.conversations, conversationLog];
        await updateDoc(userConversationRef, {
          conversations: updatedConversationLog,
        });
      }
      else{
        //create a new userConversationLog for the requester
        await setDoc(userConversationRef, {
          conversations: [conversationLog],
        });
      }
    }
  };

  // Function updates the status on the request document in firestore
  // Also, sends email to the matched insider to complete service
  const updateRequestInsiderStatus = async () => {
    //uncommenting for testing createConversation function
    const emailTemplate = AcceptanceEmailTemplate(
      requestData,
      insiderInfo.name,
      service
    );
    await updateDoc(doc(db, "request", requestData.id), {
      status: "matched",
    })
      .then(
        // Adds a new mail document
        await addDoc(collection(db, "mail"), {
          to: insiderInfo.email,
          message: {
            subject: `New ${service} Request`,
            html: emailTemplate,
          },
        })
      )
      .then(setRequestStatus("matched"))
      .then(setOpenAcceptModal(false));
    console.log("This is the updated status: matched");
    
    try{
      await createConversation();
    }
    catch(error){
      console.error("Error creating conversation: ", error);
    }

  };

  /** Function to send an email everytime the decline button is clicked */
  const handleDecline = async () => {
    // Sender: Requester
    // Target: Insider
    const emailTemplate = DeclinedEmailTemplate(
      requestData.name,
      insiderInfo.name,
      requestData.services
    );

    try {
      // Adds a new mail document
      const mailDocRef = await addDoc(collection(db, "mail"), {
        to: insiderInfo.email,
        message: {
          subject: "Service request no longer needed",
          html: emailTemplate,
        },
      });
      // console.log(insiderInfo);

      // Get the request info from Firebase using the request ID
      const requestDocRef = doc(db, "request", requestData.id);

      // Update the Insider ID from the request data and change status to "matching"
      const removeInsider = await updateDoc(requestDocRef, {
        insider: null,
        status: "matching",
      });
      setRequestStatus("matching");
    } catch (error) {
      // Error sending mail
    }
  };

  // Component render
  return (
    <>
      <div className={styles.modal__container}>
        <div className={styles.modal}>
          <div className={styles.modal_header}>
            <div className={styles.modal_container_button}>
              <button onClick={() => setOpenAcceptModal(false)}>
                <strong>X</strong>
              </button>
            </div>
            <h3 className={styles.header_title}>
              <strong>An Insider has decided to take on your request!</strong>
            </h3>
          </div>
          <div className={styles.modal_body}>
            <div className={styles.image_container}>
              {/* <Avatar /> */}
              <AvatarSVGWithImage imageURL={insiderInfo?.profile_image} />
            </div>
            <div className={styles.details_container}>
              <div className={styles.name}>{insiderInfo?.name}</div>
              <div className={styles.company_name}>Your Desired Company: {requestData.desired_company}</div>
              <div className={styles.designation}>Your Desired Role: {requestData.desired_role}</div>
              <div className={styles.social}>
                <span>
                  <LinkedInLogo />
                </span>
                <span
                  style={{
                    padding: "10px",
                    marginTop: "auto",
                    textDecoration: "underline",
                  }}
                >
                  <a href="www.linkedin.com" target="_blank">
                    View Linkedin
                  </a>
                </span>
              </div>
            </div>
          </div>
          <div className={styles.actions}>
            <button
              className={styles.approve_button}
              onClick={updateRequestInsiderStatus}
            >
              Approve and Pay ↗
            </button>
            <button
              className={styles.decline_button}
              onClick={() => {
                setOpenAcceptModal(false);
                handleDecline();
              }}
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InsiderAcceptModal;
