
export type AddressProps = {
  street: string,
  apartment?: string,
  city: string,
  zip: string,
  name: string
}

export default function AddressForm({ callback }: { callback: Function }) {
  const create_input = (placeholder: string, updateField: Function) => {
    return (
      <input
        onChange={(event) => callback(event.target.value)}
        className="h-[7.5vh] pl-5 bg-bxBoxLight rounded-3xl mb-3"
        placeholder={placeholder}
      ></input>
    );
  };

  return (
    <div className="container min-w-full flex flex-col items-center">
      <div className="w-3/6 flex flex-col ">
        <h1 className="text-3xl pb-2">Address</h1>
        <h3 className="pb-5">Please provide the Storage Host full address.</h3>
        {create_input("Street Address", "")}
        {create_input("Apt, Suite, Building Number (Optional)", "")}
        {create_input("City", "")}
        {create_input("Postal Code", "")}
        <h3 className="pt-5 pb-5">Enter a name for this Listing.</h3>
        {create_input("Name", "name")}
      </div>
    </div>
  );
}
