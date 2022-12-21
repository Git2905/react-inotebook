import AddNoteComponent from "./AddNoteComponent";
import NotesComponent from "./NotesComponent";

export default function HomeComponent(props) {
    return (
        <>
            <AddNoteComponent alert={props.alert} />
            <NotesComponent alert={props.alert} />
        </>
    )
}
