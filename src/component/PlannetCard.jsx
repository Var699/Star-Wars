import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../Style/PlannetCard.css";

const PlannetCard = ({ val }) => {
  const [residents, setResidents] = useState([]);
  const [showResidents, setShowResidents] = useState(false);

  useEffect(() => {
    const fetchResidentsData = async () => {
      try {
        const residentsData = await Promise.all(
          val.residents.map(async (residentUrl) => {
            const response = await fetch(residentUrl);
            if (!response.ok) {
              throw new Error("Failed to fetch");
            }
            return response.json();
          })
        );
        setResidents(residentsData);
      } catch (error) {
        console.error("Error fetching resident data:", error);
      }
    };

    fetchResidentsData();
  }, [val.residents]);

  return (
    <div className="card-container">
      <h3>Planet:</h3>
      <h4 className="card-title">NAME: {val.name}</h4>
      <h4 className="card-title">CLIMATE: {val.climate}</h4>
      <h4 className="card-title">POPULATION: {val.population}</h4>
      <h4 className="card-title">TERRAIN: {val.terrain}</h4>
      {residents.length > 0 && (
        <div>
          <button
            className="residents-button"
            onClick={() => setShowResidents(!showResidents)}
          >
            {showResidents ? "Hide Residents" : "Show Residents"}
          </button>
          {showResidents && (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Height</th>
                  <th>Mass</th>
                  <th>Gender</th>
                </tr>
              </thead>
              <tbody>
                {residents.map((resident, index) => (
                  <tr key={index}>
                    <td>{resident.name}</td>
                    <td>{resident.height}</td>
                    <td>{resident.mass}</td>
                    <td>{resident.gender}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

PlannetCard.propTypes = {
  val: PropTypes.shape({
    name: PropTypes.string.isRequired,
    climate: PropTypes.string.isRequired,
    population: PropTypes.string.isRequired,
    terrain: PropTypes.string.isRequired,
    residents: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default PlannetCard;
