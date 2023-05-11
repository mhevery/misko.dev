/** @jsxImportSource react */
import { qwikify$ } from "@builder.io/qwik-react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { type Framework } from "./frameworks";
import Slider from "@mui/material/Slider";

export const MUISlider = qwikify$(Slider, { eagerness: "hover" });

const columns: GridColDef[] = [
  { field: "name", headerName: "Name" },
  { field: "year", headerName: "Year", type: "number" },
];

export const FwTable = qwikify$<{ frameworks: Framework[] }>(
  ({ frameworks }) => {
    return (
      <>
        <h3>DataGrid</h3>
        <div style={{ width: "100%", backgroundColor: "white" }}>
          <DataGrid rows={frameworks} columns={columns} />
        </div>
      </>
    );
  },
  { eagerness: "visible" }
);
