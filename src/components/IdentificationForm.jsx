import React,{useState} from "react"

export default function IdentificationForm(props) {
    const id_message = "Please submit a form of personal identification for identity verification purposes (e.g. Passport, Government Issued ID, etc). " +
                        "Note: We would not share your personal information with your stasher or anyone else without your permission.";
    const note_message = "Note: We would not share your personal information with your stasher or anyone else without your permision";

    const [file, setFile] = useState(null)
    const [error, setError] = useState(null)
    const [type, setType] = useState(null)
    const types = ['image/png', 'image/jpg', 'image/jpeg']
    const [files, setFiles] = useState([])

    const changeHandler = (e) => {
        let selected = e.target.files[0]

        if (selected && types.includes(selected.type)) {
            setFile(selected)
            setError(null)
            files.push(
                {
                    id: selected.name,
                    file: selected
                }
            )
        }
        else {
            setFile(null)
            setError("Invalid file!")
        }
    }


    return (
        <div className="container w-2/5">
            <form>
                <div className="container flex flex-col justify-center min-w-2/5">
                    <h1 className="text-3xl font-semibold mb-5">
                        Form of Personal Identification
                    </h1>
                    <p className="text-2xl mb-4">
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
                        {!file &&
                            <div>
                                <label for="dropzone-file" className="flex justify-center w-full h-64 border-2 border-gray-300 border-dashed cursor-pointer bg-[#F8F8F8] dark:hover:bg-bray-800 dark:bg-[#F8F8F8] hover:bg-gray-200 dark:border-gray-200 dark:hover:border-gray-200 dark:hover:bg-gray-200">
                                    <div className="flex items-center justify-center pt-5 pb-6">
                                        <p className="mb-2 text-sm"><span className="font-semibold underline">Upload file from device</span> or drag and drop</p>
                                    </div>
                                </label>
                                <input id="dropzone-file" type="file" multiple className="hidden" onChange={changeHandler} />
                            </div>
                        }
                    </div>

                    <div>
                        {file &&
                            <div>
                                <div className="w-full h-64 border-2 border-gray-300 border-dashed bg-[#F8F8F8]">
                                    <div className="grid grid-cols-3 gap-4 m-2">
                                        {<div>{file.name}</div>}
                                        {
                                            files.map(file => (
                                                <div key={file.id}> {file.name} </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </form>
        </div>
    )
}

export function formatFiles(file) {
    return (
       <div>{file.name}</div>
    )
}