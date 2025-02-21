import Mydata from "../main/Mydata";
import Tablo from "@/components/data/Tablo";
function SelectCity() {
  return (
    <div dir="rtl" className="mt-16">
      <div className=" flex flex-col  w-[95%] h-[264px] bg-slate-300 m-auto ">
        <form className="  flex flex-col items-center justify-around w-[100%] h-[264px] ">
          <label className=" pt-4 mb-2 text-base font-medium text-gray-900 dark:text-white">
            انتخاب شهر
          </label>
          <select className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {Tablo.map((mamad) => (
              <option key={mamad.id}>{mamad.city}</option>
            ))}
          </select>
          <label className=" pt-4 mb-2 text-base font-medium text-gray-900 dark:text-white">
            انتخاب رسانه
          </label>
          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {Tablo.map((mamad) => (
              <option key={mamad.id}>{mamad.mediatype}</option>
            ))}
          </select>
          <div className="m-auto flex items-center justify-center text-base text-gray-900 bg-slate-400 w-[200px] h-[40px] rounded-md ">
            <button> جستجو بیلبورد </button>
          </div>
        </form>
      </div>

      <Mydata />
    </div>
  );
}

export default SelectCity;
