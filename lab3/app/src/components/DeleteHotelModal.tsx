import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import { deleteHotel } from "../services/hotelService";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import type { Hotel } from "../data";

function DeleteHotelModal({
  dialogRef,
  hotelToDelete,
}: {
  dialogRef: React.RefObject<HTMLDialogElement>;
  hotelToDelete: Hotel;
}) {
  const { user } = useContext(AuthContext);

  const closeDialog = () => {
    if (dialogRef.current) dialogRef.current.close();
  };

  const handleDelete = async () => {
    if (user) await deleteHotel(hotelToDelete.id);
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
      <p className="text-3xl font-[Italiana] mb-4">Delete offer</p>
      Are you sure you want to delete the offer?
      <div className="flex justify-end mt-4 gap-x-4">
        <button
          className="flex flex-row py-2 px-6 outline-none cursor-pointer justify-center items-center gap-x-1 bg-primaryLight rounded-medium hover:bg-hover hover:text-neutral transition-colors duration-300"
          onClick={() => closeDialog()}
        >
          Close
        </button>
        <button
          type="submit"
          className="flex flex-row py-2 px-6 outline-none cursor-pointer justify-center items-center gap-x-1 bg-primaryLight rounded-medium hover:bg-hover hover:text-neutral transition-colors duration-300"
          onClick={() => handleDelete()}
        >
          Delete
        </button>
      </div>
    </dialog>
  );
}

export default DeleteHotelModal;
