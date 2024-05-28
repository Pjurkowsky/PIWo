import arrow from "../assets/Arrow.svg";
import footer from "../assets/footer.jpg";

function Rent() {
  return (
    <section className="flex flex-col-reverse gap-y-4 pb-4 pt-4 h-[35rem] mb-6 w-full m-auto px-8 lg:flex-row lg:gap-10">
      <div
        className="w-full rounded-medium h-[25rem] lg:h-auto bg-no-repeat bg-right bg-cover flex flex-col justify-end items-start p-4"
        style={{ backgroundImage: `url(${footer})` }}
      ></div>
      <article className="flex flex-col h-full justify-center items-start gap-y-3">
        <p className="font-[Italiana] text-7xl">Rent with us!</p>
        <p className="text-lg ">
          If you’re a hotel or an apartament owner who’s looking to reach more
          customers you can now rent your property with TranquilTravels.
        </p>
        <button className="flex flex-row py-2 px-6 bg-transparent outline-none cursor-pointer justify-center items-center gap-x-2 border border-solid border-primaryDark rounded-medium hover:border-hover transition-colors duration-300 hover:text-hover">
          Learn more <img src={arrow} alt="Arrow icon" title="Learn more" />
        </button>
      </article>
    </section>
  );
}

export default Rent;
