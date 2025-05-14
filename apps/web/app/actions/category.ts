"use server"

import { apiFetch } from '@/app/lib/apiFetch';
import { CategoryFormSchema } from '@/app/lib/definitions';
export async function createCategory(formData: FormData) {
    const validatedFields = CategoryFormSchema.safeParse({
        name: formData.get("name"),
        parentId: formData.get("parentId")
    })
    console.log(validatedFields)
    try {
        const res = await apiFetch("/categories", {
            method: "POST",
            body: validatedFields
        })

    } catch (error) {
        throw error
    }
}