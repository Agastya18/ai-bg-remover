import { assets } from "../assets/assets"


const Steps = () => {
  return (
    <div>
        <h1>Steps to remove background <br /> image in seconds</h1>
        <div>
            <div>
                <img src={assets.upload_icon} alt="" />
                <div>
                    <p>Upload image</p>
                    <p>This is demo will replace it later.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Steps