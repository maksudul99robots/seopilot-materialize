// ** MUI Imports
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Types
import { PricingPlanProps } from './types'
import { useState } from 'react'

// ** Styled Component for the wrapper of whole component
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(6),
  paddingTop: theme.spacing(14.75),
  borderRadius: theme.shape.borderRadius
}))

// ** Styled Component for the wrapper of all the features of a plan
const BoxFeature = styled(Box)<BoxProps>(({ theme }) => ({
  marginBottom: theme.spacing(5),
  '& > :not(:first-of-type)': {
    marginTop: theme.spacing(4)
  }
}))

const PlanDetails = (props: PricingPlanProps) => {
  // ** Props
  const { plan, data, index, makePayment, loading, setLoading, calcelPayment } = props

  // console.log("plan, data:", plan, data)

  const renderFeatures = () => {
    return data?.planBenefits.map((item: any, index: number) => (
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Box component='span' sx={{ display: 'inline-flex', color: 'text.secondary', mr: 2 }}>
          {item.show ?
            <Icon icon='gg:check-o' fontSize='0.95rem' color='green' />
            : <Icon icon='carbon:close-outline' fontSize='0.95rem' color='red' />
          }

        </Box>
        <Typography variant='body2'>{item.text}</Typography>
      </Box>
    ))
  }

  return (
    <BoxWrapper
      sx={{
        border: theme =>
          !data?.popularPlan
            ? `1px solid ${theme.palette.divider}`
            : `1px solid ${hexToRGBA(theme.palette.primary.main, 0.5)}`
      }}
    >
      {data?.popularPlan ? (
        <CustomChip
          skin='light'
          label='Popular'
          color='primary'
          sx={{
            top: 12,
            right: 12,
            height: 24,
            position: 'absolute',
            '& .MuiChip-label': {
              px: 1.75,
              fontWeight: 600,
              fontSize: '0.75rem'
            }
          }}
        />
      ) : null}
      <Box sx={{ mb: 5, display: 'flex', justifyContent: 'center' }}>
        <img
          width={data?.imgWidth}
          src={`${data?.imgSrc}`}
          height={data?.imgHeight}
          alt={`${data?.title.toLowerCase().replace(' ', '-')}-plan-img`}
        />
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant='h5' sx={{ mb: 1.5 }}>
          {data?.title}
        </Typography>
        <Typography variant='body2'>{data?.subtitle}</Typography>
        <Box sx={{ my: 7, position: 'relative' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant='body2' sx={{ mt: 1.6, fontWeight: 600, alignSelf: 'flex-start' }}>
              $
            </Typography>
            <Typography variant='h3' sx={{ fontWeight: 600, color: 'primary.main', lineHeight: 1.17 }}>
              {plan === 'monthly' ? data?.monthlyPrice : data?.yearlyPlan.perMonth}
            </Typography>
            <Typography variant='body2' sx={{ mb: 1.6, fontWeight: 600, alignSelf: 'flex-end' }}>
              /month
            </Typography>
          </Box>
          {plan !== 'monthly' && data?.monthlyPrice !== 0 ? (
            <Typography
              variant='caption'
              sx={{ top: 50, left: '50%', position: 'absolute', transform: 'translateX(-50%)' }}
            >{`USD ${data?.yearlyPlan.totalAnnual}/year`}</Typography>
          ) : null}
        </Box>
      </Box>
      <BoxFeature>{renderFeatures()}</BoxFeature>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          // size='small'
          sx={{ padding: "10px 15px ", fontSize: "12px" }}
          color={data?.currentPlan ? 'success' : 'primary'}
          variant={data?.popularPlan ? 'contained' : 'outlined'}
          disabled={data?.currentPlan || loading ? true : false}

          onClick={() => {
            if (data?.title == 'Passenger') {
              makePayment('passenger')
            }
            else if (data?.title == 'Co-Pilot') {
              makePayment('copilot')
            }
            if (data?.title == 'Captain') {
              makePayment('captain')
            }
          }}
        // startIcon={loading ? <Icon icon="line-md:loading-twotone-loop" ></Icon> : null}
        >
          {/* {data?.currentPlan ? 'Your Current Plan' : (index == 0 ? "Free" : 'Upgrade')} */}
          {/* {'Plan Coming Soon'} */}
          {data?.currentPlan ? 'Your Plan' : 'Choose Plan'}
        </Button>
        {data?.currentPlan ?
          <Button
            sx={{ padding: "10px 15px", fontSize: "12px", marginLeft: "5px" }}
            // size='small'
            color={data?.currentPlan ? 'error' : 'primary'}
            variant={data?.popularPlan ? 'contained' : 'outlined'}
            disabled={loading ? true : false}
            onClick={() => {
              calcelPayment()
            }}
          >Cancel Plan</Button>
          : null

        }
      </div>

    </BoxWrapper>
  )
}

export default PlanDetails
