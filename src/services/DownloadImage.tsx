import { Button } from "@mui/material"
import Icon from "src/@core/components/icon"
import { LoginRegistrationAPI } from "./API";
import { useState } from "react";

const DownloadImage = (props: any) => {
    // console.log("props:", props)
    const [loading, setLoading] = useState(false)
    const downloadImg = async () => {
        try {
            setLoading(true)
            const a: any = document.createElement("a");
            a.href = await toDataURL(props.url);
            a.download = props.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setLoading(false)
        } catch (e) {
            console.log("error in fownload:", e)
            setLoading(false)
        }

    }
    function toDataURL(url: string) {
        return fetch(url)
            .then((response) => {
                return response.blob();
            })
            .then((blob) => {
                return URL.createObjectURL(blob);
            }).catch((e) => {
                console.log("error:", e)
            });
    }
    const downloadDallE = async () => {
        // LoginRegistrationAPI.getDallEImg({ url: props.url }).then(async res => {
        //     console.log(res);

        try {
            setLoading(true)
            const parsedUrl = new URL(props.url);

            // Get the pathname from the parsed URL
            const pathname = parsedUrl.pathname;

            // Extract the file name by splitting the pathname and taking the last part
            const fileName = pathname.split('/').pop();

            const a: any = document.createElement("a");
            a.href = await toDataURL(`${process.env.NEXT_PUBLIC_API_ROOT}/download-dall-e-img/${fileName}`);
            a.download = props.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setLoading(false)
        } catch (e) {
            console.log("error in download:", e)
            setLoading(false)
        }

        // }).catch(e => {
        //     console.log(e)
        // })
    }

    return (
        <div>
            <Button variant="contained" className='img_btn' size="medium" disabled={loading} startIcon={loading ? <Icon icon='line-md:loading-twotone-loop' fontSize={18} /> : <Icon icon="material-symbols-light:download" fontSize={18} />} onClick={
                props.imgService != 'dall-e-2' && props.imgService != 'dall-e-3' ? downloadImg : downloadDallE
            }>Download</Button>

        </div>
    )
}

export default DownloadImage