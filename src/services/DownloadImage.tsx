import { Button } from "@mui/material"
import Icon from "src/@core/components/icon"

const DownloadImage = (props: any) => {

    const downloadImg = async () => {
        try {
            const a: any = document.createElement("a");
            a.href = await toDataURL(props.url);
            a.download = props.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (e) {
            console.log("error in fownload:", e)
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

    return (
        <div>
            <Button variant="contained" className='img_btn' size="medium" startIcon={<Icon icon="material-symbols-light:download" fontSize={18} />} onClick={downloadImg}>Download</Button>

        </div>
    )
}

export default DownloadImage