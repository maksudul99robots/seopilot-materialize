import {
    DndContext,
    closestCenter,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { SortableItem } from '../SortableItem';
import { Box, Typography } from '@mui/material';
import Icon from 'src/@core/components/icon';
import { SortableItemForListicle } from './SortableItemForListicle';

const DndForListicle = ({ listicleOutlines, setListicleOutlines, editListicleOutlineChange, addnewListicleOutline, setActiveElement, removeListicleOutline, activeElement, setHeadingsForCSV, headingsForCSV, changeListicleOutlineTag }: any) => {

    function handleDragEnd(event: any) {
        // console.log("Drag end called");
        const { active, over } = event;
        // console.log("ACTIVE: " + active.id);
        // console.log("OVER :" + over.id);

        if (active.id !== over.id) {
            setListicleOutlines((items: any) => {
                const activeIndex = items.indexOf(active.id);
                const overIndex = items.indexOf(over.id);
                // console.log(arrayMove(items, activeIndex, overIndex));
                return arrayMove(items, activeIndex, overIndex);
                // items: [2, 3, 1]   0  -> 2
                // [1, 2, 3] oldIndex: 0 newIndex: 2  -> [2, 3, 1] 
            });


        }
    }


    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <div style={{
                width: "100%",
                // borderBottom:"2px solid #BCBCBC",
                padding: " 20px 5px 25px 0px",

            }}>
                <div style={{
                    border: "1px solid #D8D8DD",
                    padding: "10px",
                    borderRadius: "10px",
                    marginLeft: "4px",
                    marginRight: "-4px"
                }}>
                    <Box sx={{ p: 3 }}>
                        <Typography variant='h5'>
                            Listicle Items
                        </Typography>
                        <Typography variant='caption' fontSize="14px">
                            Add / Edit / Re-order the Items
                        </Typography>
                    </Box>
                    <SortableContext
                        items={listicleOutlines}
                        strategy={verticalListSortingStrategy}

                    >
                        <div style={{
                            overflowY: "auto",
                            overflowX: "hidden",
                            maxHeight: "600px",
                            // boxShadow:"rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",


                        }} className="heading-ai-list-gpt">
                            {listicleOutlines.map((listicle: any, i: number) => <SortableItemForListicle
                                key={listicle}
                                id={listicle}
                                index={i}
                                setListicleOutlines={setListicleOutlines}
                                editListicleOutlineChange={editListicleOutlineChange}
                                removeListicleOutline={removeListicleOutline}
                                activeElement={activeElement}
                                setActiveElement={setActiveElement}
                                listicleOutlines={listicleOutlines}
                                setHeadingsForCSV={setHeadingsForCSV}
                                headingsForCSV={headingsForCSV}
                                changeListicleOutlineTag={changeListicleOutlineTag}
                            />)}

                        </div>
                        {/* We need components that use the useSortable hook */}
                    </SortableContext>
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "20px" }}>
                        <Icon icon="lets-icons:add-duotone" className='add-icon-color' fontSize={40} onClick={addnewListicleOutline} />
                    </Box>
                </div>
                {/*  */}

            </div>
        </DndContext>
    )
}

export default DndForListicle;