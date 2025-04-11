import { FAVICON, LOGO } from "@/assets";
import { SVG_BG } from "@/assets/svg";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useAdminContext } from "@/contexts/AdminContext";
import httpRequest from "@/utils/httpRequest";

export default function SignIn() {
  const initSignIn = {
    username: "",
    password: "",
  };
  const showPasswordData = {
    password: false,
  };

  const { signin } = useAdminContext();

  const router = useRouter();

  const [signIn, setSignIn] = useState(initSignIn);
  const [showPassword, setShowPassword] = useState(showPasswordData);

  const handleShowPassword = (e) => {
    const { name } = e.target;
    setShowPassword({ ...showPassword, [name]: !showPassword[name] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignIn({ ...signIn, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await httpRequest("POST", "/auth/signin", signIn);

    console.log(res);

    if (res.status == "error") {
      Swal.fire({
        icon: "error",
        title: "เข้าสู่ระบบไม่สำเร็จ",
        text: res.message,
      });

      return;
    }

    Swal.fire({
      icon: "success",
      title: "เข้าสู่ระบบสำเร็จ",
      text: "ยินดีต้อนรับเข้าสู่ระบบ",
    });

    signin(res.token);

    router.push("/");
  };

  return (
    <Box className="h-screen w-full bg-[#ffffff]">
      <Box className="lg:grid lg:grid-cols-3 h-full">
        <Box className="col-span-2 hidden lg:flex">
          {/* <Image
            src={SVG_BG.src}
            width={1920}
            height={1080}
            alt="bg"
            className="w-full h-full object-cover"
            draggable={false}
          /> */}

          <Box
            sx={{
              height: "100%",
              width: "100%",
              backgroundColor: "#E41E2B",
            }}
          ></Box>
        </Box>
        <Box className="col-span-1 h-full">
          <Box className="h-full flex justify-center items-center">
            <Box className="flex flex-col gap-8 justify-center items-center">
              <Image src={LOGO.src} width={256} height={512} alt="logo" />

              <Box>
                <Box className="text-2xl font-bold text-center text-[#E41E2B]">
                  เข้าสู่ระบบ
                </Box>
                <Box className="text-center text-xl text-[#E41E2B]">
                  กรุณาเข้าสู่ระบบเพื่อเข้าใช้งาน
                </Box>
              </Box>

              <Container
                maxWidth="sm"
                className="flex flex-col gap-5"
                component="form"
                onSubmit={handleSubmit}
              >
                <TextField
                  // type="username"
                  name="username"
                  required
                  value={signIn.username}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  sx={{
                    "&& .MuiInputBase-root": {
                      borderRadius: "10px",
                      backgroundColor: "white",
                    },
                    "&& .MuiInputBase-input": {
                      fontSize: "1rem !important",
                      padding: "0.25rem 1rem",
                    },
                  }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography
                            sx={{
                              fontSize: "1rem",
                              color: "gray",
                            }}
                          >
                            ผู้ใช้งาน :
                          </Typography>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                <TextField
                  type={showPassword.password ? "text" : "password"}
                  name="password"
                  required
                  value={signIn.password}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  sx={{
                    "&& .MuiInputBase-root": {
                      borderRadius: "10px",
                      backgroundColor: "white",
                    },
                    "&& .MuiInputBase-input": {
                      fontSize: "1rem !important",
                      padding: "0.25rem 1rem",
                    },
                  }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography
                            sx={{
                              fontSize: "1rem",
                              color: "gray",
                            }}
                          >
                            {/* <KeyRoundedIcon />  */}
                            รหัสผ่าน :
                          </Typography>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => {
                              let e = { target: { name: "password" } };
                              handleShowPassword(e);
                            }}
                          >
                            {showPassword.password ? (
                              <VisibilityRoundedIcon />
                            ) : (
                              <VisibilityOffRoundedIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <Button
                  type="submit"
                  sx={{
                    backgroundColor: "#E41E2B !important",
                    color: "white !important",
                    borderRadius: "10px !important",
                    fontSize: "1rem !important",
                  }}
                  size="small"
                >
                  เข้าสู่ระบบ
                </Button>
              </Container>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
