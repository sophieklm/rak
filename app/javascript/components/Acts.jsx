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
  const [selectedFilter, setSelectedFilter] = React.useState(null);
  const acts = props.acts;
  const user = props.user;
  const showSuggested = props.showSuggested;

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
    : filterActs(selectedFilter);

  const sortedActs = actsToShow.sort((a, b) =>
    a.created_at < b.created_at ? 1 : -1
  );

  return (
    <main className="container d-flex flex-column gap-4 justify-content-center align-items-center">
      {!showSuggested && user && (
        <Select
          defaultValue={selectedFilter}
          onChange={setSelectedFilter}
          options={filterOptions}
          className="row col-md-2"
          placeholder="Filter"
        />
      )}
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
