import { FAVICON } from "@/assets";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useAdminContext } from "@/contexts/AdminContext";

export default function Profile() {
  const { signOut, admin } = useAdminContext();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          backgroundColor: "#ffffff",
          "&:hover": {
            backgroundColor: "#F3F3F3",
          },
          padding: "0.5rem !important",
        }}
      >
        <Avatar alt="Museum Siam" src={FAVICON.src} />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
            borderRadius: "12px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          },
        }}
      >
        <Box className="flex flex-col gap-3 p-3">
          <Typography className="text-center font-bold text-[1rem]">
        Admin
          </Typography>
          {/* <Typography className="text-center font-bold text-[1rem]">
            role: {admin?.role}
          </Typography> */}

          <Button
            sx={{
              backgroundColor: "#E41E2B !important",
              color: "#fff",
            }}
            className="w-full rounded-lg text-[1.2rem]"
            size="small"
            startIcon={<LogoutRoundedIcon />}
            onClick={signOut}
          >
            ออกจากระบบ
          </Button>
        </Box>
      </Menu>
    </>
  );
}
