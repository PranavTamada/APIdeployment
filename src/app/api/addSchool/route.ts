import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, address, latitude, longitude } = body;

    // Validation
    if (
      !name || typeof name !== 'string' ||
      !address || typeof address !== 'string' ||
      typeof latitude !== 'number' ||
      typeof longitude !== 'number'
    ) {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }

    // Create a new school in the database
    const newSchool = await prisma.school.create({
      data: {
        name,
        address,
        latitude,
        longitude,
      },
    });

    // Return the created school as a response
    return NextResponse.json(newSchool, { status: 201 });
  } catch (error) {
    console.error('Error creating school:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
