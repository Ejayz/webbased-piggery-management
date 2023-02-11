export default function SorterMobile({
  sortby,
  isSorting,
  setSort,
  sorts,
  setSortBy,
  sortData,
  colsData,
}: any) {

  const sortdata=async ()=>{

  }


  return (
    <>
      <div className="dropdown lg:hidden my-auto ">
        <label tabIndex={0} className="btn m-1">
          Sort
        </label>
        <div
          tabIndex={0}
          className={`${
            isSorting ? "hidden" : "block"
          } dropdown-content card card-compact w-64 p-2 shadow bg-base-200`}
        >
          <div className="card-body h-36  overflow-y-auto">
            <div className="divider">Sort Order</div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Ascending</span>
                <input
                  type="radio"
                  name="sorts"
                  value={"ASC"}
                  className="radio checked:bg-blue-500"
                  checked={sorts == "ASC"}
                  onChange={(e) => {
                    setSort(e.target.value);
                  }}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Descending</span>
                <input
                  type="radio"
                  name="sorts"
                  className="radio checked:bg-blue-500"
                  value={"DESC"}
                  checked={sorts == "DESC"}
                  onChange={(e) => {
                    setSort(e.target.value);
                  }}
                />
              </label>
            </div>
            <div className="divider">Sort By</div>
            {colsData.map((cols: any, key: number) => {
              const colsName = cols.replace("_", " ");
              return (
                <div key={key} className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text uppercase">{colsName}</span>
                    <input
                      type="radio"
                      name="keys"
                      value={cols}
                      className="radio checked:bg-red-500"
                      checked={sortby == cols}
                      onChange={(e) => {
                        setSortBy(e.target.value);
                      }}
                    />
                  </label>
                </div>
              );
            })}

            <button onClick={sortdata} className="btn btn-primary m-1">
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
