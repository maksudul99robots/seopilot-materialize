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


const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))



const ApexCharts = () => {
  const [site, setSite] = useState<any>({});
  useEffect(() => {
    LoginRegistrationAPI.getAllSites({}).then(res => {
      if (res.data[0])
        setSite(res.data[0])
    }).catch(e => {

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
            <ApexAreaChart />
          </Grid>
          <Grid item xs={12}>

          </Grid>
        </Grid>
      </DatePickerWrapper>
    </ApexChartWrapper>
  )
}

export default ApexCharts
