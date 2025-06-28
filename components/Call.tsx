"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BlandWebClient } from "bland-client-js-sdk";
import { Mic } from "lucide-react";
import axios from "axios";
import OrderDetail from "./OrderDetail";
import { useSession } from "next-auth/react";

const Call = () => {
  const [isCalling, setIsCalling] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [blandClient, setBlandClient] = useState<BlandWebClient | null>(null);
  const [sessionToken, setSessionToken] = useState<string>("");
  const [callID, setCallID] = useState("");
  const [callDetails, setCallDetails] = useState<{
    symbol: string;
    quantity: string;
    exchange_platform: string;
  } | null>(null);

  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  if (isMounted === false) {
    return;
  }

  // Replace with your actual agent ID
  // Replace with your session token

  const agentId = process.env.NEXT_PUBLIC_AGENT_ID;

  if (!agentId) {
    throw new Error("AGENT_ID environment variable is not defined");
  }

  const getLatestCall = async (sid: String) => {
    try {
      const response = await axios.get(
        `https://otc-bland.vercel.app/api/latest-call?sid=${sid}`
      );
      setCallDetails(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching latest call:", error);
      throw error;
    }
  };
  const startConversation = async () => {
    if (status == "unauthenticated") {
      alert("Please Sign In to use the feature");
      return;
    }
    setIsCalling((prev) => !prev);
    try {
      const res = await axios.post(
        `https://api.bland.ai/v1/agents/${agentId}/authorize`,
        {}, // No body in the original fetch, so pass an empty object
        {
          headers: {
            authorization: process.env.NEXT_PUBLIC_BLAND_API_KEY,
          },
        }
      );
      setSessionToken(res.data.token);
    } catch (err) {
      console.error(err);
    }
    try {
      const client = new BlandWebClient(agentId, sessionToken);
      const uniqueCallId = crypto.randomUUID();

      await client.initConversation({
        sampleRate: 44100,
        callId: uniqueCallId,
      });

      setBlandClient(client);
      setIsConnected(true);
      console.log("Conversation started successfully!");
    } catch (error) {
      console.error("Failed to start conversation:", error);
    }
  };
  const endConversation = async () => {
    setIsCalling((prev) => !prev);
    if (blandClient) {
      try {
        await blandClient.stopConversation();
        setIsConnected(false);
        setBlandClient(null);
        console.log("Conversation ended");
      } catch (error) {
        console.error("Failed to end conversation:", error);
      }
      setIsLoading(true);

      await new Promise(() =>
        setTimeout(async () => {
          try {
            console.log(sessionToken); //check this out later
            
            const latestCall = await getLatestCall(sessionToken);
            setCallDetails(latestCall);
          } catch (e) {
            console.log(e);
          }
        }, 10000)
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mb-8">
      {isCalling ? (
        <Button
          className="bg-red-500 text-white rounded-full h-20 w-20"
          onClick={() => {
            endConversation();
          }}
        >
          {" "}
          <Mic
            className={`size-10 ${isCalling && "animate-bounce"} text-white`}
          />
        </Button>
      ) : (
        <Button
          className={`h-20 w-20 bg-zinc-800 rounded-full ${
            isCalling && "bg-red-600"
          }`}
          onClick={() => {
            startConversation();
          }}
        >
          <Mic
            className={`size-10 ${isCalling && "animate-bounce"} text-white`}
          />
        </Button>
      )}

      <div className="mt-4 text-lg">
        {isCalling ? (
          <span className="text-green-600 font-semibold">
            AI is Active, Click to End Call
          </span>
        ) : (
          <span className="dark:text-gray-500 text-zinc-800">
            Click to Speak and trade{" "}
          </span>
        )}
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        callDetails?.symbol &&
        callDetails?.exchange_platform &&
        callDetails?.quantity && (
          <OrderDetail
            quantity={callDetails.quantity}
            exchange_platform={callDetails.exchange_platform}
            symbol={callDetails.symbol}
          />
        )
      )}
    </div>
  );
};

export default Call;
