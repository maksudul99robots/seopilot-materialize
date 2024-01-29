import { useState } from "react"

const InsertImage = (props: any) => {
    const [imgSrc, setImgSrc] = useState('');


    return (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px", overflow: "hidden" }}>
            {
                props.service == 'unsplash' && props.fImg?.user?.links ?
                    <div style={{ width: "800px", height: "450px", marginBottom: "40px", }}>
                        <img
                            src={imgSrc}
                            width={800}
                            height={450}
                            style={{ objectFit: "cover" }}
                            alt="Featured image"
                        />
                        <p style={{ fontSize: "12px", fontWeight: 400, textAlign: "center", marginTop: "0px" }}>
                            Photo by <a href={props.fImg.user.links.html + "?utm_source=Seopilot&utm_medium=referral"} target='_blank' className='colorLink'>{props.fImg.user.name}</a> on <a href='https://unsplash.com/?utm_source=Seopilot&utm_medium=referral' target='_blank' className='colorLink'>Unsplash</a>
                        </p>
                    </div>
                    :
                    <div style={{ width: "800px", height: "450px", marginBottom: "40px", }}>
                        <img
                            src={imgSrc}
                            width={800}
                            height={450}
                            style={{ objectFit: "cover" }}
                            alt="Featured image"
                        />
                        <p style={{ fontSize: "12px", fontWeight: 400, textAlign: "center", marginTop: "0px" }}>
                            Photo by <a href={props.fImg.user.links.html + "?utm_source=Seopilot&utm_medium=referral"} target='_blank' className='colorLink'>{props.fImg.user.name}</a> on <a href='https://unsplash.com/?utm_source=Seopilot&utm_medium=referral' target='_blank' className='colorLink'>Unsplash</a>
                        </p>
                    </div>
            }



        </div>
    )
}

export default InsertImage