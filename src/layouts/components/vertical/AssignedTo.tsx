import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { forwardRef, useEffect, useState } from "react"
import { LoginRegistrationAPI } from "src/services/API"
import { getDateTime } from "src/services/utils/DateTimeFormatter"
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import Swal from "sweetalert2"
interface PickerProps {
    label?: string
    error?: boolean
    registername?: string
}
interface DefaultStateType {
    url: string
    title: string
    allDay: boolean
    calendar: string
    description: string
    endDate: Date | string
    startDate: Date | string
    guests: string[] | string | undefined
}
const defaultState: DefaultStateType = {
    url: '',
    title: '',
    guests: [],
    allDay: false,
    description: '',
    endDate: new Date(),
    calendar: 'Business',
    startDate: new Date()
}

export const AssignedTo = (props: any) => {
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState(props.assignedTo.user.id);
    const [dateTime, setDateTime] = useState<Date>(new Date(props.assignedTo.due_date));

    useEffect(() => {
        LoginRegistrationAPI.getTeam({}).then(res => {
            setUsers(res.data)
            // setTotal(res.data.total)
            // setRows(loadServerRows(paginationModel.page, res.data.data))
        }).catch(e => {
            console.log("unable to get Folders")
        })
    }, [])

    const PickersComponent = forwardRef(({ ...props }: PickerProps, ref) => {
        return (
            <TextField
                inputRef={ref}
                fullWidth
                {...props}
                label={props.label || ''}
                sx={{ width: '100%' }}
                error={props.error}
            />
        )
    })

    const [values, setValues] = useState<DefaultStateType>(defaultState)
    const handleStartDate = (date: Date) => {
        if (date > values.endDate) {
            setValues({ ...values, startDate: new Date(date), endDate: new Date(date) })
        }
    }
    return <Box sx={{ padding: "5px 10px 5px 5px", marginRight: "10px", display: "flex", alignItems: "center", borderRight: "1px solid #E9E9EC" }}>
        {/* <Box> */}
        <Box sx={{ display: "flex", }}>
            {/* <Typography sx={{ fontWeight: "400", fontSize: "11px" }}>Assigned to:</Typography>
                <Typography sx={{ fontWeight: "500", fontSize: "11px" }}>&nbsp;{props.assignedTo.user.first_name} {props.assignedTo.user.last_name}</Typography> */}

            <FormControl fullWidth sx={{ marginBottom: "0px", marginTop: "0px", marginRight: "5px" }}>
                <InputLabel id="assigned">Assigned To</InputLabel>
                <Select
                    fullWidth
                    placeholder='Assigned To'
                    label='Assigned To dsl'
                    labelId='assigned'
                    value={
                        userId
                    }
                    sx={{ height: "35px", fontSize: "12px" }}
                    onChange={e => {
                        console.log("e:", e.target)
                        LoginRegistrationAPI.assignArticle({
                            assigned_to: e.target.value,
                            article_id: props.assignedTo.article_id,
                            due_date: dateTime
                        }).then(res => {
                            setUserId(e.target.value)
                            props.updaateAssignedTo(res.data)
                            Swal.fire({
                                title: 'Success',
                                text: 'User Assigned Successfully!',
                                icon: 'success',
                                confirmButtonText: 'Close',
                                confirmButtonColor: "#2979FF",
                            })
                        }).catch(e => {
                            Swal.fire(
                                'Error',
                                'Unable to changes status',
                                'error'
                            )
                        })

                    }}
                >
                    {
                        users.map((u: any) => {
                            return <MenuItem sx={{ fontSize: "12px" }} value={u?.user.id}>{u?.user?.first_name.toUpperCase()} {u?.user?.last_name.toUpperCase()}</MenuItem>
                        })
                    }

                </Select>
            </FormControl>
        </Box>
        <Box sx={{ display: "flex" }}>
            {/* <Typography sx={{ fontWeight: "400", fontSize: "11px" }}>Due Date:</Typography>
                <Typography sx={{ fontWeight: "500", fontSize: "11px" }}>&nbsp;{getDateTime(props.assignedTo.due_date)}</Typography> */}
            <DatePickerWrapper >
                <DatePicker
                    // style={{ height: "30px" }}
                    selectsStart
                    id='event-due-date'
                    selected={dateTime}
                    minDate={new Date()}
                    showTimeSelect={true}
                    dateFormat={'MM-dd-yyyy hh:mm a'}
                    customInput={<PickersComponent label='Due date' registername='Due date' />}
                    onChange={(date: Date) => {
                        setDateTime(date)
                        // console.log("date:", date)

                    }}
                    onCalendarClose={() => {

                        if (getDateTime(props.assignedTo.due_date) != getDateTime(dateTime)) {
                            LoginRegistrationAPI.assignArticle({
                                assigned_to: userId,
                                article_id: props.assignedTo.article_id,
                                due_date: dateTime
                            }).then(res => {
                                // console.log(res)
                                props.updaateAssignedTo(res.data)
                                Swal.fire({
                                    title: 'Success',
                                    text: 'User Assigned Successfully!',
                                    icon: 'success',
                                    confirmButtonText: 'Close',
                                    confirmButtonColor: "#2979FF",
                                })
                            }).catch(e => {
                                Swal.fire(
                                    'Error',
                                    'Unable to changes status',
                                    'error'
                                )
                            })
                        }

                    }}
                    onSelect={handleStartDate}
                />
            </DatePickerWrapper>
        </Box>
        {/* </Box> */}
        {/* <div style={{ marginLeft: "10px", marginRight: "10px" }}>|</div> */}

    </Box>
}