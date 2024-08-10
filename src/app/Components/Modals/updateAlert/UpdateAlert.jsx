import PropTypes from "prop-types";
import PrimaryButton from "../../Buttons/PrimaryButton";

const UpdateAlert = ({ text, buttonText, onClick }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center w-2/5 h-1/4">
        <span className="text-lg font-semibold mb-4">{text}</span>
        <PrimaryButton
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          label={buttonText}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

UpdateAlert.propTypes = {
  text: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default UpdateAlert;
