"use client";
import { FaArrowLeft } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const DefaultModal = ({
  showModal,
  setShowModal,
  children,
  title,
  isBackButtonActive,
  setShowPreviousModal,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="relative">
      {showModal ? (
        <>
          <Dialog
            fullScreen={fullScreen}
            open={showModal}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            className="p-[10px] "
            // onBackdropClick="false"
          >
            <div className="flex justify-between items-center !bg-[#FAF4F0]">
              {isBackButtonActive ? (
                <div
                  onClick={() => {
                    setShowPreviousModal(true);
                  }}
                  className=" w-[40px] cursor-pointer h-[40px] rounded-full bg-[#e8e8e8] flex items-center justify-center p-[10px] text-black "
                >
                  <FaArrowLeft />
                </div>
              ) : null}
              <DialogTitle
                id="responsive-dialog-title"
                className="flex justify-between w-full"
              >
                <div> {title} </div>

                <div
                  onClick={() => setShowModal(false)}
                  className="w-[25px] h-[25px] cursor-pointer rounded-full bg-[#FFE0CC] flex items-center justify-center p-[2px] text-brandColor"
                >
                  <IoMdClose />
                </div>
              </DialogTitle>
            </div>

            <DialogContent className="!bg-[#FAF4F0]">
              <DialogContentText>{children}</DialogContentText>
            </DialogContent>
          </Dialog>
        </>
      ) : null}
    </div>
  );
};

export default DefaultModal;
