import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Icon from "src/@core/components/icon";
import { makeid } from "../makeid";
// import { CiEdit } from 'react-icons/ci';
// import { IoMdClose } from 'react-icons/io';
// import { MdOutlineDragIndicator } from 'react-icons/md';
// import { AiOutlineCheck } from "react-icons/ai";

export function SortableItemForListicle(props: any) {

    // props.id
    // JavaScript
    let mainObject = JSON.parse(props.id);
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
        backgroundColor: props.index % 2 == 0 ? "#F8FBFC" : "fff"
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} className="aiwriter-inputs">
            {/* <MdOutlineDragIndicator {...listeners} style={{ display: "flex", color: "#999999" }} /> */}
            <Icon icon="ri:draggable" {...listeners} style={{ color: "#c0c0c4" }} />
            <div style={{ width: "100%", paddingBottom: "20px", paddingTop: "10px" }}>


                {/* <span style={{color:"#6C757D",display: "flex", alignItems:"center", paddingRight:"3px", width:"23px"}}>{props.id.substring(0,2)}</span> */}

                <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "conter" }}>

                    <select key={makeid()} name="cars" style={{ border: "none", backgroundColor: props.index % 2 == 0 ? "#F8FBFC" : "fff" }} onChange={e => { props.changeListicleOutlineTag(props.index, e.target.value) }}>
                        {/* <option value='H1' selected={props.id.substring(0, 2) == 'H1'}>H1</option> */}
                        <option value='H2' selected={props.id.substring(0, 2) == 'H2'}>H2</option>
                        <option value='H3' selected={props.id.substring(0, 2) == 'H3'}>H3</option>
                        <option value='H4' selected={props.id.substring(0, 2) == 'H4'}>H4</option>
                        <option value='H5' selected={props.id.substring(0, 2) == 'H5'}>H5</option>
                        <option value='H6' selected={props.id.substring(0, 2) == 'H6'}>H6</option>


                    </select>
                    <div style={{ width: "45%", paddingRight: "5px" }}>
                        <label>Title</label>
                        <input
                            key={makeid()}
                            style={{ width: "100%", height: "45px", borderRadius: "5px", paddingLeft: "5px", backgroundColor: "#fff", color: "#333333", border: "1px solid #D8D8DD" }}
                            defaultValue={mainObject?.title}
                            onChange={e => { props.editListicleOutlineChange(props.index, e.target.value, 'title') }}
                        />
                    </div>
                    <div style={{ width: "45%", paddingRight: "5px" }}>
                        <label>URL</label>
                        <input
                            key={makeid()}
                            style={{ width: "100%", height: "45px", borderRadius: "5px", paddingLeft: "5px", backgroundColor: "#fff", color: "#333333", border: "1px solid #D8D8DD" }}
                            defaultValue={mainObject?.url} id={props.index}
                            onChange={e => { props.editListicleOutlineChange(props.index, e.target.value, 'url') }}
                        />
                    </div>

                </div>
                <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "conter", paddingLeft: "33px" }}>
                    <div style={{ width: "47%", paddingRight: "5px" }}>
                        <label>Item Image Option</label>
                        <select style={{ width: "100%", height: "63%", borderRadius: "5px", backgroundColor: "#fff", color: "#333333", border: "1px solid #D8D8DD" }}
                            key={makeid()}
                            onChange={e => { props.changeListicleOutlineImgSrc(props.index, e.target.value) }}
                            defaultValue={mainObject.imgSrc}
                        >
                            {/* <option value='H1' selected={props.id.substring(0, 2) == 'H1'}>H1</option> */}
                            <option value='url' >Image URL</option>
                            <option value='none' >No Image</option>

                            {/* <option value='ss' >Screenshot Of The Item URL</option> */}
                            {/* <option value='upload' >Upload Image</option> */}

                        </select>
                    </div>
                    <div style={{ width: "46%", paddingRight: "5px" }}>
                        <label>{
                            mainObject.imgSrc == "none" ?
                                "Image URL" :
                                mainObject.imgSrc == "url" ? "Image URL" :
                                    mainObject.imgSrc == "ss" ? "Image URL" :
                                        "Upload Image"
                        }</label>
                        <input
                            key={makeid()}
                            style={{ width: "100%", height: "45px", borderRadius: "5px", paddingLeft: "5px", backgroundColor: mainObject.imgSrc != "none" && mainObject.imgSrc != "ss" ? "#fff" : "#F7F7F9", color: "#333333", border: "1px solid #D8D8DD" }}
                            defaultValue={mainObject?.imgSrcUrl}
                            disabled={
                                mainObject.imgSrc == "none" ||
                                mainObject.imgSrc == "ss"


                            }
                            onChange={e => { props.changeListicleOutlineImgSrcUrl(props.index, e.target.value) }}
                        />
                    </div>

                </div>






            </div>
            <div style={{ display: "flex", alignItems: "center", marginLeft: "2px", justifyContent: "center" }}>

                <Icon icon="iconamoon:close-thin" style={{ marginRight: "2px", }} className='add-icon-color' onClick={e => { props.removeListicleOutline(props.index) }} />
            </div>
        </div>
    )
}