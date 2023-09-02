const transporter = require('../helpers/nodemailer')

const sendMail  = async (userMail ) => {
    await transporter.sendMail({
      
            from: "delgadofran78@gmail.com",
            to: userMail,
            subject: "Prueba mensaje",
           
            html: `
            <p>Mensaje enviado</p>
            `

          
})
}
module.exports ={   
    sendMail
}