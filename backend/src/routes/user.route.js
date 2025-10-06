import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  acceptFriendRequest,
  getFriendsRequests,
  getMyFriends,
  getOutgoingFriendsReqs,
  getRecommendedUsers,
  sendFriendRequest,
} from "../controllers/user.controller.js";

const router = express.Router();

//apply auth middleware to all routes
router.use(protectRoute);

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

// Friend request routes
// Send a friend request
router.post("/friend-request/:id", sendFriendRequest);

// Accept a friend request (support both POST - legacy & PUT - preferred)
router.post("/friend-request/:id/accept", acceptFriendRequest); // legacy
router.put("/friend-request/:id/accept", acceptFriendRequest); // preferred by frontend

// Incoming friend requests (correct path expected by frontend)
router.get("/friend-requests", getFriendsRequests);
// Outgoing friend requests
router.get("/outgoing-friend-requests", getOutgoingFriendsReqs);

// (Removed incorrect '/friends-requests' path that caused 404)

export default router;
