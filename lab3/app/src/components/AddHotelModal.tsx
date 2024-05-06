import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { hotels } from "../data";
import Card1 from "../assets/cards/cards1.jpg";

function AddHotelModal({
  dialogRef,
}: {
  dialogRef: React.RefObject<HTMLDialogElement>;
}) {
  const closeDialog = () => {
    if (dialogRef.current) dialogRef.current.close();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const hotelName = form.querySelector("#hotelName") as HTMLInputElement;
    const description = form.querySelector("#description") as HTMLInputElement;
    const location = form.querySelector("#location") as HTMLInputElement;
    const price = form.querySelector("#price") as HTMLInputElement;
    const stars = form.querySelector("#stars") as HTMLInputElement;

    hotels.push({
      id: hotels.length,
      name: hotelName.value,
      description: description.value,
      location: location.value,
      price: Number(price.value),
      stars: Number(stars.value),
      image: Card1,
    });
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
      <p className="text-3xl font-[Italiana] mb-4">Add new offer</p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} id="form">
        <div className="flex flex-col lg:flex-row items-center gap-2 ">
          <label htmlFor="hotelName" className="block mb-2 ">
            Hotel name
          </label>
          <input
            id="hotelName"
            className="h-10 rounded-medium border-2 w-5/6  p-4"
            placeholder="Provide the hotel name"
          />
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-2 ">
          <label htmlFor="description" className="block mb-2">
            Description
          </label>
          <input
            id="description"
            className=" h-48 rounded-medium border-2 w-5/6  p-4"
            placeholder="Description"
          />
        </div>
        <div className="flex flex-row gap-x-[8rem] ">
          <div className="flex flex-col lg:flex-row items-center gap-2 ">
            <label htmlFor="location" className="block mb-2">
              Location
            </label>
            <input
              id="location"
              className="border w-full h-10 rounded-medium p-4"
              placeholder="City"
            />
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-2 ">
            <label htmlFor="price" className="block mb-2">
              Price
            </label>
            <input
              id="price"
              className="border w-full h-10 rounded-medium p-4"
              placeholder="Cost per room per night"
            />
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-2 ">
            <label htmlFor="stars" className="block mb-2">
              Local category
            </label>
            <input
              id="stars"
              className="border w-full h-10 rounded-medium p-4"
              placeholder="Max 5 stars, min 1 star"
            />
          </div>
        </div>
      </form>

      <div className="flex justify-end mt-4 gap-x-4">
        <button
          className="flex flex-row py-2 px-6 outline-none cursor-pointer justify-center items-center gap-x-1 bg-primaryLight rounded-medium hover:bg-hover hover:text-neutral transition-colors duration-300"
          onClick={() => closeDialog()}
        >
          Close
        </button>
        <button
          type="submit"
          form="form"
          className="flex flex-row py-2 px-6 outline-none cursor-pointer justify-center items-center gap-x-1 bg-primaryLight rounded-medium hover:bg-hover hover:text-neutral transition-colors duration-300"
          onClick={() => closeDialog()}
        >
          Add
        </button>
      </div>
    </dialog>
  );
}

export default AddHotelModal;
