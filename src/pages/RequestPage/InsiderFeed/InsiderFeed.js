import React, { useEffect, useState } from "react";
import { collection, query, getDocs, doc, updateDoc, where } from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { useAuthState } from "../../../hooks/useAuthState";
import { Navigate } from "react-router-dom";
import {
  InsiderFeedLayout,
  InsiderRequestFeedItem,
  RequestFeedItem,
  GetMatchedModal,
} from "./components";
import Snackbar from "../../../components/Alerts/Snackbar";

/**
 * InsiderFeed component
 * @description
 * This component is the main component for the insider feed page.
 * It fetches the requests from the database and displays them in the feed.
 * It also handles the logic for the get matched modal.
 */
const InsiderFeed = () => {
  const { isAuthenticated } = useAuthState();

  // Firebase collections - request
  const allRequests = collection(db, "request");
  // State
  const [requests, setRequests] = useState([]);
  const [tab, setTab] = useState("feed");
  const [openModal, setOpenModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);

  // TODO(huiru): add update request to matched if requester accepts
  // update request status to pending
  const setPendingRequest = async (requestId) => {
    const docRef = doc(db, "request", requestId);

    // Set the "status" field of the request to "pending"
    await updateDoc(docRef, { status: "pending" });

    // Optimistically update local state to reflect the change
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId ? { ...request, status: "pending" } : request
      )
    );
  };

  // open the get matched modal if the user clicks on the "Get Matched" button
  const handleClickGetMatched = (contacts) => {
    setSelectedRequest(contacts);
    setOpenModal(true);
  };

  // toggle the snackbar
  const handleSnackbarToggle = () => {
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
    }, 10000);
  };

  // fetch the requests from the database based on the tab
  const fetchRequests = async () => {
    let q;

    // check current tab
    if (tab === "feed") {
      // fetch all requests that are waiting to be matched
      q = query(allRequests, where("status", "==", "matching"));
    } else {
      // fetch all requests that belong to the current insider
      q = query(allRequests, where("status", "!=", "matching"));
    }

    // get the query snapshot
    const querySnapshot = await getDocs(q);
    const requestsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    let filteredAndSortedRequests;

    if (tab !== "feed") {
      // filter and sort the requests based on the tab
      const user = auth.currentUser;
      const uid = user.uid;
      filteredAndSortedRequests = requestsData
        .filter((request) => request.insider === uid)
        .sort((a, b) => b.createdAt - a.createdAt);
    } else {
      // sort the requests based on the tab
      filteredAndSortedRequests = requestsData.sort((a, b) => b.createdAt - a.createdAt);
    }
    // set the requests state
    setRequests(filteredAndSortedRequests);
  };

  // fetch the requests when the tab changes
  useEffect(() => {
    fetchRequests();
  }, [tab]);

    // Checks for authentication. Redirects to homepage if not
    if (!isAuthenticated) {
      return <Navigate replace to="/" />;
    }
  

  return (
      <InsiderFeedLayout tab={tab} setTab={setTab}>
        {showSnackbar && (
          <Snackbar
            text="Your action was successful!"
            onClose={() => setShowSnackbar(false)}
          />
        )}
        <div className="itemsContainer">
          {/* map over requests for feed tab */}
          {tab === "feed" && requests.map((request) => (
            <RequestFeedItem
              key={request.id}
              requestData={request}
              handleClickGetMatched={handleClickGetMatched}
            />
          ))}
          {/* render in-progress requests for the in progress tab */}
          {tab !== "feed" && requests.map((request) => (
            <InsiderRequestFeedItem
              key={request.id}
              requestData={request}
              handleClickGetMatched={handleClickGetMatched}
            />
          ))}
        </div>
        {selectedRequest && (
          <GetMatchedModal
            open={openModal}
            setOpenModal={setOpenModal}
            userContacts={selectedRequest}
            handleSnackbarToggle={handleSnackbarToggle}
            handleClickGetMatched={handleClickGetMatched}
            setPendingRequest={setPendingRequest}
          />
        )}
      </InsiderFeedLayout>
  );
};

export default InsiderFeed;
