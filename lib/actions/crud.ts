"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import prisma from "../prisma";
import { BookSchema, MemberSchema } from "./types";
import { redirect } from "next/navigation";

export async function addBook(formData: FormData) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if(!session) {
        redirect("/auth");
    }

    const parsed = BookSchema.safeParse({
        isbn: formData.get("isbn"),
        title: formData.get("title"),
        author: formData.get("author"),
        publisher: formData.get("publisher"),
        publicationYear: formData.get("publicationDate"),
        edition: formData.get("edition") || undefined,
        genre: formData.get("genre"),
        totalCopies: formData.get("totalCopies"),
        location: formData.get("location"),
    })

    if(!parsed.success){
        throw new Error("Data validation error!");
    }

    try {
        await prisma.shelf.create({
            data: {
                ...parsed.data,
                userID: session.user.id,
                availableCopies: parsed.data.totalCopies
            },
        });
    } catch (error) {
        throw new Error("Failed to add a new book!");
    }
}



export async function addMember(formData: FormData) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if(!session) {
        redirect("/auth");
    }

    const parsed = MemberSchema.safeParse({
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        contact: formData.get("contact"),
        membershipExpires: formData.get("membershipExpires"),
        type: formData.get("type"),
    })

    if(!parsed.success){
        throw new Error("Data validation error!");
    }

    try {
        console.log(parsed);
        await prisma.club.create({
            data: {
                ...parsed.data,
                userID: session.user.id,
            },
        });
    } catch (error) {
        //throw new Error("Failed to add a new member!");
        console.error("PRISMA ERROR:", error);
        throw error;
    }
}