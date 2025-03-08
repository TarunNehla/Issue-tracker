import authOptions from "@/app/auth/authOptions";
import { IssueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request : NextRequest, { params }: { params: Promise<{ id: string }> }){

    const session = await getServerSession(authOptions);
    if(!session)
        return NextResponse.json({}, {status: 401});

    const body = await request.json();
    const validation = IssueSchema.safeParse(body);

    if(!validation.success)
        return NextResponse.json(validation.error?.format(), {status : 400} )

    const id = (await params).id

    const issue = await prisma.issue.findUnique({
        where : {id : parseInt(id)}
    })

    if(!issue)
        return NextResponse.json({error : 'invalid issue'}, {status : 404})

    const updatedIssue = await prisma.issue.update({
        where : {id : issue.id},
        data : {
            title : body.title,
            description : body.description,
        }
    })

    return NextResponse.json(updatedIssue, {status : 200})
}


export async function DELETE(request : NextRequest, { params }: { params: Promise<{ id: string }> }){

    const session = await getServerSession(authOptions);
    if(!session)
        return NextResponse.json({}, {status: 401});

    const id = (await params).id

    const issue = await prisma.issue.findUnique({
        where : {id : parseInt(id)}
    })

    if(!issue)
        return NextResponse.json('Invalid Issue request', {status : 404})

    await prisma.issue.delete({
        where : {id : issue.id}
    })

    return NextResponse.json({})
}