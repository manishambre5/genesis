import { z } from "zod";
import { MemberType } from "../generated/prisma/enums";

export const BookSchema = z.object({
    isbn: z.string().min(1, "ISBN is required!"),
    title: z.string().min(1, "Title is required!"),
    author: z.string().min(1, "Author is required!"),
    publisher: z.string().min(1, "Publisher is required!"),
    publicationYear: z.coerce.number().nonnegative("Incorrect year!"),
    edition: z.string().optional(),
    genre: z.string().min(1, "Genre is required!"),
    totalCopies: z.coerce.number().min(0, "Invalid number!"),
    location: z.string().min(1, "Location is required!"),
})

export const MemberSchema = z.object({
    firstName: z.string().min(1, "First Name is required!"),
    lastName: z.string().min(1, "Last Name is required!"),
    email: z.email({ pattern: z.regexes.html5Email }),
    contact: z.string().min(1, "Contact number is required!").regex(/^\+?[1-9]\d{7,14}$/, "Invalid phone number!"),
    membershipExpires: z.coerce.date().refine((date) => date >= new Date(new Date().setHours(0, 0, 0, 0)),"Incorrect date!"),
    type: z.enum(MemberType),
})