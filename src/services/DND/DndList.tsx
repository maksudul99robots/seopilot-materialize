import {
    DndContext,
    closestCenter,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { SortableItem } from '../SortableItem';
import { Box, Typography } from '@mui/material';
import Icon from 'src/@core/components/icon';

const DndList = ({ headings, setHeadings, editHeadingOnChange, addnewHeading, setActiveElement, removeHeadings, activeElement, setHeadingsForCSV, headingsForCSV, changeHeadingTag }: any) => {

    function handleDragEnd(event: any) {
        // console.log("Drag end called");
        const { active, over } = event;
        // console.log("ACTIVE: " + active.id);
        // console.log("OVER :" + over.id);

        if (active.id !== over.id) {
            setHeadings((items: any) => {
                const activeIndex = items.indexOf(active.id);
                const overIndex = items.indexOf(over.id);
                // console.log(arrayMove(items, activeIndex, overIndex));
                return arrayMove(items, activeIndex, overIndex);
                // items: [2, 3, 1]   0  -> 2
                // [1, 2, 3] oldIndex: 0 newIndex: 2  -> [2, 3, 1] 
            });


        }
    }
    // console.log(window.location.pathname.includes("create-article"))

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <div style={{
                width: "100%",
                // borderBottom:"2px solid #BCBCBC",
                padding: window.location.pathname.includes("create-article") ? " 20px 5px 25px 20px" : " 20px 5px 25px 0px",

            }}>
                <div style={{
                    border: "1px solid #D8D8DD",
                    padding: "10px",
                    borderRadius: "4px",
                    marginLeft: window.location.pathname.includes("create-article") ? "4px" : "0px",
                    marginRight: "-4px"
                }}>
                    <Box sx={{ p: 3 }}>
                        <Typography variant='h5'>
                            Headings
                        </Typography>
                        <Typography variant='caption' fontSize="14px">
                            Add / Edit / Re-order the Headings
                        </Typography>
                    </Box>
                    <SortableContext
                        items={headings}
                        strategy={verticalListSortingStrategy}

                    >
                        <div style={{
                            overflowY: "auto",
                            overflowX: "hidden",
                            maxHeight: "600px",
                            // boxShadow:"rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",


                        }} className="heading-ai-list-gpt">
                            {headings.map((heading: any, i: number) => <SortableItem
                                key={heading}
                                id={heading}
                                index={i}
                                setHeadings={setHeadings}
                                editHeadingOnChange={editHeadingOnChange}
                                removeHeadings={removeHeadings}
                                activeElement={activeElement}
                                setActiveElement={setActiveElement}
                                headings={headings}
                                setHeadingsForCSV={setHeadingsForCSV}
                                headingsForCSV={headingsForCSV}
                                changeHeadingTag={changeHeadingTag}
                            />)}

                        </div>
                        {/* We need components that use the useSortable hook */}
                    </SortableContext>
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "20px" }}>
                        <Icon icon="lets-icons:add-duotone" className='add-icon-color' fontSize={40} onClick={addnewHeading} />
                    </Box>
                </div>
                {/*  */}

            </div>
        </DndContext>
    )
}

export default DndList;