import { CircularProgress } from "@mui/material";
// import loadingGif from "../../../assets/logos/loader.gif";

function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-5">
      {/* <img className="w-20 h-20" src={loadingGif} alt="Loader" /> */}
      <CircularProgress
        style={{
          color: "#FF6600",
        }}
      />
    </div>
  );
}

export default Loader;
