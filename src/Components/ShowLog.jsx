import React from "react";
import AgGridTable from "./AgGridTable";

function ShowLog({ data = [], setData }) {
  return (
    <div className="mt-4 space-y-4">
      {data.map((val, key) => {
        const keyName = Object.keys(val)[0];
        return (
          <div key={key}>
            <h3 className="font-primary font-semibold mb-1 text-center">
              Log #{key + 1}
            </h3>
            {keyName === "text" && (
              <p className="font-secondary text-gray-800">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis,
                molestias.
              </p>
            )}
            {keyName === "table" && <AgGridTable rowData={val[keyName]} />}
          </div>
        );
      })}
    </div>
  );
}

export default ShowLog;
