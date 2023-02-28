export default function ListingSpaceTypeForm() {
  const create_space = (placeholder: string) => {
    return (
      <button className="h-[9vh] w-[18vh] bg-[#F8F8F8] hover:bg-gray-400 rounded-3xl mb-3 mr-3">
        {placeholder}
      </button>
    );
  };

  return (
    <div className="container min-w-full flex flex-col items-center mt-[10vh]">
      <div className="w-3/6 flex flex-col">
        <h1 className="text-3xl pb-2">Space Description</h1>
        <h3 className="pb-5">
          Please Describe Your Storage Space. Check All That Apply.
        </h3>
        <div className="grid gap-y-1 gap-x-20 grid-cols-3">
          {create_space("Basement")}
          {create_space("Closet")}
          {create_space("Common Living Space")}
          {create_space("Bedroom")}
          {create_space("Cabinet")}
          {create_space("Unoccupied Room")}
          {create_space("Other")}
        </div>
      </div>
    </div>
  );
}
