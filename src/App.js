import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const data_url =
  "https://react-corso-api.netlify.app/.netlify/functions/holiday";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(data_url)
      .then((response) => {
        // console.log(response);
        if (response.data.success) {
          setData(response.data.data);
          setIsLoading(false);
          // console.log(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const nextItem = () => {};

  const prevItem = () => {};

  const formattedPrice = (price) => {
    return (price / 100).toFixed(2);
  };

  return (
    <div className="App bg-dark h-screen">
      <div className="container-sm py-5 ">
        <div className="mb-5">
          <h1 className="text-center fw-bold text-capitalize text-light">
            Le nostre vacanze
          </h1>
          <hr className="w-25 mx-auto border-3 border-info"></hr>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-8">
            {!isLoading && (
              <>
                {data.map((item, index) => {
                  return (
                    <div
                      className={
                        index === 0
                          ? "card border-0 rounded-2 shadow bg-dark"
                          : "card border-0 rounded-2 shadow bg-dark hidden"
                      }
                      key={item.id}
                    >
                      <img
                        className="card-img-top rounded-2"
                        src={item.img}
                        alt={item.titolo}
                      ></img>
                      <div className="card-body p-4 rounded-2 bg-dark text-light">
                        <h5 className="fw-bold">{item.titolo}</h5>
                        <p className="text-secondary">{item.descrizione}</p>
                        <div className="d-flex align-items-start justify-content-between w-100">
                          <div className="d-flex flex-column align-items-center justify-content-between gap-3 ">
                            <span>{item.durata}</span>
                            <button
                              type="button"
                              className="btn btn-info rounded-pill px-4"
                            >
                              <FontAwesomeIcon
                                icon={faArrowLeft}
                              ></FontAwesomeIcon>
                            </button>
                          </div>
                          <div className="d-flex flex-column align-items-center justify-content-between gap-3 ">
                            <span className="text-info fw-semibold ">
                              {formattedPrice(item.prezzo)} €
                            </span>
                            <button
                              type="button"
                              className="btn btn-info rounded-pill px-4"
                            >
                              <FontAwesomeIcon
                                icon={faArrowRight}
                              ></FontAwesomeIcon>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
            {isLoading && (
              <>
                <h1>loading ...</h1>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
