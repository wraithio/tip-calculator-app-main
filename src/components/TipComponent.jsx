import { useState, useEffect } from "react";

const TipComponent = () => {
  const [bill, setBill] = useState(0);
  const [people, setPeople] = useState(null);
  const [tip, setTip] = useState("0.00");
  const [total, setTotal] = useState("0.00");

  //setting useStates
  const grabBill = async () => {
    setBill(billInput.value);
  };
  const grabPeople = async () => {
    setPeople(parseInt(peopleInput.value));
  };

  //on load useEffect
  useEffect(() => {
    resetBtn.setAttribute("disabled", "");
    resetBtn.style.opacity = "0.4";
    resetBtn.classList.remove("hover:bg-[#9fe8df]");
    localStorage.setItem("TipPercent", "");
  }, []);

  //bill useEffect
  useEffect(() => {
    if (localStorage.getItem("TipPercent", 0) != "") {
      generateResult(localStorage.getItem("TipPercent", 0), null);
    }
    billInput.addEventListener("input", function (e) {
      const value = e.target.value;
      if (value.includes(".")) {
        const parts = value.split(/[.]/);
        if (parts.length > 1 && parts[1].length > 2) {
          e.target.value =
            parts[0] +
            (value.includes(",") ? "," : ".") +
            parts[1].substring(0, 2);
        }
      }
    });
  }, [bill]);

  //people useEffect
  useEffect(() => {
    warningText.className = "hidden";
    validText.className = "dark-cyan mb-2";
    peopleInput.style.border = "none";

    if (localStorage.getItem("TipPercent", 0) != "") {
      generateResult(localStorage.getItem("TipPercent", 0), null);
    }

    if (people == 0) {
      peopleInput.style.border = "1px solid red";
      warningText.className = "show";
      validText.className = "dark-cyan mb-2 hidden";
    }
  }, [people]);

  //switches custom button to an input field
  const toggleCustom = async () => {
    customBtn.classList.toggle("hidden");
    customInput.classList.toggle("hidden");
    const TipBtns = [TipBtn5, TipBtn10, TipBtn15, TipBtn25, TipBtn50];
    for (let i = 0; i < TipBtns.length; i++) {
      TipBtns[i].className =
        "text-white bg-[#00494d] rounded-[.25rem] hover:text-[#00494d] hover:bg-[#9fe8df]";
    }
  };

  //finds tip amounts and cost per person
  const generateResult = async (tip, btn) => {
    resetBtn.removeAttribute("disabled");
    resetBtn.style.opacity = "1";
    resetBtn.classList.add("hover:bg-[#9fe8df]");
    peopleInput.value = parseInt(people);
    tip = (tip/100).toFixed(2)
    localStorage.setItem("TipPercent", tip);
    console.log(`total bill:${bill}, people:${people}, tip%${tip}`);
    let tipAmount = (bill * tip) / people;
    let tipTotal = bill / people + tipAmount;
    setTip(tipAmount.toFixed(2));
    setTotal(tipTotal.toFixed(2));
    const TipBtns = [TipBtn5, TipBtn10, TipBtn15, TipBtn25, TipBtn50];
    for (let i = 0; i < TipBtns.length; i++) {
      TipBtns[i].className =
        "text-white bg-[#00494d] rounded-[.25rem] hover:text-[#00494d] hover:bg-[#9fe8df]";
    }
    if (btn != null) {
      btn.className = "rounded-[.25rem] text-[#00494d] bg-[#26c2ad]";
      if (customBtn.classList.contains("hidden")) {
        toggleCustom();
      }
    }
  };

  //reset btn
  const clearFields = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex justify-center place-items-center">
      <div className="flex flex-col gap-8">
        <div className="flex justify-center sm:mt-0 mt-8 sm:mb-12 mb-0">
          <img src="/images/logo.svg" alt="tip calculator logo" />
        </div>
        <div className="flex sm:flex-row flex-col sm:w-fit w-screen sm:h-fit h-[37rem] gap-10 bg-white py-6 px-8 sm:rounded-xl rounded-t-3xl drop-shadow-xl">
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="dark-cyan mb-2">Bill</h3>
              <input
                type="number"
                id="billInput"
                onChange={grabBill}
                placeholder="0"
                min="0"
                className="sm:w-fit w-full"
              />
            </div>
            <div>
              <h3 className="dark-cyan mb-2">Select Tip %</h3>
              <div className="grid sm:grid-rows-2 sm:grid-cols-3 grid-cols-2 grid-rows-3 gap-2">
                <button
                  id="TipBtn5"
                  className="text-white bg-[#00494d] rounded-[.25rem] hover:text-[#00494d] hover:bg-[#9fe8df]"
                  onClick={() => generateResult(5, TipBtn5)}
                >
                  <h2 className="sm:text-lg text-xl py-1">5%</h2>
                </button>
                <button
                  id="TipBtn10"
                  className="text-white bg-[#00494d] rounded-[.25rem] hover:text-[#00494d] hover:bg-[#9fe8df]"
                  onClick={() => generateResult(10, TipBtn10)}
                >
                  <h2 className="sm:text-lg text-xl py-1">10%</h2>
                </button>
                <button
                  id="TipBtn15"
                  className="text-white bg-[#00494d] rounded-[.25rem] hover:text-[#00494d] hover:bg-[#9fe8df]"
                  onClick={() => generateResult(15, TipBtn15)}
                >
                  <h2 className="sm:text-lg text-xl py-1">15%</h2>
                </button>
                <button
                  id="TipBtn25"
                  className="text-white bg-[#00494d] rounded-[.25rem] hover:text-[#00494d] hover:bg-[#9fe8df]"
                  onClick={() => generateResult(25, TipBtn25)}
                >
                  <h2 className="sm:text-lg text-xl py-1">25%</h2>
                </button>
                <button
                  id="TipBtn50"
                  className="text-white bg-[#00494d] rounded-[.25rem] hover:text-[#00494d] hover:bg-[#9fe8df]"
                  onClick={() => generateResult(50, TipBtn50)}
                >
                  <h2 className="sm:text-lg text-xl py-1">50%</h2>
                </button>
                <button
                  className="darkish-cyan bg-[#f2f7f7] rounded-[.25rem] hover:text-[#00494d] hover:bg-[#9fe8df] text-sm tracking-widest"
                  id="customBtn"
                  onClick={toggleCustom}
                >
                  <h3 className="text-lg">Custom</h3>
                </button>

                <input
                  type="number"
                  className="hidden w-24 rounded-[.25rem]"
                  placeholder="%"
                  id="customInput"
                  onChange={() => generateResult(customInput.value, null)}
                  min="0"
                />
              </div>
            </div>
            <div>
              <h3 className="dark-cyan mb-2" id="validText">
                Number of People
              </h3>
              <div id="warningText">
                <div className="flex justify-between ">
                  <h3 className="dark-cyan mb-2">Number of People</h3>
                  <h3 className="text-red-500 mb-2">
                    <b>Can't be zero</b>
                  </h3>
                </div>
              </div>
              <input
                type="number"
                id="peopleInput"
                placeholder="0"
                onChange={grabPeople}
                className="sm:w-fit w-full"
              />
            </div>
          </div>
          <div className="bg-[#00494d] rounded-lg flex flex-col gap-4 sm:px-8 sm:pb-6 sm:pt-8 p-4 pt-6">
            <div className="flex sm:gap-8 gap-4 justify-between">
              <div>
                <h3 className="text-white sm:text-base text-xs">Tip Amount</h3>

                <h3 className="gray-cyan md:text-base text-xs">/ person</h3>
              </div>
              <div className="flex place-items-center text-[#26c0ab] text-2xl sm:text-4xl">
                <h1>
                  <b>${tip}</b>
                </h1>
              </div>
            </div>
            <div className="flex sm:gap-8 gap-4 justify-between">
              <div>
                <h3 className="text-white sm:text-base text-xs">Total</h3>
                <h3 className="gray-cyan md:text-base text-xs">/ person</h3>
              </div>
              <div className="flex place-items-center text-[#26c0ab] text-2xl sm:text-4xl">
                <h1>
                  <b>${total}</b>
                </h1>
              </div>
            </div>
            <div className="h-full flex place-items-end justify-center">
              <button
                className="flex w-full rounded-md py-1 bg-[#26c0ab] hover:bg-[#9fe8df]"
                type="reset"
                id="resetBtn"
                onClick={clearFields}
              >
                <div className="flex w-full justify-center">
                  <h1 className="dark-cyan text-lg">RESET</h1>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipComponent;
