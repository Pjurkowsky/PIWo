import { NavLink } from "react-router-dom";
import arrow from "../assets/Arrow.svg";
import { Hotel } from "../data";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Explore({
  hotels,
  viewOfferActive = false,
}: {
  hotels: Hotel[];
  viewOfferActive: boolean;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.price.toString().includes(searchTerm) ||
      hotel.stars.toString().includes(searchTerm)
  );

  return (
    <section className="bg-neutral flex flex-col pt-24 pb-24 gap-y-8 justify-center items-center">
      <p className="font-[Italiana] text-3xl">Explore the hotels</p>
      <input
        className="w-[60%] p-4 rounded-medium border border-solid border-primaryDark bg-transparent text-center focus:outline-1 focus:outline-solid focus:border-hover transition-colors duration-300"
        placeholder="Search by hotel name, place etc."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <section className="flex flex-col pt-16 h-auto w-full m-auto px-8 gap-y-4 lg:flex-row lg:gap-10 ">
        {filteredHotels.map((hotel: Hotel) => (
          <article
            className="bg-white rounded-medium p-4 flex flex-col gap-y-8 lg:w-[30%]"
            key={hotel.id}
          >
            <div
              className="w-full rounded-small h-[150px] bg-no-repeat bg-right bg-cover flex flex-row justify-between items-end p-4 "
              style={{ backgroundImage: `url(${hotel.image})` }}
            >
              <p className="bg-white py-2 px-4 rounded-small flex flex-row gap-x-2">
                {hotel.location}
              </p>
              {viewOfferActive && (
                <p className="bg-white py-2 px-4 rounded-small flex flex-row  gap-x-2">
                  <FontAwesomeIcon icon={faHeart} />
                </p>
              )}
            </div>
            <p className="text-lg">{hotel.name}</p>
            <p className="text-balance test-jusify leading-6">
              {hotel.description}
            </p>
            <div className="flex flex-row justify-between">
              <p className="text-lg">
                {Array.from({ length: hotel.stars }).map(() => "★")}
              </p>
              <p className="text-lg">{hotel.price}€/room</p>
            </div>
            {viewOfferActive && (
              <NavLink
                to={`/hotel/${hotel.id}`}
                className="flex flex-row py-2 px-6 outline-none cursor-pointer justify-center items-center gap-x-1 bg-primaryLight rounded-medium hover:bg-hover hover:text-neutral transition-colors duration-300"
              >
                View offer
                <img src={arrow} alt="Arrow icon" title="Find more" />
              </NavLink>
            )}
          </article>
        ))}
      </section>

      {!viewOfferActive && (
        <NavLink
          to="/find"
          className="flex flex-row py-2 px-6 bg-transparent outline-none cursor-pointer justify-center items-center gap-x-2 border border-solid border-primaryDark rounded-medium hover:border-hover transition-colors duration-300 hover:text-hover "
        >
          Find more <img src={arrow} alt="Arrow icon" title="Find more" />
        </NavLink>
      )}
    </section>
  );
}

export default Explore;
