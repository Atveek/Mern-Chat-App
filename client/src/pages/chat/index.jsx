// import React from 'react'

import { useAppStore } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ContactsContainer from "./contacts-container";
// import EmptyChatContainer from "./empty-chat-container";
import ChatContainer from "./chat-container";

function Chat() {
  const navigate = useNavigate();
  const { userInfo } = useAppStore();
  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please setup profile to continue.");
      navigate("/profile");
    }
  }, [userInfo, navigate]);
  return (
    <div className="flex h-[100vh] text-white  overflow-hidden">
      <ContactsContainer />
      {/* <EmptyChatContainer /> */}
      <ChatContainer />
    </div>
  );
}

export default Chat;
