export default function AlertComponent(props) {
    return (
        <div style={{ height: "50px", marginTop: "3rem", marginBottom: "1rem" }}>
            {
                props.alert &&
                <div className={`alert alert-${props.alert.type === "S" ? "success" : "danger"} alert-dismissible fade show`}
                    role="alert">
                    <strong>{props.alert.message}</strong>
                </div>
            }
        </div>
    )
}
