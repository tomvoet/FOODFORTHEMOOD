import { prisma } from "@/server/services/dbManager"
import { Cuisine } from "@prisma/client"
import { createZodError } from "~~/server/services/createZodError"
import { restaurantSchema } from "~~/utils/validation_schemas"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { user } = event.context

    const {
        name,
        state,
        city,
        zip,
        street,
        houseNum,
        phone,
        website,
        cuisines,
    } = body

    if (name === undefined) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Bad request",
                message: "name is required",
            })
        )
    }

    if (state === undefined) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Bad request",
                message: "state is required",
            })
        )
    }

    if (city === undefined) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Bad request",
                message: "city is required",
            })
        )
    }

    if (zip === undefined) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Bad request",
                message: "zip is required",
            })
        )
    }

    if (street === undefined) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Bad request",
                message: "street is required",
            })
        )
    }

    if (houseNum === undefined) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Bad request",
                message: "houseNum is required",
            })
        )
    }

    if (cuisines === undefined || cuisines.length === 0) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Bad request",
                message: "cuisine selection is required",
            })
        )
    }

    if (!user.username) {
        return sendError(
            event,
            createError({
                statusCode: 401,
                statusMessage: "Unauthorized",
                message: "You are not authorized to create a Restaurant",
            })
        )
    }

    const params: {
        name: string
        state: string
        city: string
        zip: string
        street: string
        houseNum: string
        phone?: string
        website?: string
    } = {
        name,
        state,
        city,
        zip,
        street,
        houseNum,
    }

    if (phone) {
        params.phone = phone
    }

    if (website) {
        params.website = website
    }

    try {
        restaurantSchema.partial().parse(params)
    } catch (e) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Bad Request",
                message: createZodError(e),
                data: createZodError(e),
            })
        )
    }

    const restaurant = await prisma.restaurant.create({
        data: {
            ...params,
            cuisines: {
                connect: cuisines.map((cuisine: Cuisine) => ({
                    id: cuisine.id,
                })),
            },
        },
    })

    if (restaurant === null)
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Internal server error",
                message: "Something went wrong",
            })
        )

    return restaurant
})
