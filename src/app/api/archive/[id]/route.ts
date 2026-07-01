import { NextResponse } from 'next/server';
import { deleteArchive, getArchiveById, updateArchive } from '@/services/archive';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const archive = await getArchiveById(Number(id));

    if (!archive) {
      return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: archive });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch archive' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    await updateArchive(Number(id), body);
    return NextResponse.json({ success: true, message: 'Archive updated' });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to update archive' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteArchive(Number(id));
    return NextResponse.json({ success: true, message: 'Archive deleted' });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to delete archive' },
      { status: 500 }
    );
  }
}