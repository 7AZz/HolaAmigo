import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import { Link } from "react-router";
import { MapPinIcon } from "lucide-react";
import { capitialize } from "../lib/utils";
import { getLanguageFlag } from "../components/FriendCard";

const FriendsPage = () => {
  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (friends.length === 0) {
    return (
      <div className="p-8 flex flex-col items-center gap-4">
        <p className="opacity-70">You haven't added any friends yet.</p>
        <Link to="/" className="btn btn-primary btn-sm">
          Find Friends
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Your Friends
          </h2>
          <Link to="/notifications" className="btn btn-outline btn-sm">
            Notifications
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {friends.map((friend) => (
            <div
              key={friend._id}
              className="card bg-base-200 p-5 space-y-4 border border-base-300/40"
            >
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="w-14 rounded-full">
                    <img src={friend.profilePic} alt={friend.fullName} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base truncate">
                    {friend.fullName}
                  </h3>
                  {friend.location && (
                    <div className="flex items-center text-[11px] opacity-70 gap-1 mt-0.5">
                      <MapPinIcon className="size-3" /> {friend.location}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {friend.nativeLanguage && (
                  <span className="badge badge-secondary font-normal text-[11px] flex items-center gap-1">
                    {getLanguageFlag(friend.nativeLanguage)}
                    Native: {capitialize(friend.nativeLanguage)}
                  </span>
                )}
                {friend.learningLanguage && (
                  <span className="badge badge-outline font-normal text-[11px] flex items-center gap-1">
                    {getLanguageFlag(friend.learningLanguage)}
                    Learning: {capitialize(friend.learningLanguage)}
                  </span>
                )}
              </div>

              <Link
                to={`/chat/${friend._id}`}
                className="btn btn-outline btn-sm w-full normal-case"
              >
                Message
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
