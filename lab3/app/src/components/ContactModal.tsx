import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faEnvelope } from "@fortawesome/free-solid-svg-icons";

function ContactModal({
  dialogRef,
  hotelName,
}: {
  dialogRef: React.RefObject<HTMLDialogElement>;
  hotelName: string;
}) {
  const closeDialog = () => {
    if (dialogRef.current) dialogRef.current.close();
  };

  return (
    <dialog
      ref={dialogRef}
      className="m-auto fixed inset-0 z-50 p-6 rounded-[2rem] border-4 w-[80%]"
    >
      <button
        className="flex flex-row py-2 px-6 outline-none cursor-pointer justify-center items-center gap-x-1 bg-primaryLight rounded-medium hover:bg-hover hover:text-neutral transition-colors duration-300 ml-auto"
        onClick={() => closeDialog()}
      >
        <FontAwesomeIcon icon={faClose} />
      </button>
      <p className="text-3xl font-[Italiana] mb-4">Contact</p>
      <p className="mb-4">You're contacting the {hotelName} hotel</p>
      <form>
        <input className="border w-full h-96 rounded-medium" />
      </form>

      <div className="flex justify-end mt-4 gap-x-4">
        <button
          className="flex flex-row py-2 px-6 outline-none cursor-pointer justify-center items-center gap-x-1 bg-primaryLight rounded-medium hover:bg-hover hover:text-neutral transition-colors duration-300"
          onClick={() => closeDialog()}
        >
          Close
        </button>
        <button
          className="flex flex-row py-2 px-6 outline-none cursor-pointer justify-center items-center gap-x-1 bg-primaryLight rounded-medium hover:bg-hover hover:text-neutral transition-colors duration-300"
          onClick={() => closeDialog()}
        >
          Send <FontAwesomeIcon icon={faEnvelope} />
        </button>
      </div>
    </dialog>
  );
}

export default ContactModal;
