async function createVerificationCheck() {
    try {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ status: "approved", number: '+2348121249923' });
            }, 10000);
        });
    } catch (error) {
        console.log(error);
    }
}

export default createVerificationCheck;