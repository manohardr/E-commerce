import React, { useState } from "react";
import "./Style.css";
import { useDispatch, useSelector } from "react-redux";
import { FILTERPRODUCTS } from "../redux/actions/Action";

const Filter = () => {
  const [filters, setFilters] = useState({}); // State variable for applied filters

  const filterData = useSelector((state) => state.cartreducer.allData);

  const dispatch = useDispatch();

  const handleFilter = (filter) => {
    const appliedFilters = { ...filters };
    // Handle gender, color, price and type filters
    if (!Array.isArray(appliedFilters[filter.category])) {
      appliedFilters[filter.category] = []; // Initialize as an empty array
    }

    if (filter.checked) {
      // Pushing the value of checked category into appliedFilters
      appliedFilters[filter.category].push(filter.value);
    } else {
      const index = appliedFilters[filter.category].indexOf(filter.value);
      // Removing the value of unchecked category in appliedFilters
      appliedFilters[filter.category].splice(index, 1);

      if (appliedFilters[filter.category].length === 0) {
        delete appliedFilters[filter.category];
      }
    }
    setFilters(appliedFilters); // Update the applied filters state
    dispatch(FILTERPRODUCTS(appliedFilters)); // Dispatch action to update the state
  };

  const handleReset = () => {
    // Dispatch action to reset the filters
    dispatch(FILTERPRODUCTS({ all: true }));

    // Reset the local filters state
    setFilters({});

    // Uncheck all checkboxes
    const checkBoxes = document.querySelectorAll("input[type=checkbox]");
    checkBoxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };
  return (
    <div>
      <button
        className="btn btn-info"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        Filter
      </button>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            Add Filters
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="container-fluid border-top border-success"></div>
        <div className="offcanvas-body">
          <h5>Gender</h5>
          {filterData
            .filter(
              (obj, index, self) =>
                self.findIndex((el) => el.gender === obj.gender) === index
            )
            .map((obj) => (
              <div key={obj.id}>
                <ul>
                  <li className="my-element">
                    <input
                      type="checkbox"
                      id={`gender-${obj.id}`}
                      onChange={(event) =>
                        handleFilter({
                          category: "gender",
                          value: obj.gender,
                          checked: event.target.checked,
                        })
                      }
                    />
                    <label
                      className="mx-2 list-unstyled"
                      htmlFor={`gender-${obj.id}`}
                    >
                      {obj.gender}
                    </label>
                  </li>
                </ul>
              </div>
            ))}

          <h5>Color</h5>
          {filterData
            .filter(
              (col, index, self) =>
                self.findIndex((el) => el.color === col.color) === index
            )
            .map((col) => (
              <div key={col.id}>
                <ul>
                  <li className="my-element">
                    <input
                      type="checkbox"
                      id={`color-${col.id}`}
                      onChange={(event) =>
                        handleFilter({
                          category: "color",
                          value: col.color,
                          checked: event.target.checked,
                        })
                      }
                    />
                    <label
                      className="mx-2 list-unstyled"
                      htmlFor={`color-${col.id}`}
                    >
                      {col.color}
                    </label>
                  </li>
                </ul>
              </div>
            ))}

          <h5>Price</h5>
          <div>
            <ul>
              <li className="my-element">
                <input
                  type="checkbox"
                  id="price-range-1"
                  onChange={(event) =>
                    handleFilter({
                      category: "price",
                      value: "0-250",
                      checked: event.target.checked,
                    })
                  }
                />
                <label className="mx-2 list-unstyled" htmlFor="price-range-1">
                  Rs. 0 - 250
                </label>
              </li>
            </ul>
          </div>

          <div>
            <ul>
              <li className="my-element">
                <input
                  type="checkbox"
                  id="price-range-2"
                  onChange={(event) =>
                    handleFilter({
                      category: "price",
                      value: "250-350",
                      checked: event.target.checked,
                    })
                  }
                />
                <label className="mx-2 list-unstyled" htmlFor="price-range-2">
                  Rs. 250 - 350
                </label>
              </li>
            </ul>
          </div>

          <div>
            <ul>
              <li className="my-element">
                <input
                  type="checkbox"
                  id="price-range-3"
                  onChange={(event) =>
                    handleFilter(
                      {
                        category: "price",
                        value: "350-500",
                        checked: event.target.checked,
                      },
                      event
                    )
                  }
                />
                <label className="mx-2 list-unstyled" htmlFor="price-range-3">
                  Rs. 350 - 500
                </label>
              </li>
            </ul>
          </div>

          <h5>Type</h5>
          {filterData
            .filter(
              (typ, index, self) =>
                self.findIndex((el) => el.type === typ.type) === index
            )
            .map((typ) => (
              <div key={typ.id}>
                <ul>
                  <li className="my-element">
                    <input
                      type="checkbox"
                      id={`type-${typ.id}`}
                      onChange={(event) =>
                        handleFilter(
                          {
                            category: "type",
                            value: typ.type,
                            checked: event.target.checked,
                          },
                          event
                        )
                      }
                    />
                    <label
                      className="mx-2 list-unstyled"
                      htmlFor={`type-${typ.id}`}
                    >
                      {typ.type}
                    </label>
                  </li>
                </ul>
              </div>
            ))}
        </div>
        <div
          className="container-fluid card-footer bg-transparent border-success text-end"
          style={{ height: "80px" }}
        >
          <button
            type="button"
            className="btn btn-info"
            style={{ marginRight: "25px" }}
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
export default Filter;
