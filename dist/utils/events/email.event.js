"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailEvent = void 0;
const node_events_1 = require("node:events");
const send_email_1 = require("../mail/send.email");
const verify_templates_1 = require("../mail/templets/verify.templates");
exports.emailEvent = new node_events_1.EventEmitter();
exports.emailEvent.on("confirmEmail", async (data) => {
    try {
        data.subject = "Confirm-Email";
        data.html = (0, verify_templates_1.verifyEmailTemplate)({ otp: data.otp });
        await (0, send_email_1.sendEmail)(data);
    }
    catch (error) {
        console.log("Fail to send email", error);
    }
});
