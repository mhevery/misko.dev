import { component$, useComputed$, useSignal } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { type Framework } from "./frameworks";
import { FwTable, MUISlider } from "./react";
import frameworks from "./frameworks.json";

export const useFrameworks = routeLoader$(async () => {
  // const frameworksFileContent = await readFile(
  //   "./src/routes/BeJS-23/frameworks.json",
  //   "utf-8"
  // );
  // const frameworks = JSON.parse(frameworksFileContent) as Framework[];
  console.log("Read", frameworks.length, "frameworks");
  return frameworks as Framework[];
});

export default component$(() => {
  console.log("Render: <Component/>");
  const frameworks = useFrameworks();
  const year = useSignal(2023);
  const frameworksFiltered = useComputed$(() => {
    return frameworks.value.filter((fw) => fw.year <= year.value);
  });
  return (
    <div style={{ margin: "2em" }}>
      <input
        type="number"
        value={year.value}
        onChange$={(_, e) => (year.value = Number(e.value))}
      />
      <MUISlider
        min={2010}
        max={2023}
        marks
        value={year.value}
        valueLabelDisplay="on"
        onChange$={(_, value) => {
          year.value = value as number;
        }}
      />
      Showing {frameworksFiltered.value.length} of {frameworks.value.length}{" "}
      frameworks.
      {/* <div style={{ height: "1000px" }} /> */}
      {/* <ul>
        {filteredFrameworks.value.map((fw) => (
          <li key={fw.name}>
            {fw.name} ({fw.year})
          </li>
        ))}
      </ul> */}
      <FwTable frameworks={frameworksFiltered.value} />
    </div>
  );
});
