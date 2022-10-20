import { prisma } from "@/server/services/dbManager"
import sgMail from "@sendgrid/mail"
import { generateResetToken } from "@/server/services/jwt"

export default defineEventHandler(async (event) => {
    const body = await useBody(event)
    const { email } = body

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    })

    //gescheite fehlermeldung für existiert nciht und email fehlt

    if (user && process.env.SENDGRID_API_KEY) {
        const token = generateResetToken(email)
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: email,
            from: "foodforthemoodf4tm@gmail.com", // Change to your verified sender
            subject: "Reset your password",
            text:
                "Dear User, with this link you are able to reset your password. https://foodforthemood-tomvoet.vercel.app/reset_password?token=" +
                token +
                " Have fun with foodforthemood, your f4tm team :)",
        }
        sgMail
            .send(msg)
            .then(() => {
                console.log("Email sent")
            })
            .catch((error: unknown) => {
                console.error(error)
            })
        console.log("sent email")
    } else {
        return sendError(
            event,
            createError({
                statusCode: 404,
                message: "User does not exist.",
            })
        )
    }

    console.log(user)
    return null
})
