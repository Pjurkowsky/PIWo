import Explore from "../views/Explore";

import { useEffect, useState } from "react";
import { getHotels, getMyHotels } from "../services/hotelService";
import { Hotel } from "../data";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function Find({ myOffers = false }) {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const { user } = useContext(AuthContext);
  console.log("asdas");
  useEffect(() => {
    const fetchHotels = async () => {
      console.log("asdas");
      if (!myOffers) {
        const hotels = await getHotels();
        setHotels(hotels);
      } else {
        if (!user) return;
        const hotels = await getMyHotels(user);
        setHotels(hotels);
      }
    };
    fetchHotels();
  }, [user]);

  return (
    <>
      <section className="pt-24 h-auto mb-6 w-full m-auto px-8 ">
        <article className="flex flex-col justify-end gap-y-12 ">
          <p className="font-[Italiana] text-7xl">
            Your tranquillity oasis awaits
          </p>
        </article>
      </section>
      <Explore hotels={hotels} viewOfferActive={true} />
    </>
  );
}

export default Find;
