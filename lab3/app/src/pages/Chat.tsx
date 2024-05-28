import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import ChatUser from "../components/chat-feature/ChatUser";
import { firestore } from "../fbconfig";
import { useDebounce } from "use-debounce";

import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  Unsubscribe,
  serverTimestamp,
  addDoc,
  where,
  getDocs,
} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { UserInfo } from "firebase/auth";

type Message = {
  id: string;
  uid: string;
  text: string;
  createdAt: number;
};

function Chat() {
  const [messages, setMessages] = useState([] as Message[]);
  const { user } = useContext(AuthContext);
  const input = useRef<HTMLInputElement>(null);
  const [users, setUsers] = useState([] as UserInfo[]);
  const [to, setTo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [value] = useDebounce(searchTerm, 1000);
  useEffect((): Unsubscribe => {
    const q = query(
      collection(firestore, "messages"),
      where("from", "in", [user?.uid, to]),
      where("to", "in", [user?.uid, to]),
      orderBy("createdAt", "desc"),
      limit(50)
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages: Message[] = [];
      QuerySnapshot.forEach((doc) => {
        const data = doc.data() as Message;
        fetchedMessages.push({ ...data, id: doc.id });
      });
      console.log(fetchedMessages);
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    });
    return () => unsubscribe;
  }, [to]);

  useEffect(() => {
    const fetchData = async () => {
      const usersRef = collection(firestore, "users");
      const q = query(usersRef);
      const results = await getDocs(q);
      const fetchedUsers: UserInfo[] = [];
      results.forEach((doc) => {
        if (doc.data().uid !== user?.uid) {
          fetchedUsers.push(doc.data() as UserInfo);
        }
      });
      setUsers(fetchedUsers);
    };
    fetchData();
  }, []);

  const sendMessage = async (event: FormEvent<EventTarget>) => {
    event.preventDefault();
    const message = input.current?.value;
    if (!message || message.trim() === "") {
      alert("Enter valid message");
      return;
    }

    const { uid, displayName } = user as UserInfo;
    await addDoc(collection(firestore, "messages"), {
      text: message,
      name: displayName,
      createdAt: serverTimestamp(),
      from: uid,
      to,
    });
    input.current!.value = "";
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div className="flex w-screen h-screen bg-gray-100 mt-[88px] ">
      <div className="h-screen flex flex-col bg-white w-[30%] px-5">
        <input
          className="w-full mt-2 p-1 rounded-medium border border-solid border-primaryDark bg-transparent text-center focus:outline-1 focus:outline-solid focus:border-hover transition-colors duration-300"
          placeholder="Search by name, email, etc."
          onChange={handleSearchChange}
        />
        {filteredUsers.map((user) => (
          <ChatUser key={user.uid} user={user} setTo={setTo} set={to} />
        ))}
      </div>
      <div className="flex flex-col w-full justify-between">
        <div className="flex flex-col px-64 py-4 w-full gap-4">
          {messages?.map((message) => (
            <div
              key={message.id}
              className={`h-10  rounded-full text-white text-lg px-4 ${
                message.to == user?.uid
                  ? "mr-auto bg-blue-700"
                  : "bg-blue-300 ml-auto"
              }  `}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="flex justify-center w-full mb-28 gap-4">
          <input
            className="w-3/4 h-12 rounded-full border-2 border-gray-300 p-4"
            placeholder="Type a message"
            ref={input}
          />
          <button
            className="h-12 w-12 bg-blue-700 rounded-full text-white"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
