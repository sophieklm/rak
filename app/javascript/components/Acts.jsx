import React from "react";
import { useNavigate } from "react-router-dom";
import Act from "./Act";
import Select from "react-select";

const filterOptions = [
  { value: "all", label: "All" },
  { value: "saved", label: "Saved" },
  { value: "completed", label: "Completed" },
  { value: "unsaved", label: "Not Saved" },
  { value: "uncompleted", label: "Not Completed" },
];

const Acts = (props) => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = React.useState(null);
  const { acts, user, showSuggested } = props;
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  const filterActs = (selectedFilter) => {
    if (!selectedFilter) return acts;
    switch (selectedFilter.value) {
      case "saved":
        return acts.filter((act) => {
          const userAct = user?.user_acts?.find(
            (userAct) => userAct.act_id === act.id
          );
          return userAct;
        });
      case "unsaved":
        return acts.filter((act) => {
          const userAct = user?.user_acts?.find(
            (userAct) => userAct.act_id === act.id
          );
          return !userAct;
        });
      case "completed":
        return acts.filter((act) => {
          const completions = user?.completions?.filter(
            (completion) =>
              completion.act_id === act.id && completion.user_id === user.id
          );
          return completions?.length > 0;
        });
      case "uncompleted":
        return acts.filter((act) => {
          const completions = user?.completions?.filter(
            (completion) =>
              completion.act_id === act.id && completion.user_id === user.id
          );
          return completions?.length === 0;
        });
      default:
        return acts;
    }
  };

  const unsavedActs = filterActs("unsaved");

  const suggestedAct =
    unsavedActs[Math.floor(Math.random() * unsavedActs.length)];

  const actsToShow = showSuggested
    ? [suggestedAct]
    : searchTerm
    ? searchResults
    : filterActs(selectedFilter);

  const sortedActs = actsToShow.sort((a, b) =>
    a.created_at < b.created_at ? 1 : -1
  );

  const getSearchResults = (searchTerm) => {
    setSearchTerm(searchTerm);
    console.log(searchTerm);
    fetch(`/api/v1/search?q=${searchTerm}`)
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.json();
        }
        throw new Error("Network error");
      })
      .then((res) => {
        console.log(res);
        setSearchResults(res);
      })
      .catch(() => navigate("/"));
  };

  return (
    <main className="container d-flex flex-column gap-4 justify-content-center align-items-center">
      <div className="d-flex flex-row gap-4 fill-width justify-content-center">
        {!showSuggested && (
          <input
            className=" col-md-2 rounded border-info"
            value={searchTerm}
            onChange={(e) => getSearchResults(e.target.value)}
            type="text"
            placeholder="Search..."
          />
        )}
        {!showSuggested && user && (
          <Select
            defaultValue={selectedFilter}
            onChange={setSelectedFilter}
            options={filterOptions}
            className="col-md-2 rounded border-info h-full"
            placeholder="Filter"
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderRadius: "0.25rem",
                borderColor: "#0DCAF0",
              }),
              valueContainer: (baseStyles, state) => ({
                ...baseStyles,
                minHeight: "inherit",
              }),
            }}
          />
        )}
      </div>
      <div className="row col-md-6">
        {sortedActs.map((act) => (
          <div key={act.id}>
            <Act act={act} user={user} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Acts;
