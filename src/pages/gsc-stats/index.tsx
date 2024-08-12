// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

import ApexAreaChart from 'src/views/charts/apex-charts/ApexAreaChart'
import { useEffect, useState, forwardRef } from 'react'
import { LoginRegistrationAPI } from 'src/services/API'
import GSCTables from './GSCTables'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { display } from '@mui/system'
import { Box, Button, InputAdornment, TextField } from '@mui/material'
import DatePicker from 'react-datepicker'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import format from 'date-fns/format'
import Icon from 'src/@core/components/icon'
import GSCSidebar from 'src/services/GSCSidebar'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

interface PickerProps {
  start: Date | number
  end: Date | number
}


const ApexCharts = () => {
  const [site, setSite] = useState<any>("");
  const [endDate, setEndDate] = useState<DateType>(null)
  const [startDate, setStartDate] = useState<DateType>(null)
  const [keyword, setKeyword] = useState(null);
  const [links, setLinks] = useState([]);
  const router = useRouter()

  useEffect(() => {
    // console.log("site.site_url:", site)


  }, [site])
  useEffect(() => {
    const now = new Date();
    const oneMonthBefore = new Date();
    oneMonthBefore.setMonth(oneMonthBefore.getMonth() - 1);
    setStartDate(oneMonthBefore)
    setEndDate(now)
    LoginRegistrationAPI.getUser({}).then(res1 => {
      console.log("res1", res1.data.userData.workspace_owner_info.plan)

      if (res1.data.userData.workspace_owner_info.plan.plan && (res1.data.userData.workspace_owner_info.plan.plan == 'monthly - captain' || res1.data.userData.workspace_owner_info.plan.plan == 'yearly - captain')) {
        LoginRegistrationAPI.getAllSites({}).then(res => {
          if (res.data[0]) {
            // console.log("res.data[0]:", res.data[0])
            if (res.data[0].site_url) {
              if (res.data[0].site_url.startsWith("https://")) {
                let x = res.data[0].site_url.split("https://")
                x = x[x.length - 1].replace("/", "")
                // console.log(x)
                setSite(x)

              } else {
                let x = res.data[0].site_url.split("sc-domain:")

                // console.log(x)
                setSite(x[x.length - 1])
              }

            }
          }

          // setSite(res.data[0])
        }).catch(e => {
          console.log("e:", e)
          Swal.fire({
            title: 'Error',
            text: 'You do not have any site integrated to SEOPILOT',
            icon: 'warning',
            confirmButtonText: 'OK',
            confirmButtonColor: "#2979FF"
          }).then(() => {
            router.push("/integrations")
          })
        })
      } else {
        Swal.fire({
          title: 'Sorry!',
          text: 'You do not have GSC Page. Only monthly/yearly Captain plan has the access.',
          icon: 'warning',
          confirmButtonText: 'OK',
          confirmButtonColor: "#2979FF"
        }).then(() => {
          router.push("/plans")
        })
      }
    }).catch(e1 => {
      console.log(e1)
      Swal.fire({
        title: 'Sorry!',
        text: 'You do not have GSC Page. Only monthly/yearly Captain plan has the access.',
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: "#2979FF"
      }).then(() => {
        router.push("/plans")
      })
    })

  }, [])

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
    // if (start && end)
    //   LoginRegistrationAPI.getGSCDataInRange({ start: start, end: end }).then(res => {
    //     console.log(res.data)
    //     setData(res.data.data)
    //     setCategories(res.data.date)
    //   }).catch(e => {
    //     console.log(e)
    //   })
  }
  return (
    <ApexChartWrapper>
      <DatePickerWrapper>
        <Grid container spacing={6} className='match-height'>
          <Box sx={{ position: "sticky", top: 0, width: "100%", backgroundColor: "#fff", margin: "20px 0px 0px 25px", padding: "0px 10px 0px 10px", zIndex: "1000", border: "1px solid #E9E9EC", borderRadius: "5px" }}>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", }}>
              <Box sx={{ padding: "10px", width: "70%" }}>

                <Typography variant='h6' sx={{ width: "100%", lineHeight: "15px", marginTop: "10px" }}>
                  {/* <LinkStyled href='' target='_blank'> */}
                  GSC Statistics
                  {/* </LinkStyled> */}
                </Typography>
                <Typography variant='body2' sx={{ display: "flex", justifyContent: "start", alignItems: "center", width: "50%" }}>
                  <img height="30" width="30" src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${site}&size=24`} />
                  <p style={{ margin: "0px 0px 0px 10px" }}>{site}</p>
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "end", width: "30%" }}>
                <DatePicker
                  selectsRange
                  endDate={endDate}
                  id='apexchart-area'
                  className='chartdatepicker'
                  selected={startDate}
                  startDate={startDate}
                  onChange={handleOnChange}
                  placeholderText='Click to select a date'
                  customInput={<CustomInput start={startDate as Date | number} end={endDate as Date | number} />}
                />

              </Box>

            </Box>
          </Box>
          {site.length > 0 &&
            <Grid item xs={12}>
              <ApexAreaChart site={site} startDate={startDate} endDate={endDate} links={links} setLinks={setLinks} keyword={keyword} setKeyword={setKeyword} />
            </Grid>

          }

        </Grid>
      </DatePickerWrapper>
    </ApexChartWrapper>
  )
}

export default ApexCharts
