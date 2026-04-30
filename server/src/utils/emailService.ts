import nodemailer from "nodemailer";
import config from "../config/config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.googleAppEmail,
    pass: config.googleAppPassword
  }
})

transporter.verify((error,success)=>{
  if(error){
    console.error("Error setting up email transporter:", error);
  }
  else{
    console.log("Email transporter is ready to send messages");
  }
})


export const sendEmail = async (to:string, subject:string, text:string)=> {
  try{
    const info = await transporter.sendMail({
      from: "School Management Software <"+config.googleAppEmail+">",
      to,
      subject,
      text
    })
    console.log("Email sent successfully:", info.messageId);
  }
  catch(error){
    console.error("Error sending email:", error);
  }
}
