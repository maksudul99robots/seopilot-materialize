// ** React Imports
import { forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Third Party Imports
import format from 'date-fns/format'
import { ApexOptions } from 'apexcharts'
import DatePicker from 'react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { LoginRegistrationAPI } from 'src/services/API'
import { Box } from '@mui/material'
import GSCTables from 'src/pages/gsc-stats/GSCTables'
import GSCTablesPages from 'src/pages/gsc-stats/GSCTablesPages'
import GSCSummary from 'src/pages/gsc-stats/GscSummary'
import GSCTablesCountry from 'src/pages/gsc-stats/GSCTablesCountry'
import GSCTablesDevice from 'src/pages/gsc-stats/GSCTablesDevice'


const areaColors = {
  series1: '#4E897C',
  series2: '#7CC1F5',
  series3: '#5A69F9',
  series4: '#CC772C'
}

interface PickerProps {
  start: Date | number
  end: Date | number
}



const ApexAreaChart = (props: any) => {
  // ** States
  const [endDate, setEndDate] = useState<DateType>(null)
  const [startDate, setStartDate] = useState<DateType>(null)
  const [data, setData] = useState<any>(
    [
      {
        name: 'Clicks',
        data: []
      },
      {
        name: 'Impressions',
        data: []
      },
      {
        name: 'CTR',
        data: []
      },
      {
        name: 'Positions',
        data: []
      }
    ]
  );
  const [categories, setCategories] = useState<any>([])

  // ** Hook
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: true }

    },
    tooltip: { shared: false },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      curve: 'straight',
      width: 2,
      colors: ['#000'] // Set the stroke color here if needed
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      labels: { colors: theme.palette.text.secondary },
      markers: {
        offsetY: 1,
        offsetX: -3
      },
      itemMargin: {
        vertical: 5,
        horizontal: 5
      }
    },
    colors: [areaColors.series4, areaColors.series3, areaColors.series2, areaColors.series1],
    fill: {
      opacity: 0.4,
      type: 'solid'
    },
    grid: {
      show: true,
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true }
      }
    },
    yaxis: {
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    xaxis: {

      axisBorder: { show: true },
      // axisTicks: { color: 'red' },
      crosshairs: {
        stroke: { color: theme.palette.divider }
      },
      labels: {
        style: { colors: theme.palette.text.disabled },
        show: true
      },
      tickAmount: 16,
      categories: categories
    }
  }

  const CustomInput = forwardRef((props: PickerProps, ref) => {
    const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
    const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null

    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return (
      <TextField
        {...props}
        size='small'
        value={value}
        inputRef={ref}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Icon icon='mdi:bell-outline' />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <Icon icon='mdi:chevron-down' />
            </InputAdornment>
          )
        }}
      />
    )
  })

  const handleOnChange = (dates: any) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
    if (start && end)
      LoginRegistrationAPI.getGSCDataInRange({ start: start, end: end }).then(res => {
        console.log(res.data)
        setData(res.data.data)
        setCategories(res.data.date)
      }).catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    const now = new Date();
    const oneMonthBefore = new Date();
    oneMonthBefore.setMonth(oneMonthBefore.getMonth() - 1);
    setStartDate(oneMonthBefore)
    setEndDate(now)

    LoginRegistrationAPI.getGSCDataInRange({ start: oneMonthBefore, end: now }).then(res => {
      console.log(res.data)
      setData(res.data.data)
      setCategories(res.data.date)
    }).catch(e => {
      console.log(e)
    })
  }, [])

  return (
    <Box>
      <Card>
        <CardHeader
          title={<GSCSummary start={startDate} end={endDate} />}
          // subheader='Commercial networks'
          subheaderTypographyProps={{ sx: { color: theme => `${theme.palette.text.disabled} !important` } }}
          sx={{
            flexDirection: ['column', 'row'],
            alignItems: ['flex-start', 'center'],
            '& .MuiCardHeader-action': { mb: 0 },
            '& .MuiCardHeader-content': { mb: [2, 0] }
          }}
          action={
            <DatePicker
              selectsRange
              endDate={endDate}
              id='apexchart-area'
              selected={startDate}
              startDate={startDate}
              onChange={handleOnChange}
              placeholderText='Click to select a date'
              customInput={<CustomInput start={startDate as Date | number} end={endDate as Date | number} />}
            />
          }
        />
        <CardContent>
          <ReactApexcharts type='area' height={400} options={options} series={data} />
        </CardContent>
      </Card>
      <Card sx={{ marginTop: "30px" }}>
        <GSCTables start={startDate} end={endDate} site={props.site} />
      </Card>
      <Card sx={{ marginTop: "30px" }}>
        <GSCTablesPages start={startDate} end={endDate} site={props.site} />
      </Card>
      <Card sx={{ marginTop: "30px" }}>
        <GSCTablesCountry start={startDate} end={endDate} site={props.site} />
      </Card>
      <Card sx={{ marginTop: "30px" }}>
        <GSCTablesDevice start={startDate} end={endDate} site={props.site} />
      </Card>
    </Box>

  )
}

export default ApexAreaChart
