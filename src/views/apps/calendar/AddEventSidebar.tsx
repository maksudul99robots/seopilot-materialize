// ** React Imports
import { useState, useEffect, forwardRef, useCallback, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'
import CustomChip from 'src/@core/components/mui/chip'

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Types
import { EventDateType, AddEventSidebarType } from 'src/types/apps/calendarTypes'
import { LoginRegistrationAPI } from 'src/services/API'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { Alert } from '@mui/material'

interface PickerProps {
  label?: string
  error?: boolean
  registername?: string
}

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

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

const capitalize = (string: string) => string && string[0].toUpperCase() + string.slice(1)

const defaultState: DefaultStateType = {
  url: '',
  title: '',
  guests: [],
  allDay: true,
  description: '',
  endDate: new Date(),
  calendar: 'Business',
  startDate: new Date()
}

const AddEventSidebar = (props: AddEventSidebarType) => {
  const router = useRouter()
  // ** Props
  let {
    store,
    dispatch,
    addEvent,
    updateEvent,
    drawerWidth,
    calendarApi,
    deleteEvent,
    handleSelectEvent,
    addEventSidebarOpen,
    handleAddEventSidebarToggle
  } = props
  useEffect(() => {
    if (store?.selectedEvent?.title && store?.selectedEvent?.title?.length > 0) {
      addEventSidebarOpen = true
    } else {
      addEventSidebarOpen = false
    }
  }, [store, addEventSidebarOpen])
  // ** States
  const [values, setValues] = useState<DefaultStateType>(defaultState)
  // console.log("values:", values, store.selectedEvent?.extendedProps)
  const {
    control,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { title: '' } })

  const handleSidebarClose = async () => {
    setValues(defaultState)
    clearErrors()
    dispatch(handleSelectEvent(null))
    handleAddEventSidebarToggle()
  }

  const onSubmit = (data: { title: string }) => {
    // const modifiedEvent = {
    //   url: values.url,
    //   display: 'block',
    //   title: data.title,
    //   end: values.endDate,
    //   allDay: values.allDay,
    //   start: values.startDate,
    //   extendedProps: {
    //     calendar: capitalize(values.calendar),
    //     guests: values.guests && values.guests.length ? values.guests : undefined,
    //     description: values.description.length ? values.description : undefined
    //   }
    // }
    // if (store.selectedEvent === null || (store.selectedEvent !== null && !store.selectedEvent.title.length)) {
    //   dispatch(addEvent(modifiedEvent))
    // } else {
    //   dispatch(updateEvent({ id: store.selectedEvent.id, ...modifiedEvent }))
    // }
    // calendarApi.refetchEvents()
    LoginRegistrationAPI.updateSchedule({ date_time: values.startDate, schedule_id: store.selectedEvent?.id }).then(res => {
      props.setUpdateValue(props.updateValue + 1)
    })

    handleSidebarClose()
  }

  const handleDeleteEvent = () => {
    handleSidebarClose()
    Swal.fire({
      // title: 'Error',
      text: 'Are you sure you want to delete this Schedule?',
      icon: 'warning',
      confirmButtonText: 'DELETE',
      showCancelButton: true,
      confirmButtonColor: "#BB2124",
      cancelButtonText: "CANCEL"
    }).then(res => {
      if (res.value) {

        LoginRegistrationAPI.deleteSchedule({ schedule_id: store.selectedEvent?.id }).then(res => {
          props.setUpdateValue(props.updateValue + 1)
        })

      }

    }).catch(e => {
      console.log("inside catch", e)
    })

  }

  const handleStartDate = (date: Date) => {
    if (date > values.endDate) {
      setValues({ ...values, startDate: new Date(date), endDate: new Date(date) })
    }
  }

  const resetToStoredValues = useCallback(() => {
    if (store.selectedEvent !== null) {
      const event = store.selectedEvent
      setValue('title', event.title || '')
      setValues({
        url: event.url || '',
        title: event.title || '',
        allDay: event.allDay,
        guests: event.extendedProps?.guests || [],
        description: event.extendedProps?.description || '',
        calendar: event.extendedProps?.calendar || 'Business',
        endDate: event.end !== null ? event.end : event.start,
        startDate: event.start !== null ? event.start : new Date()
      })
    }
  }, [setValue, store.selectedEvent])

  const resetToEmptyValues = useCallback(() => {
    setValue('title', '')
    setValues(defaultState)
  }, [setValue])

  useEffect(() => {
    if (store.selectedEvent !== null) {
      resetToStoredValues()
    } else {
      resetToEmptyValues()
    }
  }, [addEventSidebarOpen, resetToStoredValues, resetToEmptyValues, store.selectedEvent])

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

  const RenderSidebarFooter = () => {
    if (store.selectedEvent === null || (store.selectedEvent !== null && !store.selectedEvent?.title?.length)) {
      return (
        <Fragment>
          <Button size='large' type='submit' variant='contained' sx={{ mr: 4 }}>
            Add
          </Button>
          <Button size='large' variant='outlined' color='secondary' onClick={resetToEmptyValues}>
            Reset
          </Button>
        </Fragment>
      )
    } else {
      return (
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <Button size='large' variant='outlined' color='error' sx={{ mr: 1 }} onClick={handleDeleteEvent} startIcon={<Icon icon='mdi:delete-outline' fontSize={20} />}>
            Delete
          </Button>
          <Button size='large' type='submit' variant='contained' sx={{ mr: 0 }} disabled={store?.selectedEvent?.extendedProps?.status == 'success'}>
            Update
          </Button>
          {/* <Button size='large' variant='outlined' color='secondary' onClick={resetToStoredValues}>
            Cancel
          </Button> */}
        </Box>
      )
    }
  }

  return (
    <Drawer
      anchor='right'
      open={addEventSidebarOpen && store?.selectedEvent?.title != undefined && store?.selectedEvent?.title?.length > 0}
      onClose={handleSidebarClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: ['100%', drawerWidth] } }}
    >
      <Box
        className='sidebar-header'
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'background.default',
          p: theme => theme.spacing(3, 3.255, 3, 5.255)
        }}
      >
        <Typography variant='h6'>
          {store.selectedEvent !== null && store.selectedEvent?.title?.length ? 'Schedule Post' : 'Add Event'}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LightTooltip title={<p style={{ color: "#606378", fontSize: "14px", zIndex: "99999999", }}>
            View Article</p>}
            placement="top">
            <div>
              <IconButton
                size='small'
                onClick={() => {
                  router.push(`/generated-article/${store.selectedEvent?.extendedProps?.article_id}`)
                }}
                sx={{ color: 'text.primary', mr: store.selectedEvent !== null ? 1 : 0 }}
              >
                <Icon icon='material-symbols:article-shortcut-outline' fontSize={20} href={`/generated-article/${store.selectedEvent?.extendedProps?.article_id}`} />
              </IconButton>
            </div>
          </LightTooltip >


          <IconButton size='small' onClick={handleSidebarClose} sx={{ color: 'text.primary' }}>
            <Icon icon='mdi:close' fontSize={20} />
          </IconButton>
        </Box>
      </Box>
      <Box className='sidebar-body' sx={{ p: theme => theme.spacing(5, 6) }}>
        <DatePickerWrapper>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='title'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField label='Title' value={value} onChange={onChange} error={Boolean(errors.title)} />
                )}
              />
              {errors.title && (
                <FormHelperText sx={{ color: 'error.main' }} id='event-title-error'>
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>

              <TextField label='Folder' value={store?.selectedEvent?.extendedProps?.calender ? store?.selectedEvent?.extendedProps?.calender : ''} disabled />


            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>

              <TextField label='Wordpress Site' value={store?.selectedEvent?.extendedProps?.connect ? store?.selectedEvent?.extendedProps?.connect : ''} disabled />


            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>

              <TextField label='Post As' value={store?.selectedEvent?.extendedProps?.post_status ? store?.selectedEvent?.extendedProps?.post_status : ''} disabled />


            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Typography variant='body1' sx={{ fontSize: "14px", fontWeight: 500, marginTop: "0px", marginBottom: "10px", display: "flex" }}>
                Status
              </Typography>
              <Box sx={{ '& .MuiChip-label': { textTransform: 'capitalize' }, display: "flex", justifyContent: "start" }}>
                <CustomChip
                  size='small'
                  skin='light'
                  color={store?.selectedEvent?.extendedProps?.status ?
                    (store?.selectedEvent?.extendedProps?.status == 'initiated' ? 'info'
                      : store?.selectedEvent?.extendedProps?.status == 'success' ? 'success' : 'error') : 'error'}
                  label={store?.selectedEvent?.extendedProps?.status ?
                    (store?.selectedEvent?.extendedProps?.status == 'initiated' ? 'Not Published Yet'
                      : store?.selectedEvent?.extendedProps?.status == 'success' ? 'Published' : 'Failed') : ''}
                  sx={{ '& .MuiChip-label': { textTransform: 'capitalize' }, display: "flex", justifyContent: "start" }}
                />
              </Box>



            </FormControl>

            <Box sx={{ mb: 6 }}>
              <DatePicker
                selectsStart
                id='event-start-date'
                // endDate={values.endDate as EventDateType}
                selected={values.startDate as EventDateType}
                startDate={values.startDate as EventDateType}
                showTimeSelect={!values.allDay}
                dateFormat={!values.allDay ? 'yyyy-MM-dd hh:mm' : 'yyyy-MM-dd'}
                customInput={<PickersComponent label='Date' registername='startDate' />}
                onChange={(date: Date) => setValues({ ...values, startDate: new Date(date) })}
                onSelect={handleStartDate}
                minDate={new Date()}
                disabled={store?.selectedEvent?.extendedProps?.status == 'success'}

              />
            </Box>
            <Alert severity='info' variant='standard' sx={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", marginTop: "20px", marginBottom: "20px" }}>
              Scheduling is based on your local timezone
            </Alert>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <RenderSidebarFooter />
            </Box>
          </form>
        </DatePickerWrapper>
      </Box>
    </Drawer>
  )
}

export default AddEventSidebar
