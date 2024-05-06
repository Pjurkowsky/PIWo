import arrow from "../assets/Arrow.svg";
import heroSmall1 from "../assets/heroSmall1.jpeg";
import heroSmall2 from "../assets/heroSmall2.jpg";

function Introduction() {
  return (
    <section className="pt-24 h-auto mb-6 w-full m-auto px-8 ">
      <article className="flex flex-col justify-end gap-y-12 ">
        <p className="font-[Italiana] text-7xl">
          Your tranquillity oasis awaits
        </p>
        <p className="text-lg ">
          TranquilTravels is designed to help you find a serene retreat for your
          next holidays. With us searching for the hotels nestled amidst
          picturesque landscapes is easier than ever.
        </p>
        <div className="flex flex-col w-full lg:gap-x-6 gap-y-4 justify-between">
          <div
            className="w-full rounded-small h-[150px] bg-no-repeat bg-right bg-cover flex flex-col justify-end items-start p-4 "
            style={{ backgroundImage: `url(${heroSmall1})` }}
          >
            <p className="bg-white py-2 px-4 rounded-small flex flex-row justify-center items-center gap-x-2">
              New hotels <img src={arrow} alt="New hotels" />
            </p>
          </div>
          <div
            className="w-full rounded-small h-[150px] bg-no-repeat bg-right bg-cover flex flex-col justify-end items-start p-4"
            style={{ backgroundImage: `url(${heroSmall2})` }}
          >
            <p className="bg-white py-2 px-4 rounded-small flex flex-row justify-center items-center gap-x-2">
              Best reviews <img src={arrow} alt="Best reviews" />
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}

export default Introduction;
