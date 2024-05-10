// ** React Imports
import { ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch'
import { Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Icon Import
import Icon from 'src/@core/components/icon'

// ** Custom Component Import
import CustomChip from 'src/@core/components/mui/chip'
import LTDPlan from './LTDplan'

interface Props {
  plan: string
  handleChange: (e: ChangeEvent<{ checked: boolean }>) => void
  planObj: any
  downOrCancel: any

}

const PricingHeader = (props: Props) => {
  // ** Props
  const { plan, handleChange, planObj, downOrCancel } = props

  // ** Hook
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  return (
    <Box sx={{ mb: [10, 17.5], textAlign: 'center' }}>
      <Typography variant='h4'>Pricing Plans</Typography>
      <Box sx={{ mt: 2.5, mb: 10.75 }}>
        <Typography variant='body2'>
          All plans include features to boost your SEO.
        </Typography>
        <Typography variant='body2'>Choose the best plan to fit your needs.</Typography>
      </Box>
      {planObj &&
        <LTDPlan plan={planObj} downOrCancel={downOrCancel} />
      }

      <Box sx={{ display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
        <InputLabel
          htmlFor='pricing-switch'
          sx={{ fontWeight: 500, cursor: 'pointer', fontSize: '0.875rem', color: plan === 'monthly' ? "#2979FF" : "#9C9DA9" }}
        >
          Monthly
        </InputLabel>
        <Switch color='primary' id='pricing-switch' onChange={handleChange} checked={plan === 'annually'} />
        <InputLabel htmlFor='pricing-switch' sx={{ fontWeight: 500, cursor: 'pointer', fontSize: '0.875rem', color: plan === 'annually' ? "#2979FF" : "#9C9DA9" }}>
          Annually
        </InputLabel>
        {!hidden && (
          <Box
            sx={{
              top: -30,
              left: '50%',
              display: 'flex',
              position: 'absolute',
              transform: 'translateX(35%)',
              '& svg': { mt: 2, mr: 1, color: 'text.disabled' }
            }}
          >
            <Icon icon='mdi:arrow-down-left' />
            <CustomChip size='small' skin='light' color='primary' label='Save up to 16.7%' />
          </Box>
        )}
      </Box>
    </Box >
  )
}

export default PricingHeader
