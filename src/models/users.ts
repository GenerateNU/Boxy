import { PrismaClient, users } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'


export default class Users {
    constructor(private readonly prismaUser: PrismaClient['users']) { }

    // Signup a new user
    async signup(data: any) {
        // do some custom validation...
        try {
            this.defaultUser({ data })
            this.validateUserInputData({ data })
            await this.prismaUser.create({ data })
        } catch (e) {
            if (e instanceof Error) {
                throw e
            }
        }
    }

    private defaultUser(data: any) {
        data['verified'] = false

    }

    private validateUserInputData(data: any) {
        // New Method for Constraints
        // throw new Error("not right format")

    }
    
    private validateEmail() {
        // val check here
    }
} 