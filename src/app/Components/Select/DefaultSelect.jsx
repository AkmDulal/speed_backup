"use client";

function DefaultSelect({ data, onChange }) {
  const handleSelectChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div>
      <select
        className="!bg-[#faf2ed] text-brandColor tracking-[2px] font-[400] text-[14px] py-[10px] px-[25px]"
        onChange={(e) => handleSelectChange(e)}
      >
        {data.map((country, i) => (
          <option key={i} value={country.value}>
            {country.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DefaultSelect;
