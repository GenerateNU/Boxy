export default function IdentificationForm(props) {
    const id_message = "Please submit a form of personal identification for identity verification purposes (e.g. Passport, Government Issued ID, etc). " +
                        "Note: We would not share your personal information with your stasher or anyone else without your permission.";
    const note_message = "Note: We would not share your personal information with your stasher or anyone else without your permision";

    return (
        <div className="container w-2/5">
            <form>
                <div className="container flex flex-col justify-center min-w-2/5">
                    <h1 className="text-3xl font-semibold mb-5">
                        Form of Personal Identification
                    </h1>
                    <p className="text-2xl mb-5">
                        {id_message}
                    </p>
                    <p className="mb-10">
                        {note_message}
                    </p>

                    <div className="mb-10">
                        <select data-te-select-init className="bg-[#F8F8F8] border text-sm h-16 block w-full p-2.5">
                            <option selected>Select Identification Type</option>
                            <option value="1"> Driver License Photo </option>
                        </select>
                    </div>

                    <div>
                        <label for="dropzone-file" className="flex justify-center w-full h-64 border-2 border-gray-300 border-dashed cursor-pointer bg-[#F8F8F8] dark:hover:bg-bray-800 dark:bg-[#F8F8F8] hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex items-center justify-center pt-5 pb-6">
                                <p className="mb-2 text-sm"><span className="font-semibold underline">Upload file from device</span> or drag and drop</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" />
                        </label>
                    </div>
                </div>
            </form>
        </div>
    )
}