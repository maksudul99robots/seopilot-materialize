// ** MUI Imports
import Switch from '@mui/material/Switch'
import { styled } from '@mui/material/styles'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// Styled FormControlLabel component
const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
    marginLeft: 0,
    '& .MuiSwitch-root': {
        width: 42,
        height: 26,
        padding: 0,
        marginRight: theme.spacing(3),
        '& .MuiSwitch-switchBase': {
            padding: 1,
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: theme.palette.common.white,
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    border: 'none',
                    backgroundColor: '#2979FF'
                }
            }
        },
        '& .MuiSwitch-thumb': {
            width: 24,
            height: 24
        },
        '& .MuiSwitch-track': {
            opacity: 1,
            borderRadius: 13,
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.action.selected : theme.palette.grey[50],
            border: `1px solid ${theme.palette.grey[400]}`,
            transition: theme.transitions.create(['background-color', 'border'])
        }
    }
}))

const SwitchesCustomized = (props: any) => <FormControlLabel label={props.label} control={<Switch checked={props.isChecked} onClick={props.onClick} />} />

export default SwitchesCustomized
