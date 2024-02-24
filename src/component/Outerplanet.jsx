import { useEffect, useState } from "react";
import PlannetCard from "./PlannetCard";
import "../Style/Outerplanet.css";

const Outerplanet = () => {
  const [isdata, setIsdata] = useState([]);
  const [nextpage, setNextpage] = useState("");
  const [prevpage, setPrevpage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData("https://swapi.dev/api/planets/?format=json");
  }, []);

  const fetchData = async (URL) => {
    setLoading(true);
    const response = await fetch(URL);
    const data = await response.json();
    setIsdata(data.results);
    setNextpage(data.next);
    setPrevpage(data.previous);
    setLoading(false);
  };

  const handlePageChange = async (page) => {
    setLoading(true);
    const response = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
    const data = await response.json();
    setIsdata(data.results);
    setCurrentPage(page);
    setNextpage(data.next);
    setPrevpage(data.previous);
    setLoading(false);
  };

  return (
    <div className="outer-planet">
      <div className="planet-cards">
        {isdata && isdata.map((val, i) => <PlannetCard key={i} val={val} />)}
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!prevpage || loading}
        >
          {"<<"}
        </button>
        {[...Array(5)].map((_, index) => {
          const page = currentPage + index - 2;
          return (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={page === currentPage ? "active" : ""}
              disabled={page <= 0 || page > 7 || loading}
            >
              {page}
            </button>
          );
        })}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!nextpage || loading}
        >
          {">>"}
        </button>
      </div>
      {loading && <div className="loader"></div>}
    </div>
  );
};

export default Outerplanet;
