"use client";

import React from "react";
import { useEffect, useState, useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SendHorizonalIcon } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

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
      sendMessage();
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message); // Send the message to the WebSocket server
      const newMessage = {
        sender: "You",
        text: message,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage(""); // Clear the input field after sending the message
    } else {
      console.log("WebSocket connection is not open");
    }
  };

  return (
    <div className={`${className}`}>
      <ScrollArea ref={ref} className={`h-[calc(100vh-11rem)] `}>
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
        </div>
      </ScrollArea>
      <div className="flex flex-col justify-center items-center gap-2">
        <form className="relative max-w-4xl w-11/12" onSubmit={onSubmit}>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me anything"
            className="pr-12 placeholder:italic placeholder:text-zinc-600 h-12"
          />
          <Button
            size="icon"
            type="submit"
            variant="secondary"
            className="absolute right-1 top-1 h-8 w-10"
          >
            <SendHorizonalIcon className="h-5 w-5" />
          </Button>
        </form>
        <div className="text-xs font-light">Not to be used in emergencies</div>
      </div>

      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default Chat;
