export default function AddressForm
(props) {
    return (
        <div>
            <form>
                <input onChange={(event) => props.setAddress(event.target.value)} placeholder="Address goes here" type="text"></input>
            </form>
        </div>
    )
}