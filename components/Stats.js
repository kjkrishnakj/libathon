import { useEffect, useState } from "react";

const Stats = () => {
  const [totalBooks, setTotalBooks] = useState(0);
  const [issuedBooks, setIssuedBooks] = useState(0);
  const [eBooks, setEBooks] = useState(0);
  const [bookreq, setBookreq] = useState(0);

  useEffect(() => {
    fetch("/api/totalBooks")
      .then((res) => res.json())
      .then((data) => setTotalBooks(data.totalBooks))
      .catch((err) => console.error("Error fetching books count:", err));

    fetch("/api/issuedBooks")
      .then((res) => res.json())
      .then((data) => setIssuedBooks(data.issuedBooks))
      .catch((err) => console.error("Error fetching issued books count:", err));

    fetch("/api/totalEbooks")
      .then((res) => res.json())
      .then((data) => setEBooks(data.eBooks))
      .catch((err) => console.error("Error fetching eBooks count:", err));
   
      fetch("/api/totalBookreq")
      .then((res) => res.json())
      .then((data) => setBookreq(data.bookreq))
      .catch((err) => console.error("Error fetching eBooks count:", err));
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-5 mx-auto">
        <div className="flex flex-wrap -m-4 text-center">
          <div className="p-4 sm:w-1/4 w-1/2">
            <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">{totalBooks}</h2>
            <p className="leading-relaxed">Total Books</p>
          </div>
          <div className="p-4 sm:w-1/4 w-1/2">
            <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">{issuedBooks}</h2>
            <p className="leading-relaxed">Books Issued</p>
          </div>
          <div className="p-4 sm:w-1/4 w-1/2">
            <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">{eBooks}</h2>
            <p className="leading-relaxed">eBooks</p>
          </div>
          <div className="p-4 sm:w-1/4 w-1/2">
            <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">{bookreq}</h2>
            <p className="leading-relaxed">Book Requests</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
