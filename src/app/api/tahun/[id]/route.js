import { NextResponse } from "next/server";
import { prisma } from "../../../../../utils/prisma";
import { dateTimeFormat } from "../../../../../utils/format";

export const GET = async (req, context) => {
  try {
    const tahun = await prisma.tahunAjar.findFirst({
      where: { id: context.params.id },
      include: {
        spp: true
      }
    });

    return NextResponse.json({
      message: "Successfully fetched data", tahun: {
        id: parseInt(tahun.id),
        tahun: tahun.tahun,
        spp: tahun.spp.map(spp => {
          return {
            spp: parseInt(spp.spp)
          }
        }),
        createdAt: dateTimeFormat(tahun.createdAt),
        updatedAt: dateTimeFormat(tahun.updatedAt)
      }
    });
  }
  catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
  }
}

export const PUT = async (req, context) => {
  const body = await req.json();
  try {
    const { tahun, spp } = body;

    const dataTahun = await prisma.tahunAjar.update({
      where: { id: context.params.id },
      data: {
        tahun: tahun,
        updatedAt: new Date()
      }
    });

    const dataSpp = await prisma.spp.update({
      where: { id: context.params.id, tahunAjarId: context.params.id },
      data: {
        spp: spp,
        updatedAt: new Date()
      }
    })

    return NextResponse.json({
      message: "Successfully edited data", tahun: {
        id: parseInt(tahun.id),
        tahun: tahun.tahun,
        spp: tahun.spp.map(spp => {
          return {
            spp: parseInt(spp.spp)
          }
        }),
        createdAt: dateTimeFormat(tahun.createdAt),
        updatedAt: dateTimeFormat(tahun.updatedAt)
      }
    });
  }
  catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
  }
}

export const DELETE = async (req, context) => {
  try {
    const tahun = await prisma.tahunAjar.delete({
      where: { id: context.params.id }
    });

    const spp = await prisma.spp.delete({
      where: { tahunAjarId: context.params.id }
    });

    return NextResponse.json({ message: "Successfully deleted data" });
  }
  catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
  }
}