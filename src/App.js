import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const data_url =
  "https://react-corso-api.netlify.app/.netlify/functions/holiday";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [holidays, setHolidays] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(data_url)
      .then((response) => {
        // console.log(response.data.data);
        if (response.data.success) {
          let { data } = response.data;
          setHolidays(data);
          // console.log(data);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {}, [active]);

  const nextItem = () => {
    if (active + 1 < holidays.length) {
      setActive(active + 1);
    } else {
      setActive(0);
    }
  };

  const prevItem = () => {
    if (active - 1 > 0) {
      setActive(active - 1);
    } else {
      setActive(holidays.length - 1);
    }
  };

  const formattedPrice = (price) => {
    return (price / 100).toFixed(2);
  };

  return (
    <div className="App bg-dark min-vh-100">
      <div className="container-sm py-4 ">
        <div className="mb-5">
          <h1 className="text-center fw-bold text-capitalize text-light">
            Le nostre vacanze
          </h1>
          <hr className="w-25 mx-auto border-3 border-info"></hr>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-8">
            {isLoading && (
              <>
                <h1 className="text-light text-capitalize text-center">
                  loading ...
                </h1>
              </>
            )}
            {!isLoading && (
              <>
                <div
                  className="card border-0 rounded-2 shadow bg-dark"
                  key={holidays[active].id}
                >
                  <img
                    className="card-img-top rounded-2"
                    src={holidays[active].img}
                    alt={holidays[active].titolo}
                  ></img>
                  <div className="card-body p-4 rounded-2 bg-dark text-light">
                    <h5 className="fw-bold">{holidays[active].titolo}</h5>
                    <p className="text-secondary">
                      {holidays[active].descrizione}
                    </p>
                    <div className="d-flex align-items-start justify-content-between w-100">
                      <div className="d-flex flex-column align-items-center justify-content-between gap-3 ">
                        <span>{holidays[active].durata}</span>
                        <button
                          type="button"
                          className="btn btn-info rounded-pill px-4"
                          onClick={prevItem}
                        >
                          <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                        </button>
                      </div>
                      <div className="d-flex flex-column align-items-center justify-content-between gap-3 ">
                        <span className="text-info fw-semibold ">
                          {formattedPrice(holidays[active].prezzo)} €
                        </span>
                        <button
                          type="button"
                          className="btn btn-info rounded-pill px-4"
                          onClick={nextItem}
                        >
                          <FontAwesomeIcon
                            icon={faArrowRight}
                          ></FontAwesomeIcon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
