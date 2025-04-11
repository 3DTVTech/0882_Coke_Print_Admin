import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Profile from "./Profile";
import Image from "next/image";
import { FAVICON, LOGO } from "@/assets";
import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboardRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import { useRouter } from "next/router";
import ManageHistoryRoundedIcon from "@mui/icons-material/ManageHistoryRounded";
import VideogameAssetRoundedIcon from "@mui/icons-material/VideogameAssetRounded";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import { styled } from "@mui/material";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import QuizRoundedIcon from "@mui/icons-material/QuizRounded";
const drawerWidth = 280;

const menuData = [
  {
    id: 1,
    name: "รายการ",
    icon: <GroupRoundedIcon />,
    link: "/",
    children: [],
  },
  // {
  //   id: 2,
  //   name: "ประวัติการใช้งาน",
  //   icon: <GroupRoundedIcon />,
  //   link: "/users",
  //   children: [],
  // },
];

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  // border: `1px solid ${theme.palette.divider}`,

  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },

  "&.MuiPaper-root": {
    padding: "0",
    borderRadius: "12px",
  },
  //hover

  "& .MuiAccordionSummary-root.MuiButtonBase-root": {
    padding: "0 1rem !important",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  // padding: "1rem",
  backgroundColor: "#F3F3F3",
  borderRadius: "12px",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(4),
    padding: "0.5rem 0",
    marginTop: "0",
    marginBottom: "0",
  },

  fontSize: "1rem",
  fontWeight: "bold",
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
}));

function AppWrapper(props) {
  const router = useRouter();

  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [selectedMenu, setSelectedMenu] = React.useState(null);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  React.useEffect(() => {
    // search for the parent menu
    let icon = null;
    let name = null;

    const parentMenu = menuData.find((item) =>
      item.link === router.pathname
        ? item
        : item.children.find((child) => child.link === router.pathname)
    );

    if (parentMenu?.children.length == 0) {
      icon = parentMenu.icon;
      name = parentMenu.name;
    } else {
      icon = parentMenu.children.find(
        (child) => child.link === router.pathname
      ).icon;

      name = parentMenu.children.find(
        (child) => child.link === router.pathname
      ).name;
    }

    // set the parent menu
    setSelectedMenu({
      icon,
      name,
    });
  }, [router.pathname]);

  const drawer = (
    <Box>
      <Box className="p-5 flex justify-center">
        <Image
          src={LOGO.src}
          width={512}
          height={512}
          alt="logo"
          className="w-auto h-[50%] object-contain"
          draggable={false}
        />
      </Box>

      <Box className="px-3">
        <List className="flex flex-col gap-3">
          {menuData.map((item, index) => {
            if (item.children.length > 0) {
              return (
                <Box key={index}>
                  {/* <Divider className="mb-5 mt-2" /> */}
                  <Accordion
                    sx={{
                      "& .MuiAccordionSummary-root": {
                        padding: "0",
                      },
                    }}
                    defaultExpanded
                  >
                    <AccordionSummary
                      expandIcon={<ArrowForwardIosSharpIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      {item.name}
                    </AccordionSummary>
                    <AccordionDetails>
                      <List className=" flex flex-col">
                        {item.children.map((child, index) => (
                          <ListItem
                            key={index}
                            sx={{
                              overflow: "hidden",
                              // backgroundColor:
                              //   router.pathname === child.link
                              //     ? "#E41E2B"
                              //     : "#F3F3F3",
                              padding: "0",
                              borderRadius: "12px",
                              color:
                                router.pathname === child.link
                                  ? "#E41E2B"
                                  : "#000000",
                              "&:hover": {
                                backgroundColor: "transparent !important",
                                color: "#E41E2B !important",
                              },
                            }}
                            className="transition-all duration-300 ease-in-out"
                          >
                            <ListItemButton
                              sx={{
                                width: "100%",
                                padding: "0.2rem 1rem",
                                "&:hover": {
                                  backgroundColor: "transparent !important",
                                  color: "#E41E2B !important",
                                },
                              }}
                              className="px-[1rem] py-[0.2rem]"
                              onClick={() => {
                                router.push(child.link);
                              }}
                            >
                              <ListItemIcon
                                sx={{
                                  color: "inherit",
                                  "& .MuiSvgIcon-root": {
                                    fontSize: "1rem",
                                  },
                                }}
                              >
                                {child.icon}
                              </ListItemIcon>
                              <ListItemText
                                primary={child.name}
                                sx={{
                                  color: "inherit",
                                  "& .MuiTypography-root": {
                                    fontSize: "1rem",
                                    fontWeight: "bold",
                                  },
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              );
            } else {
              return (
                <ListItem
                  key={index}
                  sx={{
                    overflow: "hidden",
                    backgroundColor:
                      router.pathname === item.link ? "#E41E2B" : "#F3F3F3",
                    padding: "0",
                    borderRadius: "12px",
                    color: router.pathname === item.link ? "#fff" : "#000000",
                    "&:hover": {
                      backgroundColor: "#d8d8d8 !important",
                      color: "#E41E2B !important",
                    },
                  }}
                  className="transition-all duration-300 ease-in-out"
                >
                  <ListItemButton
                    sx={{
                      width: "100%",
                      // padding: "0.2rem 1rem",
                    }}
                    onClick={() => {
                      router.push(item.link);
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: "inherit",
                        "& .MuiSvgIcon-root": {
                          fontSize: "2rem",
                        },
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      sx={{
                        color: "inherit",
                        "& .MuiTypography-root": {
                          fontSize: "1rem",
                          fontWeight: "bold",
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            }
          })}
        </List>
      </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }} className="min-h-screen">
      <CssBaseline />
      <AppBar
        position="fixed"
        className={`w-[100%] sm:w-[calc(100%-${drawerWidth}px)] ml-[${drawerWidth}px] bg-[#ffffff90] backdrop-blur-sm shadow-none`}
      >
        <Toolbar className="justify-between sm:justify-end">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
            className="sm:hidden text-[#E41E2B]"
          >
            <MenuIcon />
          </IconButton>
          <Box>
            <Profile />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#ffffff",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "#F3F3F3",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
        className="px-5 py-20"
      >
        <Box className="w-full bg-white shadow p-3 mb-5 rounded-md">
          <Typography className="text-[1rem] font-bold text-[#E41E2B]  text-center flex gap-3 justify-center items-center">
            {selectedMenu?.icon}
            {selectedMenu?.name}
          </Typography>
        </Box>
        {children}
      </Box>
    </Box>
  );
}

AppWrapper.propTypes = {
  window: PropTypes.func,
};

export default AppWrapper;
