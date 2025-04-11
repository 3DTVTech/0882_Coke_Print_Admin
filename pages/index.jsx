import { SVG_PEOPLE } from "@/assets/svg";
import AppWrapper from "@/components/hoc/AppWrapper";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import Excel from "exceljs";
import { saveAs } from "file-saver";
import httpRequest from "@/utils/httpRequest";
export default function Dashboard() {
  const initFilter = {
    stationId: "all",
    startDate: "",
    endDate: "",
  };

  const [users, setUsers] = useState([]);
  const [initialData, setInitialData] = useState(true);
  const [filter, setFilter] = useState(initFilter);
  const [filterData, setFilterData] = useState([]);

  const [station, setStation] = useState([]);

  //get users all
  const getSession = async () => {
    // console.log("getitng sessions...");
    const sessionRes = await httpRequest("GET", "/sessions");

    // console.log("getitng prints...");
    const printRes = await httpRequest("GET", "/prints");

    // console.log("got sessions");
    // console.log(sessionRes);

    if (sessionRes.status == "error") return;

    const data = sessionRes.data;
    // console.log("sessionsData");
    // console.log(data);

    const printData = printRes?.data;
    // console.log("printsData");
    // console.log(printData);

    data.sort((a, b) => {
      return b.id - a.id;
    });
    const newData = data.map((item, index) => {
      return {
        number: index + 1,
        createdAtText: dayjs(item.createdAt).format("DD/MM/YYYY HH:mm:ss"),
        station: station?.find((station) => station.id == item.stationId)?.name,
        // print: item?.prints?.length || 0,
        print: printData
          ? printData?.filter((p) => p?.sessionId == item?.id)?.length
          : 0,
        ...item,
      };
    });

    // console.log("before setting users");

    setUsers(newData);

    if (newData.length == 0) {
      setTimeout(() => {
        setInitialData(false);
      }, 2000);
    } else {
      setInitialData(false);
    }
  };

  const getStation = async () => {
    const res = await httpRequest("GET", "/stations");

    if (res.status == "error") return;

    // console.log(res.data);

    setStation(res.data);
  };

  const exportExcel = async () => {
    const workSheetName = "coke-printing";
    const workBookName = "coke-printing";
    const workbook = new Excel.Workbook();

    const worksheet = workbook.addWorksheet(workSheetName);
    const columns = [
      { header: "ลำดับ", key: "number", width: 10 },
      { header: "ชื่อ", key: "name", width: 30 },
      { header: "เครื่องที่", key: "station", width: 30 },
      { header: "วันที่สร้าง", key: "createdAtText", width: 30 },
      { header: "จำนวนการพิมพ์", key: "print", width: 30 },
    ];

    worksheet.columns = columns;

    worksheet.columns.forEach((column) => {
      column.width = column.header.length + 5;
      column.alignment = { horizontal: "center" };
    });

    filterData.forEach((item, index) => {
      worksheet.addRow({
        number: item.number,
        name: item.name,
        station: item.station,
        createdAtText: item.createdAtText,
        print: item.print,
      });
    });

    const buf = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buf]), `${workBookName}.xlsx`);
  };

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const filterDataFunc = () => {
    let data = users;

    // console.log("before filterdata");

    if (filter.stationId != "all") {
      data = data.filter((item) => item.stationId == filter.stationId);
    }

    if (filter.startDate) {
      data = data.filter((item) => {
        const date = new Date(item.createdAt);
        const startDate = new Date(filter.startDate + "T00:00:00.000Z");
        return date >= startDate;
      });
    }

    if (filter.endDate) {
      data = data.filter((item) => {
        const date = new Date(item.createdAt);
        const endDate = new Date(filter.endDate + "T23:59:59.999Z");
        return date <= endDate;
      });
    }

    // console.log("before setting filterData");
    setFilterData(data);
  };

  let columns = [
    {
      field: "number",
      headerName: "ลำดับ",
      width: 90,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "name",
      headerName: "ชื่อ",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "station",
      headerName: "เครื่องที่",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "print",
      headerName: "จำนวนการพิมพ์",
      width: 100,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "createdAtText",
      headerName: "วันที่สร้าง",
      minWidth: 200,
      flex: 1,
    },
  ];

  useEffect(() => {
    // console.log("filter or users changed --");
    filterDataFunc();
  }, [filter, users]);

  useEffect(() => {
    // console.log("getting a new sessions --");
    getSession();
  }, [station]);

  useEffect(() => {
    // console.log("getting station --");
    getStation();
  }, []);

  return (
    <AppWrapper>
      <Box className="flex flex-col gap-5">
        <Box className="grid lg:grid-cols-3 gap-5">
          <Box className="bg-white  rounded-lg shadow-md flex  items-center px-5">
            <Image
              src={SVG_PEOPLE.src}
              width={180}
              height={180}
              alt="SVG_PEOPLE"
              draggable={false}
              className="pt-5"
            />
            <Typography className="text-[1.5rem] font-bold text-center w-full">
              {" "}
              จำนวน{" "}
              <Typography
                className="text-[2rem] font-bold text-[#E41E2B]"
                component="span"
              >
                {filterData.length || 0}
              </Typography>{" "}
              คน
            </Typography>
          </Box>
          <Box className="bg-white  rounded-lg shadow-md flex flex-col justify-center  items-center px-5">
            <Typography className="text-[1.5rem] font-bold text-center w-full">
              จำนวนการพิมพ์
            </Typography>

            <Typography className="text-[1.25rem] font-bold text-center w-full">
              {" "}
              จำนวน{" "}
              <Typography
                className="text-[2rem] font-bold text-[#E41E2B]"
                component="span"
              >
                {filterData.reduce((acc, item) => acc + item.print, 0) || 0}
              </Typography>{" "}
              ครั้ง
            </Typography>
          </Box>
        </Box>

        <Box className="flex flex-row justify-between items-end">
          <Button
            onClick={exportExcel}
            className=" text-white rounded-lg text-[1rem] py-1 px-5 h-fit"
            sx={{
              backgroundColor: "#E41E2B",

              //disabled
              "&.Mui-disabled": {
                backgroundColor: "#8a8a8a",
              },
            }}
            disabled={filterData.length == 0}
          >
            Export Excel
          </Button>
          <Box className="flex flex-row gap-5">
            <Box>
              <Typography className="text-[1rem] font-bold text-[#E41E2B]">
                เครื่องที่
              </Typography>
              <Select
                name="stationId"
                onChange={handleFilter}
                size="small"
                value={filter.stationId}
                sx={{
                  backgroundColor: "white",
                  minWidth: "300px",
                }}
              >
                <MenuItem value="all">ทั้งหมด</MenuItem>
                {station.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <Box>
              <Typography className="text-[1rem] font-bold text-[#E41E2B]">
                วันที่เริ่ม
              </Typography>

              <TextField
                type="date"
                name="startDate"
                value={filter.startDate}
                onChange={handleFilter}
                size="small"
                sx={{
                  backgroundColor: "white",
                  minWidth: "300px",
                }}
              />
            </Box>

            <Box>
              <Typography className="text-[1rem] font-bold text-[#E41E2B]">
                วันที่สิ้นสุด
              </Typography>

              <TextField
                type="date"
                name="endDate"
                value={filter.endDate}
                onChange={handleFilter}
                size="small"
                sx={{
                  backgroundColor: "white",
                  minWidth: "300px",
                }}
              />
            </Box>
          </Box>
        </Box>

        <DataGrid
          rows={filterData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50]}
          autoHeight
          // rowHeight={100}
          loading={initialData}
          className="shadow-md bg-white rounded-lg overflow-hidden"
          sx={{
            "& .MuiDataGrid-row": {
              cursor: "pointer",
              fontSize: "1rem",
            },

            // Mui Header Cell
            "& .MuiDataGrid-columnHeaderTitle": {
              fontSize: "1rem",
              fontWeight: "bold",
              color: "#ffffff",
            },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "#E41E2B",
            },

            // Mui Pagination
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "white",
              color: "#E41E2B",
              fontSize: "1rem",
            },

            // Mui Pagination Button
            "& .MuiTablePagination-root": {
              fontSize: "1rem",
              color: "#E41E2B",
            },

            // Mui Pagination Button
            "& .MuiButtonBase-root.Mui-disabled": {
              color: "#E41E2B",
            },

            // Mui Pagination Button
            "& .MuiButtonBase-root.Mui-disabled:hover": {
              backgroundColor: "white",
            },
            "& .MuiTablePagination-selectLabel ": {
              fontSize: "1rem",
              color: "#E41E2B",
            },
            "& .MuiTablePagination-displayedRows": {
              fontSize: "1rem",
              color: "#E41E2B",
            },
            //odd row
            "& .MuiDataGrid-row:nth-of-type(odd)": {
              backgroundColor: "#ffffff",
            },
            //even row
            "& .MuiDataGrid-row:nth-of-type(even)": {
              backgroundColor: "#eeeeee",
            },
          }}
        />
      </Box>
    </AppWrapper>
  );
}

const SelectStatus = ({ id, status, getSession }) => {
  const [value, setValue] = useState(status);

  const handleChange = (e) => {
    setValue(e.target.value);

    handleSave();
  };

  const handleSave = async () => {
    const res = await httpRequest("PUT", `/session/delete/${id}`, {
      status: value,
    });

    console.log(res);

    if (res.status == "error") return;

    let form = {
      action: "remove",
      value: JSON.stringify(res.data),
    };

    getSession();
  };

  return (
    <Select
      fullWidth
      value={value}
      onChange={handleChange}
      size="small"
      sx={{
        backgroundColor: value == "active" ? "#0fc792" : "#e13c3c",
        color: "white",
      }}
    >
      <MenuItem value="active">แสดง</MenuItem>
      <MenuItem value="inactive">ซ่อน</MenuItem>
    </Select>
  );
};
