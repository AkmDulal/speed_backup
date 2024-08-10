"use client";
import {
  Box,
  Fade,
  FormControlLabel,
  Paper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import TrapFocus from "@mui/material/Unstable_TrapFocus";
import React, { useEffect, useState } from "react";
function CookiesPages() {
  const [bannerOpen, setBannerOpen] = useState(true);
  const [showManageCookiesModal, setShowManageCookiesModal] = useState(false);

  const [requiredToggled, setRequiredToggled] = useState(true);
  const [functionalToggled, setFunctionalToggled] = useState(false);
  const [analyticsToggled, setAnalyticsToggled] = useState(false);
  const [marketingToggled, setMarketingToggled] = useState(false);

  const closeBanner = () => {
    setBannerOpen(false);
    setShowManageCookiesModal(true);
    localStorage.setItem("allow-cookies", false);
  };

  const allowCookies = () => {
    setBannerOpen(false);
    localStorage.setItem("allow-cookies", true);
  };

  useEffect(() => {
    const allowCookies = localStorage.getItem("allow-cookies");
    if (allowCookies) {
      setBannerOpen(false);
    }
  }, []);

  const handleRequiredToggleChange = () => {
    setRequiredToggled(!requiredToggled);
  };

  const handleFunctionalToggleChange = () => {
    setFunctionalToggled(!functionalToggled);
  };

  const handleAnalyticsToggleChange = () => {
    setAnalyticsToggled(!analyticsToggled);
  };

  const handleMarketingToggleChange = () => {
    setMarketingToggled(!marketingToggled);
  };

  return (
    <div>
      <React.Fragment>
        <TrapFocus open disableAutoFocus disableEnforceFocus>
          <Fade appear={false} in={bannerOpen}>
            <Paper
              role="dialog"
              aria-modal="false"
              aria-label="Cookie banner"
              square
              variant="outlined"
              tabIndex={-1}
              sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                m: 0,
                p: 2,
                borderWidth: 0,
                borderTopWidth: 1,
              }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                gap={2}
              >
                <Box
                  sx={{
                    flexShrink: 1,
                    alignSelf: { xs: "flex-start", sm: "center" },
                  }}
                >
                  <Typography variant="body2">
                    We use cookies to make our service easier and faster for you
                    to use, to personalize content for you, and to analyze
                    website traffic. You can learn more about cookies or manage
                    them individually by clicking &quot;Manage&quot;. You can
                    find more information and withdraw your consent at any time
                    in our Privacy Policy.
                  </Typography>
                </Box>
                <Stack
                  gap={2}
                  direction={{
                    xs: "row-reverse",
                    sm: "row",
                  }}
                  sx={{
                    flexShrink: 0,
                    alignSelf: { xs: "flex-end", sm: "center" },
                  }}
                >
                  <button
                    onClick={allowCookies}
                    className="text-[16px] font-[500] bg-[#ffe0cc] text-brandColor py-[5px] px-[10px] rounded-[5px]"
                  >
                    Allow
                  </button>
                  <button
                    onClick={closeBanner}
                    className="text-[16px] font-[500] py-[3px] px-[8px] rounded-[5px]"
                  >
                    Manage
                  </button>
                </Stack>
              </Stack>
            </Paper>
          </Fade>
        </TrapFocus>
      </React.Fragment>

      {showManageCookiesModal && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          style={{ display: open ? "block" : "none" }}
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between">
                  <p className="text-[18px] font-[700] leading-7 mb-6">
                    Required
                  </p>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={requiredToggled}
                        disabled={true}
                        style={{
                          color: requiredToggled ? "#ff6c00" : "#d3d3d3",
                        }}
                        onChange={handleRequiredToggleChange}
                      />
                    }
                    labelPlacement="start"
                    label={requiredToggled ? "Yes" : "No"}
                  />
                </div>
                <p className="text-[13px] font-[400] leading-7 text-[#707070]">
                  These cookies are essential so you can move around the website
                  and use its features. Services you have asked for cannot be
                  provided without these cookies.
                </p>
              </div>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between">
                  <p className="text-[18px] font-[700] leading-7 mb-6">
                    Functional
                  </p>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={functionalToggled}
                        onChange={handleFunctionalToggleChange}
                        style={{
                          color: functionalToggled ? "#ff6c00" : "#d3d3d3",
                        }}
                      />
                    }
                    labelPlacement="start"
                    label={functionalToggled ? "Yes" : "No"}
                  />
                </div>
                <p className="text-[13px] font-[400] leading-7 text-[#707070]">
                  These cookies allow the website to remember choices you make
                  to give you better functionality and personal features.
                </p>
              </div>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between">
                  <p className="text-[18px] font-[700] leading-7 mb-6">
                    Analytics (tracking and performance)
                  </p>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={analyticsToggled}
                        onChange={handleAnalyticsToggleChange}
                        style={{
                          color: analyticsToggled ? "#ff6c00" : "#d3d3d3",
                        }}
                      />
                    }
                    labelPlacement="start"
                    label={analyticsToggled ? "Yes" : "No"}
                  />
                </div>
                <p className="text-[13px] font-[400] leading-7 text-[#707070]">
                  Analytics cookies are used to understand how visitors interact
                  with the website. These cookies help provide information about
                  the number of visitors, how much time they spend on the site,
                  how they have ended up on the site and more
                </p>
              </div>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between">
                  <p className="text-[18px] font-[700] leading-7 mb-6">
                    Marketing (targeting and advertising)
                  </p>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={marketingToggled}
                        onChange={handleMarketingToggleChange}
                        style={{
                          color: marketingToggled ? "#ff6c00" : "#d3d3d3",
                        }}
                      />
                    }
                    labelPlacement="start"
                    label={marketingToggled ? "Yes" : "No"}
                  />
                </div>
                <p className="text-[13px] font-[400] leading-7 text-[#707070]">
                  These cookies are used to deliver information to you and to
                  measure the effectiveness of such advertisements. We and our
                  advertising partners will use your data to show you ads that
                  you might be interested in.
                </p>
              </div>
              <div className="w-full bg-white px-4 py-3 inline-flex justify-center">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-brandColor text-base font-medium text-white hover:bg-brandColor sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setShowManageCookiesModal(false);
                  }}
                >
                  Save choices
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CookiesPages;
