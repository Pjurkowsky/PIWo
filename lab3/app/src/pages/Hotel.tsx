import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import type { Hotel } from "../data";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ContactModal from "../components/ContactModal";
import EditHotelModal from "../components/EditHotelModal";
import DeleteHotelModal from "../components/DeleteHotelModal";
import { getHotel } from "../services/hotelService";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
function Hotel() {
  const { id } = useParams();
  const [hotel, setHotel] = useState<Hotel>();
  const [myOffers, setMyOffers] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchHotel = async () => {
      if (id) {
        const hotel = await getHotel(id);
        setHotel(hotel);
        if (user?.uid === hotel?.userId) {
          setMyOffers(true);
        }
      }
    };
    fetchHotel();
  }, []);

  const contactModal = useRef<HTMLDialogElement>(null);
  const editHotelModal = useRef<HTMLDialogElement>(null);
  const deleteHotelModal = useRef<HTMLDialogElement>(null);

  const openContactModal = () => {
    if (contactModal.current) {
      contactModal.current.showModal();
    }
  };

  const openEditHotelModal = () => {
    if (editHotelModal.current) {
      editHotelModal.current.showModal();
    }
  };

  const openDeleteHotelModal = () => {
    if (deleteHotelModal.current) {
      deleteHotelModal.current.showModal();
    }
  };

  return hotel ? (
    <>
      <section className="pt-24 w-full h-screen flex flex-col lg:flex-row">
        <div className="flex flex-col lg:flex-row w-full  ">
          <div className="w-[100%] h-[50vh] lg:h-[64rem] flex flex-col">
            <p className="m-auto font-[Italiana] text-6xl lg:mb-20 lg:mx-24 ">
              {hotel.name}
            </p>
            <div
              className=" w-[80%] h-[50vh] lg:h-[64rem] m-auto rounded-large  bg-no-repeat bg-right bg-cover mb-4"
              style={{ backgroundImage: `url(${hotel.image})` }}
            ></div>
          </div>
          <div className="m-auto w-[80%] flex flex-col gap-2 lg:h-[64rem] lg:justify-between">
            <div className="flex flex-col gap-4 lg:mt-[10rem]">
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
            </div>
            <div>
              {!myOffers && (
                <button
                  className="w-[10rem] mb-8 flex flex-row py-2 px-4 outline-none cursor-pointer justify-center items-center gap-x-2 bg-primaryLight rounded-medium hover:bg-hover hover:text-neutral transition-colors duration-300"
                  onClick={openContactModal}
                >
                  Contact <FontAwesomeIcon icon={faEnvelope} />
                </button>
              )}
              {myOffers && (
                <div className="flex">
                  <button
                    className="w-2/4 flex flex-row py-2 px-4 outline-none cursor-pointer justify-center items-center gap-x-2 bg-primaryLight rounded-medium hover:bg-hover hover:text-neutral transition-colors duration-300"
                    onClick={openEditHotelModal}
                  >
                    Edit <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="w-2/4 flex flex-row py-2 px-4 outline-none cursor-pointer justify-center items-center gap-x-2 bg-primaryLight rounded-medium hover:bg-hover hover:text-neutral transition-colors duration-300"
                    onClick={openDeleteHotelModal}
                  >
                    Remove <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              )}
              <div className="flex flex-col lg:flex-row w-full gap-x-6 gap-y-4 justify-between mb-2">
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
        </div>
      </section>
      <ContactModal dialogRef={contactModal} hotelName={hotel.name} />
      <EditHotelModal dialogRef={editHotelModal} hotelToEdit={hotel} />
      <DeleteHotelModal dialogRef={deleteHotelModal} hotelToDelete={hotel} />
    </>
  ) : (
    <p>No such Hotel</p>
  );
}

export default Hotel;
