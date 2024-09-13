class ErrResponse extends Error {
    constructor(message, codeStatus) {
        super(message);
        this.codeStatus = codeStatus;
    }
}

export default ErrResponse;