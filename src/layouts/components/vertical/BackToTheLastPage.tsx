import { Box } from "@mui/material";
import Icon from 'src/@core/components/icon'
import { useRouter } from 'next/router'


const BackToTheLastPage = () => {
    const router = useRouter();
    console.log(router.pathname)
    const goBack = () => {
        router.back()
    }
    return (
        <>
            {
                router.pathname !== '/dashboard' &&
                <Box onClick={goBack} sx={{ cursor: "pointer", display: "flex", justifyContent: "center" }}>
                    <Icon icon='material-symbols-light:arrow-back-ios' /> Back
                </Box>

            }
        </>

    )
}

export default BackToTheLastPage;