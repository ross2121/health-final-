"use server"
import { NextResponse } from 'next/server';
import { Register } from '../../../components/atoms/cotrollers/route';
import { NextApiResponse } from 'next';
export const POST=async(req: Request, res: NextApiResponse)=>{
  try {
    return await Register(req, res);
  } catch (error) {
    return NextResponse.json({ message: 'Message not allowed',error }, { status: 405 });
  }
}
