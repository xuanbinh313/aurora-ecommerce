import 'server-only'
import { cookies } from 'next/headers'

export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = "THIS IS SESSION ID"
    const cookieStore = await cookies()

    cookieStore.set('session', session, {
        httpOnly: true,
        secure: false,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('session')
}