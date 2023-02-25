export default function AddressForm
(props) {
    return (
        <div>
            <form>
                <input onChange={(event) => props.updateListingAttribute("address", event.target.value)} placeholder="Address goes here" type="text"></input>
            </form>
        </div>
    )
}