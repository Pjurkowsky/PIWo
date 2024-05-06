import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import type { Hotel } from "../data";
import { hotels } from "../data";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import ContactModal from "../components/ContactModal";

function Hotel() {
  const { id } = useParams();
  const hotel: Hotel | undefined = hotels.find(
    (hotel) => hotel.id === Number(id)
  );

  const contactModal = useRef<HTMLDialogElement>(null);

  const openContactModal = () => {
    if (contactModal.current) {
      contactModal.current.showModal();
    }
  };

  return hotel ? (
    <>
      <section className="pt-24 w-full h-screen flex flex-col">
        <p className="m-auto font-[Italiana] text-6xl">{hotel.name}</p>
        <div className="flex flex-col">
          <div
            className="m-auto rounded-large w-[80%] h-[50vh] bg-no-repeat bg-right bg-cover mb-4"
            style={{ backgroundImage: `url(${hotel.image})` }}
          ></div>
          <div className="m-auto w-[80%] flex flex-col gap-2">
            <p>
              <b>Location: </b> {hotel.location}
            </p>
            <p>
              <b>
                Local category:
                {Array.from({ length: hotel.stars }).map(() => "★")}
              </b>
            </p>
            <p>
              <b>Price: {hotel.price}€/room/night</b>
            </p>
            <p>
              <b>Descripton:</b>
            </p>
            <p>{hotel.description}</p>
            <button
              className="w-2/4 flex flex-row py-2 px-4 outline-none cursor-pointer justify-center items-center gap-x-2 bg-primaryLight rounded-medium hover:bg-hover hover:text-neutral transition-colors duration-300"
              onClick={openContactModal}
            >
              Contact <FontAwesomeIcon icon={faEnvelope} />
            </button>
            <div className="flex flex-col lg:flex-row w-full gap-x-6 gap-y-4 justify-between">
              <div
                className="w-full rounded-small h-[150px] bg-no-repeat bg-right bg-cover justify-end items-start p-4"
                style={{ backgroundImage: `url(${hotel.image})` }}
              ></div>
              <div
                className="w-full rounded-small h-[150px] bg-no-repeat bg-right bg-cover justify-end items-start p-4"
                style={{ backgroundImage: `url(${hotel.image})` }}
              ></div>
            </div>
          </div>
        </div>
      </section>
      <ContactModal dialogRef={contactModal} hotelName={hotel.name} />
    </>
  ) : (
    <p>No such Hotel</p>
  );
}

export default Hotel;
