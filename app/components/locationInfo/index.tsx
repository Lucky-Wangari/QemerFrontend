import Bars from "../../components/RecoveredData";
import React from "react";

function LocationInfo() {

return (
<div>
            <div className=" ">

              <div className="shadow sm:hidden">
                <ul role="list" className="divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
                  <Bars />
                </ul>
              </div>
              <div className="hidden sm:block p-4">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                  <div className=" flex flex-col">
                    <div className="overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                      <div className="grid grid-cols-1  h-[400px]">
                        <article>
                          <Bars />
                        </article>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    )
}
export default LocationInfo;
