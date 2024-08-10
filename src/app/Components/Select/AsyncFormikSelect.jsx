/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import { components } from "react-select";
import AsyncSelect from "react-select/async";
import { CiSearch } from "react-icons/ci";
// import {
//   customAutoStyles,
//   customStyles,
//   customStylesLarge,
// } from "../utility/selectCustomStyle";
const AsyncFormikSelect = ({
  selectedValue,
  loadOptions,
  handleChange,
  isDisabled,
  setClear,
  name,
  placeholder,
  isSearchIcon,
  isMulti,
  //   styleMode,
  onChange,
  containerStyles,
}) => {
  const [inputValue, setInputValue] = useState("");

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <CiSearch />
      </components.DropdownIndicator>
    );
  };

  const styles = useMemo();
  // () =>
  //   styleMode === "medium"
  //     ? customStyles
  //     : styleMode === "large"
  //     ? customStylesLarge
  //     : null,
  // [styleMode]

  return (
    <div className="form-container" style={containerStyles}>
      <div className="formik-select-wrapper">
        {isMulti ? (
          <AsyncSelect
            isMulti
            cacheOptions
            defaultOptions
            name={name}
            value={selectedValue}
            loadOptions={loadOptions}
            onChange={onChange}
            // styles={customAutoStyles}
            menuPosition="fixed"
            placeholder={placeholder ? placeholder : "Search (min 3 letter) "}
            isClearable={false}
          />
        ) : (
          <AsyncSelect
            menuPosition="fixed"
            isDisabled={isDisabled}
            isClearable={true}
            defaultOptions
            value={selectedValue}
            getOptionLabel={(e) => e?.label}
            getOptionValue={(e) => e?.value}
            components={isSearchIcon && { DropdownIndicator }}
            loadOptions={(inputValue) => loadOptions(inputValue)}
            onInputChange={(value) => {
              setInputValue(value);
            }}
            onChange={(valueOption) => handleChange(valueOption)}
            // styles={styles || customStyles}
            placeholder={placeholder ? placeholder : "Search (min 3 letter) "}
          />
        )}

        {setClear && (
          <i
            className="fa fa-times-circle async-select-cross-icon"
            onClick={() => {
              setClear(name, "");
            }}
          ></i>
        )}
      </div>
    </div>
  );
};

export default AsyncFormikSelect;
