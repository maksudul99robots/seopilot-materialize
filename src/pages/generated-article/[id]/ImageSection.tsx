import React, { useState } from 'react';
import ChangeImgModal from './ChangeImgModal';
import DownloadImage from 'src/services/DownloadImage';

const ImageWithButtons = (props: any) => {
    // console.log("props.............:", props)
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <img
                src={props.src}
                width={800}
                height={450}
                style={{ objectFit: "cover" }}
                alt="Featured image"
            />

            <div style={{
                position: 'absolute', top: 0, right: 0, width: "100%",
                backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))",
                display: "flex", justifyContent: "end",
                visibility: !hovered ? "hidden" : "visible"
            }}>

                <div style={{ height: "100%", margin: "30px 30px 30px 20px" }}>
                    {/* <Icon icon="teenyicons:refresh-outline" className='featured_img_btn' style={{ border: "1px solid #E9E9EC", }}
                            /> */}
                    <ChangeImgModal
                        id={props.id}
                        setFImg={props.setFImg}
                        setReloadUnsplashRequest={props.setReloadUnsplashRequest}
                        featuredImgIndex={props.featuredImgIndex}
                        setFeaturedImgIndex={props.setFeaturedImgIndex}
                        setImgSrc={props.setImgSrc}
                        setImgService={props.setImgService}
                        imgService={props.imgService}
                    />
                </div>
            </div>

            {hovered && (
                <div style={{
                    position: 'absolute', bottom: props.url && props.username && props.referral ? 35 : 5, right: 0, width: "100%",
                    backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))",
                    display: "flex", justifyContent: "end"
                }}>

                    <div style={{ height: "100%", margin: "30px 30px 30px 20px" }}>
                        {/* <Icon icon="teenyicons:refresh-outline" className='featured_img_btn' style={{ border: "1px solid #E9E9EC", }}
                            /> */}
                        <DownloadImage url={props.src} name={`${props.topic}.png`} />
                    </div>
                </div>
            )}
            {
                props.url && props.username && props.referral &&
                <p style={{ fontSize: "12px", fontWeight: 400, textAlign: "center", marginTop: "0px" }}>
                    Photo by <a href={props.service == 'Unsplash' ? props.url + "?utm_source=Seopilot&utm_medium=referral" : props.url} target='_blank' className='colorLink'>{props.username}</a> on <a href={props.referral} target='_blank' className='colorLink'>{props.service}</a>
                </p>

            }

        </div>
    );
};

export default ImageWithButtons;
