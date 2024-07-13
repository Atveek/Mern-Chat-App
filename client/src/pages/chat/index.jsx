// import React from 'react'

import { useAppStore } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Chat() {
  const navigate = useNavigate();
  const { userInfo } = useAppStore();
  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please setup profile to continue.");
      navigate("/profile");
    }
  }, [userInfo, navigate]);
  return <div>Chat</div>;
}

export default Chat;
