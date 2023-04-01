
function ServiceCharge({charge}) {

  return (
    <div class="relative w-full h-full max-w-2xl md:h-auto">
        {/* <!-- Modal content --> */}
        <div class="relative bg-white rounded-lg shadow ">
            {/* <!-- Modal header --> */}
            <div class="flex items-start justify-between p-4 border-b rounded-t ">
                <h3 class="text-xl font-semibold text-gray-900 =">
                  Charges
                </h3>
              
            </div>
            {/* <!-- Modal body --> */}
            <div>
    <h3 className="text-xl font-medium text-gray-600">
      Installation Charge
    </h3>
    <div className="flex gap-10 mt-4 w-full">
      <h3 className="text-lg font-medium">
        <span className="mx-2">FirstHour:</span>{" "}
        {charge?.installationCharge1Hour}
      </h3>
      <h3 className="text-lg font-medium">
        <span className="mx-2"> LatelyHours:</span>
        { charge?.installationCharge1Hour}
      </h3>
    </div>
    <h3 className="text-xl font-medium mt-4 text-gray-600">
      Repair Charge
    </h3>
    <div className="flex gap-10 mt-4">
      <h3 className="text-lg font-medium">
        <span className="mx-2">FirstHour:</span>{" "}
        {charge?.repairCharge1Hour}
      </h3>
      <h3 className="text-lg font-medium">
        <span className="mx-2">LatelyHours:</span>
        {charge?.repairChargeLatelyHours}
      </h3>
    </div>
  </div>
          
        </div>
    </div>

  )
}

export default ServiceCharge
