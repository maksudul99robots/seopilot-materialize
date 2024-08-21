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
import { Box, Button, Typography } from '@mui/material'
import GSCTables from 'src/pages/gsc-stats/GSCTables'
import GSCTablesPages from 'src/pages/gsc-stats/GSCTablesPages'
import GSCSummary from 'src/pages/gsc-stats/GscSummary'
import GSCTablesCountry from 'src/pages/gsc-stats/GSCTablesCountry'
import GSCTablesDevice from 'src/pages/gsc-stats/GSCTablesDevice'


const areaColors = {
  series1: '#16C653',
  series2: '#41007A',
  series3: '#1B84FF',
  series4: '#F6C002'
}
// const areaColors = {
//   series1: '#4E897C',
//   series2: '#7CC1F5',
//   series3: '#5A69F9',
//   series4: '#CC772C'
// }

interface PickerProps {
  start: Date | number
  end: Date | number
}

import React, { useRef } from 'react'
import html2canvas from 'html2canvas';
import { s } from '@fullcalendar/core/internal-common'
import { formatDateToYYYYMMDD } from 'src/services/utils/DateTimeFormatters'


const ApexAreaChart = (props: any) => {

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
  const divRef = useRef<HTMLDivElement>(null);
  const downloadScreenshot = async () => {
    if (divRef.current) {
      const ssBtn = document.getElementById('ss-btn');
      const ssTxt = document.getElementById('ss-txt');
      const gscStatsParent = document.getElementById('gsc-stats-parent');
      const gscStat = document.getElementsByClassName('gsc-stats');

      if (ssBtn) ssBtn.style.display = 'none';
      if (ssTxt) ssTxt.style.display = 'flex';
      if (gscStatsParent) gscStatsParent.style.justifyContent = "space-between";

      Array.from(gscStat).map((g: any) => {
        g.style.padding = "10px 30px 10px 30px"
      })
      // Capture the div as a canvas
      const canvas = await html2canvas(divRef.current, { backgroundColor: null, scale: 1 });

      // Get canvas context and add the watermark
      const ctx = canvas.getContext('2d');
      // Restore the button visibility
      if (ssBtn) ssBtn.style.display = 'inline-flex';
      if (ssTxt) ssTxt.style.display = 'none';
      if (gscStatsParent) gscStatsParent.style.justifyContent = "start";

      Array.from(gscStat).map((g: any) => {
        g.style.padding = "5px"
      })

      // Create a link element to download the image
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = props.site + "-stats-" + formatDateToYYYYMMDD(new Date(props.startDate)) + "-" + formatDateToYYYYMMDD(new Date(props.endDate)) + ".png"
      link.click();
    }
  };

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
      colors: [areaColors.series4, areaColors.series3, areaColors.series2, areaColors.series1] // Set the stroke color here if needed
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
      opacity: 0.1,
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

  useEffect(() => {
    if (props.startDate && props.endDate)
      LoginRegistrationAPI.getGSCDataInRange({ start: props.startDate, end: props.endDate }).then(res => {
        console.log(res.data)
        setData(res.data.data)
        setCategories(res.data.date)
      }).catch(e => {
        console.log(e)
      })
  }, [props.startDate, props.endDate])


  // useEffect(() => {
  //   const now = new Date();
  //   const oneMonthBefore = new Date();
  //   oneMonthBefore.setMonth(oneMonthBefore.getMonth() - 1);
  //   setStartDate(oneMonthBefore)
  //   setEndDate(now)

  //   LoginRegistrationAPI.getGSCDataInRange({ start: oneMonthBefore, end: now }).then(res => {
  //     console.log(res.data)
  //     setData(res.data.data)
  //     setCategories(res.data.date)
  //   }).catch(e => {
  //     console.log(e)
  //   })
  // }, [])

  return (
    <Box>
      <Card ref={divRef}>
        <CardHeader
          title={<GSCSummary start={props.startDate} end={props.endDate} />}
          // subheader='Commercial networks'
          subheaderTypographyProps={{ sx: { color: theme => `${theme.palette.text.disabled} !important` } }}
          sx={{
            flexDirection: ['column', 'row'],
            alignItems: ['flex-start', 'center'],
            '& .MuiCardHeader-action': { mb: 0 },
            '& .MuiCardHeader-content': { mb: [2, 0] }
          }}
          action={

            <Button id='ss-btn' variant='outlined' size='small' startIcon={<Icon icon="ph:download-thin" style={{ padding: "0px", display: "inline-flex" }} />} onClick={downloadScreenshot}>
              Download Screenshot
            </Button>
          }
        />
        <CardContent>
          <ReactApexcharts type='area' height={400} options={options} series={data} />
          <Typography id='ss-txt' variant="subtitle2" sx={{ paddingRight: "10px", textAlign: "end", display: "none", alignItems: "center", justifyContent: "end" }}>Powered by <img src='/images/logos/SEOPilotLogo256.png' height={35} style={{ paddingLeft: "10px" }} /></Typography>
        </CardContent>
      </Card>
      <Card sx={{ marginTop: "30px" }}>
        <GSCTables start={props.startDate} end={props.endDate} site={props.site} links={props.links} setLinks={props.setLinks} keyword={props.keyword} setKeyword={props.setKeyword} />
      </Card>
      <Card sx={{ marginTop: "30px" }}>
        <GSCTablesPages start={props.startDate} end={props.endDate} site={props.site} />
      </Card>
      <Card sx={{ marginTop: "30px" }}>
        <GSCTablesCountry start={props.startDate} end={props.endDate} site={props.site} />
      </Card>
      <Card sx={{ marginTop: "30px" }}>
        <GSCTablesDevice start={props.startDate} end={props.endDate} site={props.site} />
      </Card>
    </Box>

  )
}

export default ApexAreaChart
