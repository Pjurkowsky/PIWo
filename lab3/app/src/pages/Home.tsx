import Explore from "../views/Explore";
import Introduction from "../views/Introduction";
import Rent from "../views/Rent";

import { hotels } from "../data";

function Home() {
  return (
    <>
      <Introduction />
      <Explore hotels={hotels} viewOfferActive={false} />
      <Rent />
    </>
  );
}

export default Home;
