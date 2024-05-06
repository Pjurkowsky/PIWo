import Explore from "../views/Explore";

import { hotels } from "../data";

function Find() {
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
