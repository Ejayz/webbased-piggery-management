"use client";
export default function SearchComponent({
  Search,
  setKeyword,
  keyword,
  base_url,
  sortby,
  sorts,
  setParsed,
  setisTyping,
  setSearch,
  setMessage,
  getData,
}: any) {
  const search = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setisTyping(false);
    setSearch(true);
    const returned = await getData(1, sortby, sorts, keyword);
    if (returned.code == 200) {
      setisTyping(false);
      setSearch(false);
      setMessage("");
      setParsed(returned.data);
    } else if (returned.code == 404) {
      setSearch(false);
      setMessage(returned.message);
    }
  };
  return (
    <form onSubmit={search} className="form-control mr-0 ml-auto">
      <div className="input-group">
        <input
          type="text"
          placeholder="Search…"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          className="input text-base-content input-bordered"
        />
        <button className="btn btn-square">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
