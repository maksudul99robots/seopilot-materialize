import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Icon from "src/@core/components/icon";
import { makeid } from "./makeid";
// import { CiEdit } from 'react-icons/ci';
// import { IoMdClose } from 'react-icons/io';
// import { MdOutlineDragIndicator } from 'react-icons/md';
// import { AiOutlineCheck } from "react-icons/ai";

export function SortableItem(props: any) {
    // props.id
    // JavaScript
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        display: "flex",
        alignItems: "center",
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} className="aiwriter-inputs">
            {/* <MdOutlineDragIndicator {...listeners} style={{ display: "flex", color: "#999999" }} /> */}
            <Icon icon="ri:draggable" {...listeners} style={{ color: "#c0c0c4" }} />
            <div style={{ padding: "10px", display: "flex", justifyContent: "spece-between", width: "100%" }}>
                {/* <span style={{color:"#6C757D",display: "flex", alignItems:"center", paddingRight:"3px", width:"23px"}}>{props.id.substring(0,2)}</span> */}
                <select key={makeid()} name="cars" style={{ border: "none" }} onChange={e => { props.changeHeadingTag(props.index, e.target.value) }}>
                    <option value='H1' selected={props.id.substring(0, 2) == 'H1'}>H1</option>
                    <option value='H2' selected={props.id.substring(0, 2) == 'H2'}>H2</option>
                    <option value='H3' selected={props.id.substring(0, 2) == 'H3'}>H3</option>
                    <option value='H4' selected={props.id.substring(0, 2) == 'H4'}>H4</option>
                    <option value='H5' selected={props.id.substring(0, 2) == 'H5'}>H5</option>
                    <option value='H6' selected={props.id.substring(0, 2) == 'H6'}>H6</option>

                </select>
                <input key={makeid()} style={{ width: "95%", height: "45px", borderRadius: "5px", paddingLeft: "5px", backgroundColor: "#fff", color: "#333333", border: "1px solid #D8D8DD" }} defaultValue={props.id.substring(3, props.id.length) ? props.id.substring(3, props.id.length) : ''} id={props.index}
                    onChange={e => { props.editHeadingOnChange(props.index, e.target.value) }}

                // disabled={props.activeElement == props.index ? false : true}

                />
                <div style={{ display: "flex", alignItems: "center", marginLeft: "2px", justifyContent: "center" }}>

                    <Icon icon="iconamoon:close-thin" style={{ marginRight: "2px", }} className='add-icon-color' onClick={e => { props.removeHeadings(props.index) }} />
                </div>
            </div>
        </div>
    )
}