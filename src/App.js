import fetch from "cross-fetch";
import React from "react";
import "./App.css";
import { useDebounce } from "use-debounce";
import "antd/dist/antd.css";
import { Select } from "antd";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function App() {
  const [options, setOptions] = React.useState([]);
  const [optionsForSelectAdd, setOptionsForSelectAdd] = React.useState([]);
  const [text, setText] = React.useState("");
  const [seeMore, setSeeMore] = React.useState(false);
  const [showAddSelect, setShowAddSelect] = React.useState(false);
  const [value] = useDebounce(text, 1000);
  const { Option } = Select;

  function onChange(value) {
    console.log("value", value);
    if (value === "SEE_ALL") {
      setSeeMore(true);
    }
  }

  function onChangeAdd(value) {
    setText(value);
  }

  function addSelect() {
    const optionsAdd = optionsForSelectAdd;
    optionsAdd.push(value);
    setOptionsForSelectAdd(optionsAdd);
  }

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val) {
    console.log("search:", val);
  }

  function onSearchForAdd(val) {
    setText(val);
    if (optionsForSelectAdd.includes(val)) {
      setShowAddSelect(false);
    } else {
      setShowAddSelect(true);
    }
  }

  React.useEffect(() => {
    // let active = true;

    (async () => {
      const response = await fetch(
        "https://country.register.gov.uk/records.json?page-size=5000"
      );
      await sleep(1e3); // For demo purposes.
      const countries = await response.json();

      //if (active) {
      setOptions(Object.keys(countries).map((key) => countries[key].item[0]));
      // }
    })();
    // Here we can perform component Unmount
    // return () => {
    //   active = false;
    // };
  }, []);

  console.log(optionsForSelectAdd, "==============");

  return (
    <div className="smart-dropdown-container">
      <div className="dropdown1">
        <h4>Standard Drop-down</h4>
        <Select
          showSearch
          open
          style={{ width: 200 }}
          placeholder="Select a location"
          optionFilterProp="children"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {!seeMore && options
            ? options
                .slice(0, 4)
                .map((optionValue) => (
                  <Option value={optionValue.name}>{optionValue.name}</Option>
                ))
            : options.map((optionValue) => (
                <Option value={optionValue.name}>{optionValue.name}</Option>
              ))}
          {!seeMore ? <Option value="SEE_ALL">See More...</Option> : null}
        </Select>
      </div>
      <div className="dropdown1">
        <h4>Search non existing / Add n Select</h4>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a location"
          optionFilterProp="children"
          onChange={onChangeAdd}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearchForAdd}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {optionsForSelectAdd
            ? optionsForSelectAdd.map((optionValue) => (
                <Option value={optionValue}>{optionValue}</Option>
              ))
            : null}
        </Select>
        {showAddSelect ? (
          <button onClick={addSelect}>Add and Select</button>
        ) : null}
      </div>
    </div>
  );
}
