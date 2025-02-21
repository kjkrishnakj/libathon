import { useEffect, useState } from "react";
import CountUp from "react-countup";

const Stats = () => {
  const [totalBooks, setTotalBooks] = useState(0);
  const [issuedBooks, setIssuedBooks] = useState(0);
  const [eBooks, setEBooks] = useState(0);
  const [bookreq, setBookreq] = useState(0);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/totalBooks`)
      .then((res) => res.json())
      .then((data) => setTotalBooks(data.totalBooks))
      .catch((err) => console.error("Error fetching books count:", err));

    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/issuedBooks`)
      .then((res) => res.json())
      .then((data) => setIssuedBooks(data.issuedBooks))
      .catch((err) => console.error("Error fetching issued books count:", err));

    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/totalEbooks`)
      .then((res) => res.json())
      .then((data) => setEBooks(data.eBooks))
      .catch((err) => console.error("Error fetching eBooks count:", err));

    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/totalBookreq`)
      .then((res) => res.json())
      .then((data) => setBookreq(data.bookreq))
      .catch((err) => console.error("Error fetching book requests count:", err));
  }, []);

  return (
    <section className="text-gray-600 bg-gray-200  body-font" style={{borderRadius:"2cm"}}>
      <div className="container px-5 py-5 mx-auto">
  <div className="flex flex-wrap -m-4 text-center">
    <div className="p-4 sm:w-1/4 w-1/2">
      <h2 className="title-font font-medium sm:text-4xl text-3xl text-red-600">
        <CountUp start={0} end={totalBooks} duration={2.5} separator="," />
      </h2>
      <p className="leading-relaxed text-red-600">Total Books</p>
    </div>
    <div className="p-4 sm:w-1/4 w-1/2">
      <h2 className="title-font font-medium sm:text-4xl text-3xl text-green-600">
        <CountUp start={0} end={issuedBooks} duration={2.5} separator="," />
      </h2>
      <p className="leading-relaxed text-green-600">Books Issued</p>
    </div>
    <div className="p-4 sm:w-1/4 w-1/2">
      <h2 className="title-font font-medium sm:text-4xl text-3xl text-blue-600">
        <CountUp start={0} end={eBooks} duration={2.5} separator="," />
      </h2>
      <p className="leading-relaxed text-blue-600">eBooks</p>
    </div>
    <div className="p-4 sm:w-1/4 w-1/2">
      <h2 className="title-font  font-medium sm:text-4xl text-3xl text-yellow-500">
        <CountUp start={0} end={bookreq} duration={2.5} separator="," />
      </h2>
      <p className="leading-relaxed  text-yellow-600">Book Requests</p>
    </div>
  </div>
</div>

    </section>
  );
};

export default Stats;
