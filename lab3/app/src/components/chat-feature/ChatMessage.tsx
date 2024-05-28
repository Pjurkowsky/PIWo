function ChatMessage({
  message,
  incoming,
}: {
  message: string;
  incoming: boolean;
}) {
  return (<>

    {!incoming && (<div className=" w-[80%] h-16 gap-4 mt-5  bg-blue-600">
      <p>{message}</p>
    </div>)}

    {incoming && (<div className=" w-[80%] h-16 gap-4 mt-5 bg-blue-300">
      <p>{message}</p>
    </div>)}
  );
  </>
}

export default ChatMessage;
