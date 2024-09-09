"use client";

import React from "react";
import { useEffect, useState, useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SendHorizonalIcon, Mic } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import LoadingText from "./LoadingText";

interface Message {
  sender: string;
  text: string;
}
interface ChatProps {
  className?: string;
}

const Chat = ({ className }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("wss://cmheath.com/chat");

    socket.onopen = () => {
      // console.log("Connected to WebSocket server");
    };

    socket.onmessage = (event) => {
      const newMessage = {
        sender: "Bot",
        text: event.data,
      };
      setIsLoading(false);

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.onclose = () => {
      // console.log("Disconnected from WebSocket server");
    };

    socket.onerror = (error) => {
      // console.log("WebSocket error:", error);
    };

    //@ts-ignore
    setSocket(socket);

    return () => {
      socket.close();
    };
  }, []);

  // Make sure Scrolls to Bottom
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo(0, ref.current.scrollHeight);
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [messages]);

  // Send Message back to WebSocket

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isLoading || !message.trim()) return;
      sendMessage();
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message.trim()); // Trim the message before sending
      const newMessage = {
        sender: "You",
        text: message.trim(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage(""); // Clear the input field after sending the message
      setIsLoading(true);
    } else {
      console.log("WebSocket connection is not open");
    }
  };

  return (
    <div className={`${className}`}>
      <ScrollArea ref={ref} className={`h-[calc(100vh-11rem)]  `}>
        <div className="flex flex-col h-full w-full items-center">
          {messages.map((m) => (
            <div
              key={m.text}
              // className="my-6 whitespace-pre-wrap mx-6 w-11/12 max-w-5xl"
              className="my-12 whitespace-pre-wrap mx-6 w-10/12 "
            >
              {m.sender === "You" && (
                <div className="mb-6 flex gap-3 justify-end text-right ">
                  {/* <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback className="text-sm">U</AvatarFallback>
                      </Avatar> */}
                  <div className=" ">
                    {/* <p className="font-semibold">You</p> */}
                    <div className=" text-sm text-zinc-500 bg-slate-200 rounded-xl px-5 py-3">
                      {m.text}
                    </div>
                  </div>
                </div>
              )}
              {m.sender === "Bot" && (
                <div className="mb-6 flex gap-3">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-emerald-500 text-white text-xs">
                      AI
                    </AvatarFallback>
                  </Avatar>
                  <div className="mt-1.5">
                    <p className="font-semibold">Bot</p>
                    <div className="mt-1.5 text-sm text-zinc-500 ">
                      {m.text}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="my-12 whitespace-pre-wrap mx-6 w-10/12">
              <div className="mb-6 flex gap-3">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-emerald-500 text-white text-xs">
                    AI
                  </AvatarFallback>
                </Avatar>
                <div className="mt-1.5">
                  <p className="font-semibold">Bot</p>
                  <div className="mt-1.5 text-sm text-zinc-500">
                    <LoadingText text="....." speed={400} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="flex flex-col justify-center items-center gap-2 ">
        <form onSubmit={onSubmit} className="max-w-4xl w-11/12 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me anything"
            className="w-full pl-12 pr-12 h-12 rounded-xl  placeholder:italic placeholder:text-zinc-600"
          />
          <Button
            size="icon"
            type="button"
            variant="ghost"
            className="absolute left-1 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-xl"
          >
            <Mic className="h-5 w-5 text-gray-500" />
          </Button>
          <Button
            size="icon"
            type="submit"
            variant="ghost"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-xl"
          >
            <SendHorizonalIcon className="h-5 w-5 text-gray-500" />
          </Button>
        </form>
        <div className="text-xs font-light mb-1">
          Not to be used in emergencies
        </div>
      </div>

      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default Chat;
