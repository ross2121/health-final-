
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { patientmap } from '../../../components/atoms/cotrollers/hosptial'; // Assuming 'hosptial' typo is corrected

export const GET = async (req: NextRequest) => {
  try {
    return await patientmap(req);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Message not allowed', error }, { status: 405 });
  }
};
