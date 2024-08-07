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
import { useEffect, useState } from 'react'
import { LoginRegistrationAPI } from 'src/services/API'
import GSCTables from './GSCTables'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'


const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))



const ApexCharts = () => {
  const [site, setSite] = useState<any>({});
  const router = useRouter()
  useEffect(() => {
    LoginRegistrationAPI.getAllSites({}).then(res => {
      if (res.data[0])
        setSite(res.data[0])
    }).catch(e => {
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
  }, [])
  return (
    <ApexChartWrapper>
      <DatePickerWrapper>
        <Grid container spacing={6} className='match-height'>
          <PageHeader
            title={
              <Typography variant='h5'>
                {/* <LinkStyled href='' target='_blank'> */}
                GSC Statistics
                {/* </LinkStyled> */}
              </Typography>
            }
            subtitle={<Typography variant='body2'>{site?.site_url}</Typography>}
          />
          <Grid item xs={12}>
            <ApexAreaChart site={site?.site_url} />
          </Grid>
          <Grid item xs={12}>

          </Grid>
        </Grid>
      </DatePickerWrapper>
    </ApexChartWrapper>
  )
}

export default ApexCharts
