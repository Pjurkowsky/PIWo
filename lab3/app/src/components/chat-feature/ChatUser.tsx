function ChatUser({ user, setTo, set }) {
  return (
    <div
      className={`flex flex-row w-full h-16 gap-4 mt-5 hover:bg-slate-500 border-2 rounded-full p-4 ${
        set == user.uid ? "bg-slate-500" : ""
      }`}
      onClick={() => setTo(user.uid)}
    >
      <div className="flex flex-col justify-center">
        <p>{user.email}</p>
      </div>
      <div className="flex flex-col"></div>
    </div>
  );
}

export default ChatUser;
