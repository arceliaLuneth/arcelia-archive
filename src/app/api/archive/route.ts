import { NextResponse } from 'next/server';
import { createArchive, getArchives } from '@/services/archive';

export async function GET() {
  try {
    const data = await getArchives();

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('GET /api/archive error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch archives',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const id = await createArchive(body);

    return NextResponse.json(
      {
        success: true,
        id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/archive error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create archive',
      },
      { status: 500 }
    );
  }
}