// ** React Imports
import { Ref, useState, forwardRef, ReactElement, ChangeEvent, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useAuth } from 'src/hooks/useAuth'
// ** Third Party Imports
import Payment from 'payment'
import Cards, { Focused } from 'react-credit-cards'

// ** Util Import
import { formatCVC, formatExpirationDate, formatCreditCardNumber } from 'src/@core/utils/format'

// ** Styled Component Imports
import CardWrapper from 'src/@core/styles/libs/react-credit-cards'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Divider, FormControl, InputAdornment, InputLabel, MenuItem, Select } from '@mui/material'

const Transition = forwardRef(function Transition(
    props: FadeProps & { children?: ReactElement<any, any> },
    ref: Ref<unknown>
) {
    return <Fade ref={ref} {...props} />
})

import fetch, { Headers } from "node-fetch"
import Swal from 'sweetalert2'
import Link from 'next/link'
import { LoginRegistrationAPI } from '../API'
const headers = new Headers()

const ShowWorkspaces = (props: any) => {
    // ** States
    const auth = useAuth()
    const [loading, setLoading] = useState<boolean>(false)
    const [connectSelected, setConnectSelected] = useState<any>({})
    const [selectedId, setSelectedId] = useState<any>('')
    // const [cardNumber, setCardNumber] = useState<string>('')
    const [focus, setFocus] = useState<Focused | undefined>()
    // const [expiry, setExpiry] = useState<string | number>('')
    const [show, setShow] = useState<boolean>(false)
    const handleBlur = () => setFocus(undefined)
    const [connects, setConnects] = useState<any>([]);
    const [toWorkspace, setToWorkspace] = useState<string | number>(props?.workspaces[0]?.id ? props?.workspaces[0]?.id : '');
    const [fromWorkspaceName, setFromWorkspaceName] = useState<string | number>(props?.workspaces?.filter((w: any) => w.id === auth.user?.current_workspace)
        .map((w: any) => w.name)
        .join(', '));
    const [fromWorkspace, setFromWorkspace] = useState<string | number>(props?.workspaces?.filter((w: any) => w.id === auth.user?.current_workspace)
        .map((w: any) => w.id)
        .join(', '));


    const handleClose = () => {
        setShow(false)
    }



    const handleSubmit = () => {
        LoginRegistrationAPI.moveToAnotherWorkspace({ from_workspace: fromWorkspace, to_workspace: toWorkspace, article_id: props.article_id }).then(res => {
            setShow(false)
            Swal.fire({
                title: 'Success',
                text: 'Article is moved to another workspace.',
                icon: 'success',
                confirmButtonText: 'Close',
                confirmButtonColor: "#2979FF",
            })
            props.setResetDataset(props.resetDataset + 1)


        }).catch(e => {
            setShow(false)
            console.log(e)
            Swal.fire({
                title: 'Error',
                text: 'Access denied',
                icon: 'error',
                confirmButtonText: 'Close',
                confirmButtonColor: "#2979FF",
            })

        })
    }


    return (
        <>
            <MenuItem onClick={() => {
                setShow(true)
            }} className='add-icon-color' disableRipple>
                <Icon icon="fluent:arrow-move-24-regular" />
                &nbsp;&nbsp;Move to another workspace
            </MenuItem>
            <Dialog
                fullWidth
                open={show}
                maxWidth='sm'
                scroll='body'
                onClose={handleClose}
                onBackdropClick={handleClose}
                TransitionComponent={Transition}
            >
                <DialogContent
                    sx={{
                        position: 'relative',
                        pb: theme => `${theme.spacing(8)} !important`,
                        px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(10)} !important`],
                        pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(10)} !important`]
                    }}
                >
                    <Box sx={{ mb: 4, textAlign: 'center' }}>
                        <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
                            Move to another workspace
                        </Typography>
                        <Typography variant='body2'>Select a Site to Send Article</Typography>
                    </Box>
                    <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
                        <Icon icon='mdi:close' />
                    </IconButton>
                </DialogContent>

                <Box sx={{
                    display: "block",
                }}>

                    <div style={{ paddingLeft: "7%", paddingRight: "7%" }}>
                        <FormControl sx={{
                            width: "100%", marginBottom: "20px", display: "flex", justifyContent: "space-between", flexDirection: "row", alignItems: "center"
                        }}>
                            <Typography variant='body1'>Current Workspace: </Typography>
                            <TextField
                                disabled
                                size='small'
                                sx={{ width: "70%" }}
                                value={
                                    fromWorkspaceName
                                }
                            ></TextField>
                        </FormControl>

                        <FormControl fullWidth sx={{ width: "100%" }}>
                            <InputLabel id='Status-select'>Move to</InputLabel>
                            <Select
                                fullWidth
                                placeholder='Move to'
                                label='Move to'
                                labelId='Move to'
                                defaultValue={toWorkspace}
                                onChange={e => {
                                    setToWorkspace(e.target.value)
                                }}
                            >
                                {
                                    props.workspaces.map((w: any) => {

                                        return <MenuItem value={w.id}>{w.name}</MenuItem>

                                    })
                                }
                            </Select>
                        </FormControl>

                    </div>




                </Box>




                <DialogActions
                    sx={{

                        px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(9)} !important`],
                        pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
                        display: "flex",
                        justifyContent: "end",
                    }}
                >


                    <div style={{ marginTop: "10px" }}>
                        <Button variant='contained' sx={{ mr: 2 }} onClick={handleSubmit}
                            disabled={loading || toWorkspace == fromWorkspace || toWorkspace == ''} startIcon={loading ? <Icon icon="line-md:loading-twotone-loop" /> : null
                            }>
                            Move
                        </Button>

                    </div>


                </DialogActions>
            </Dialog>
        </>
    )
}

export default ShowWorkspaces
