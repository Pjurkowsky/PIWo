import arrow from "../assets/Arrow.svg";
import heroSmall1 from "../assets/heroSmall1.jpeg";
import heroSmall2 from "../assets/heroSmall2.jpg";
import hero from "../assets/hero.jpg";

function Introduction() {
  return (
    <section className="pt-24 h-auto mb-6 w-full m-auto px-8 ">
      <article className="lg:flex lg:flex-row">
        <div className="flex flex-col  gap-y-12 justify-end lg:justify-between">
          <div className="flex flex-col lg:mt-[16rem]">
            <p className="font-[Italiana] text-6xl ">
              Your tranquillity oasis awaits
            </p>
            <p className="text-lg lg:mt-[10rem]">
              TranquilTravels is designed to help you find a serene retreat for
              your next holidays. With us searching for the hotels nestled
              amidst picturesque landscapes is easier than ever.
            </p>
          </div>
          <div className="flex flex-col w-full lg:gap-x-6 gap-y-4  lg:flex-row">
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
        </div>
        <div
          className="hidden lg:block lg:w-full lg:h-[64rem] bg-no-repeat bg-right bg-cover rounded-small lg:ml-6 mt-6 lg:mt-0"
          style={{ backgroundImage: `url(${hero})` }}
        ></div>
      </article>
    </section>
  );
}

export default Introduction;
