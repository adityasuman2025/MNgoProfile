import { useState } from "react";
import { sendRequestToAPI } from "mngo-project-tools/apiUtils";
import RegisterForm from "mngo-project-tools/comps/RegisterForm";
import SnackBar from "mngo-project-tools/comps/SnackBar";

const APP_NAME = "MNgo";
const API_BASE_URL = "https://apis.mngo.in/api";
const API_USERS_REF = "/users";

export default function Register() {
    const [snackBarData, setSnackBarData] = useState<{ [key: string]: any }>({ visible: false });
    const [isRegisteringUser, setIsRegisteringUser] = useState(false);

    function makeSnackBar(msg: string, type: string = "error") {
        setSnackBarData({ visible: true, msg, type });
    }

    async function handleRegisterClick(username: string, name: string, email: string, password: string, passcode: string) {
        setIsRegisteringUser(true);
        try {
            await sendRequestToAPI(API_BASE_URL, `${API_USERS_REF}/register`, "post", { username, name, email, password, passcode });
            makeSnackBar("You are sucessfully registered. Please use the credentials to login on any MNgo App", "success");
        } catch (e: any) {
            makeSnackBar(e.message);
        }

        setIsRegisteringUser(false);
    }

    return (
        <>
            <SnackBar open={snackBarData.visible} msg={snackBarData.msg} type={snackBarData.type} onClose={() => setSnackBarData({ visible: false })} />

            <div className='mngo-flex mngo-flex-col mngo-flex-1 mngo-items-center mngo-justify-center mngo-grow mngo-h-screen '>
                <RegisterForm
                    styles={{ inputClassName: "inputBox" }}
                    projectTitle={APP_NAME}
                    isRegisteringUser={isRegisteringUser}
                    showError={(error: string) => { makeSnackBar(error) }}
                    onRegisterClick={handleRegisterClick}
                />
            </div>
        </>
    )
}
